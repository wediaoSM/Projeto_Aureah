import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import { randomUUID } from 'crypto';

const DEFAULT_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'library';

// Configuração de tamanho máximo
const MAX_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB) || 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// Forçar runtime Node.js para lidar com FormData/File
export const runtime = 'nodejs';

// Configuração para permitir uploads grandes
export const maxDuration = 300; // 5 minutos timeout

// Configurações específicas do Next.js 13+ App Router
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Configuração explícita de body size para Next.js
export const bodyParser = false; // Desabilitar parser padrão para controle manual

export async function POST(request) {
  try {
    // Headers para permitir uploads grandes (usados em respostas de erro)
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    // Verificar se o content-length não excede o limite
    const contentLength = request.headers.get('content-length');
    const contentTypeHeader = request.headers.get('content-type') || '';

    // Log útil para depuração quando ocorrer 413 no browser
    console.log('[upload] incoming request content-type:', contentTypeHeader);
    console.log('[upload] incoming request content-length:', contentLength);
    console.log('[upload] MAX_SIZE_MB configured:', MAX_SIZE_MB);
    console.log('[upload] MAX_SIZE_BYTES configured:', MAX_SIZE_BYTES);

    if (contentLength && parseInt(contentLength) > MAX_SIZE_BYTES) {
      const msg = `Arquivo muito grande! Máximo: ${MAX_SIZE_MB}MB. Recebido: ${(parseInt(contentLength) / 1024 / 1024).toFixed(1)}MB`;
      console.warn('[upload] rejecting due to content-length > max:', msg);
      return NextResponse.json({ error: msg, contentType: contentTypeHeader, contentLength }, { status: 413, headers });
    }

    // Verificar se chegamos até aqui
    console.log('[upload] passou pela verificação inicial de content-length');

    // Suporte a dois modos:
    // 1) multipart/form-data: o cliente envia arquivos diretamente para o servidor (recomendado)
    // 2) application/json: cliente faz upload direto para Supabase Storage e envia apenas metadados (fallback)
    const contentType = request.headers.get('content-type') || '';

    let audioFile = null;
    let coverFile = null;
    let category = null;
    let title = null;
    let artist = 'Into the Shadows';
    let description = '';
    let mood = '';
    let tags = '';
    let genre = null;
    let bpm = null;
    let userId = null;

    // Variables for provided data (when using JSON mode)
    let provided_storage_path = null;
    let provided_storage_bucket = null;
    let provided_cover_path = null;
    let provided_file_size = null;

    if (contentType.includes('application/json')) {
      // Metadata-only: parse JSON pequeno (fallback)
      console.log('[upload] Processando metadata-only (JSON)');
      
      try {
        const body = await request.json();
        console.log('[upload] Body recebido:', body);
        
        // Ajustar nomes: body pode enviar storage_path, storage_bucket, cover_path, file_size
        const storage_path = body.storage_path || body.storagePath || null;
        const storage_bucket = body.storage_bucket || body.storageBucket || body.storageBucketName || DEFAULT_BUCKET;
        const cover_path = body.cover_path || body.coverPath || null;
        const file_size = body.file_size || body.fileSize || 0;

        console.log('[upload] Dados parseados:', {
          title: body.title,
          category: body.category,
          userId: body.userId,
          storage_path,
          file_size
        });

        // Assign variables for later use
        audioFile = { size: file_size, name: storage_path };
        coverFile = cover_path ? { name: cover_path, size: 0 } : null;
        category = body.category || null;
        title = body.title || null;
        artist = body.artist || 'Into the Shadows';
        description = body.description || '';
        mood = body.mood || '';
        tags = body.tags || '';
        genre = body.genre || null;
        bpm = body.bpm || null;
        userId = body.userId || null;

        // Set provided data variables
        provided_storage_path = storage_path;
        provided_storage_bucket = storage_bucket;
        provided_cover_path = cover_path;
        provided_file_size = file_size;
        
      } catch (jsonError) {
        console.error('[upload] Erro ao fazer parse do JSON:', jsonError);
        return NextResponse.json({ 
          error: 'Erro ao processar JSON: ' + jsonError.message 
        }, { status: 400, headers });
      }

    } else {
      // Upload direto via servidor (multipart/form-data) - método principal
      console.log('[upload] tentando parse de FormData...');
      
      try {
        const formData = await request.formData();
        console.log('[upload] FormData parseado com sucesso');
        
        audioFile = formData.get('file');           // era 'audioFile' -> agora 'file'
        coverFile = formData.get('cover');          // era 'coverFile' -> agora 'cover'
        category = formData.get('slug');            // era 'category' -> agora 'slug'
        title = formData.get('title');
        artist = formData.get('artist') || 'Into the Shadows';
        description = formData.get('description') || '';
        mood = formData.get('mood') || '';
        tags = formData.get('tags') || '';
        genre = formData.get('genre') || null;
        bpm = formData.get('bpm') ? parseInt(formData.get('bpm')) : null;
        userId = formData.get('userId'); // Será passado do frontend
        
        console.log('[upload] audioFile size:', audioFile?.size);
        console.log('[upload] audioFile name:', audioFile?.name);
      } catch (formDataError) {
        console.error('[upload] Erro ao fazer parse do FormData:', formDataError);
        return NextResponse.json({ 
          error: 'Erro ao processar FormData: ' + formDataError.message,
          details: formDataError.toString()
        }, { status: 400, headers });
      }
    }

    if (!audioFile || !category || !title || !userId) {
      return NextResponse.json({ error: 'Arquivo de áudio (file), slug, título e usuário são obrigatórios' }, { status: 400 });
    }

    // Validar tamanho do arquivo (configurável via env)
    if (audioFile.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ 
        error: `Arquivo muito grande! Máximo: ${MAX_SIZE_MB}MB. Recebido: ${(audioFile.size / 1024 / 1024).toFixed(1)}MB` 
      }, { status: 413 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Server misconfigured: SUPABASE_SERVICE_ROLE_KEY não definido' }, { status: 500 });
    }

    // Preparar tags como array
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    // Se o cliente já enviou o arquivo direto para o storage (metadata-only), usamos os paths fornecidos
    let storagePath = null;
    let bucket = DEFAULT_BUCKET;

    if (typeof provided_storage_path !== 'undefined' && provided_storage_path) {
      storagePath = provided_storage_path;
      bucket = provided_storage_bucket || DEFAULT_BUCKET;
    } else {
      // Gerar ID e nome previsível para o arquivo no storage e fazer upload via servidor (menos recomendado)
      const id = randomUUID();
      const dateFolder = new Date().toISOString().slice(0,10);
      const audioNameSanitized = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const audioExtension = (audioFile.name && audioFile.name.includes('.')) ? '.' + audioFile.name.split('.').pop() : '';
      storagePath = `${category}/${dateFolder}/${id}_${audioNameSanitized}${audioExtension}`; // usar slug direto

      // Fazer upload para Supabase Storage (bucket privado)
      bucket = DEFAULT_BUCKET;
      const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
      const { error: uploadError } = await supabaseAdmin.storage.from(bucket).upload(storagePath, audioBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: audioFile.type || 'audio/mpeg'
      });

      if (uploadError) {
        console.error('Erro ao enviar arquivo para storage:', uploadError);
        return NextResponse.json({ 
          error: 'Erro ao fazer upload do arquivo', 
          details: uploadError.message,
          bucket: bucket,
          path: storagePath
        }, { status: 500 });
      }
    }

    let coverStoragePath = null;
    if (provided_cover_path) {
      coverStoragePath = provided_cover_path;
    } else if (coverFile && coverFile.size > 0) {
      const coverExt = (coverFile.name && coverFile.name.includes('.')) ? '.' + coverFile.name.split('.').pop() : '';
      coverStoragePath = `covers/${category}/${dateFolder}/${id}_cover${coverExt}`;
      const coverBuffer = Buffer.from(await coverFile.arrayBuffer());
      const { error: coverUploadError } = await supabaseAdmin.storage.from(bucket).upload(coverStoragePath, coverBuffer, {
        contentType: coverFile.type || 'image/png',
        upsert: false
      });
      if (coverUploadError) {
        console.error('Erro ao enviar cover para storage:', coverUploadError);
        coverStoragePath = null;
      }
    }

    // Inserir metadados na tabela music_tracks (salvando apenas storage_path)
    console.log('[upload] Tentando inserir no banco de dados...');
    console.log('[upload] Dados para inserção:', {
      title,
      artist,
      category,
      storage_path: storagePath,
      storage_bucket: bucket,
      cover_path: coverStoragePath,
      file_size: provided_file_size || (audioFile && audioFile.size) || 0,
      uploaded_by: userId
    });

    const { data: musicTrack, error: dbError } = await supabaseAdmin
      .from('music_tracks')
      .insert({
        title,
        artist,
        description,
        mood,
        genre,
        bpm,
        tags: tagsArray,
        category,
        storage_path: storagePath,
        storage_bucket: bucket,
        cover_path: coverStoragePath,
        file_size: provided_file_size || (audioFile && audioFile.size) || 0,
        uploaded_by: userId
      })
      .select()
      .single();

    if (dbError) {
      console.error('[upload] Erro ao inserir no banco:', dbError);
      console.error('[upload] Detalhes do erro:', {
        code: dbError.code,
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint
      });
      
      // Cleanup: remover arquivo do storage se inserção no DB falhou
      if (storagePath && !provided_storage_path) {
        try {
          await supabaseAdmin.storage.from(bucket).remove([storagePath]);
          if (coverStoragePath) await supabaseAdmin.storage.from(bucket).remove([coverStoragePath]);
          console.log('[upload] Arquivos removidos após falha no DB');
        } catch (cleanupError) {
          console.error('[upload] Erro ao limpar arquivos após falha no DB:', cleanupError);
        }
      }
      
      return NextResponse.json({ 
        error: 'Erro ao salvar metadados no banco', 
        details: dbError.message,
        code: dbError.code,
        hint: dbError.hint || 'Tabela music_tracks existe? RLS está configurado corretamente?'
      }, { status: 500 });
    }

    // Upsert categoria no banco
    const { error: categoryError } = await supabaseAdmin
      .from('music_categories')
      .upsert({ 
        name: category,
        description: `Categoria ${category}`,
        created_by: userId
      }, { onConflict: 'name' });

    if (categoryError) {
      console.error('Erro ao criar/atualizar categoria:', categoryError);
    }

    // Inserir evento de upload
    try {
      await supabaseAdmin.from('music_events').insert({
        music_track_id: musicTrack.id,
        user_id: userId,
        event_type: 'upload',
        meta: { file_size: audioFile.size }
      });
    } catch (eventError) {
      console.error('Erro ao inserir evento de upload:', eventError);
    }

    // Gerar signed URL temporário para reprodução (1h)
    let signedUrl = null;
    try {
      const { data: signedData, error: signedError } = await supabaseAdmin.storage.from(bucket).createSignedUrl(storagePath, 3600);
      if (!signedError && signedData && signedData.signedUrl) {
        signedUrl = signedData.signedUrl;
      }
    } catch (e) {
      console.error('Erro ao gerar signed URL:', e);
    }

    return NextResponse.json({ 
      success: true, 
      storage_path: storagePath,
      storage_bucket: bucket,
      cover_path: coverStoragePath,
      trackId: musicTrack.id,
      signed_url: signedUrl,
      message: 'Upload realizado com sucesso' 
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
