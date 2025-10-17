import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const page = parseInt(searchParams.get('page')) || 1;
    const offset = (page - 1) * limit;

    const genre = searchParams.get('genre');
    const mood = searchParams.get('mood');
    const bpmMin = searchParams.get('bpmMin') ? parseInt(searchParams.get('bpmMin')) : null;
    const bpmMax = searchParams.get('bpmMax') ? parseInt(searchParams.get('bpmMax')) : null;
    const search = searchParams.get('q') || null;

    // Construir query dinâmica
    let builder = supabaseAdmin
      .from('music_tracks')
      .select('id, title, artist, description, mood, genre, bpm, tags, category, storage_path, storage_bucket, cover_path, duration, file_size, uploaded_by, created_at, play_count')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category && category !== 'all') builder = builder.eq('category', category);
    if (genre) builder = builder.eq('genre', genre);
    if (mood) builder = builder.ilike('mood', `%${mood}%`);
    if (bpmMin !== null) builder = builder.gte('bpm', bpmMin);
    if (bpmMax !== null) builder = builder.lte('bpm', bpmMax);
    if (search) builder = builder.ilike('title', `%${search}%`).or(`artist.ilike.%${search}%`);

    const { data: tracks, error } = await builder;

    if (error) {
      console.error('Erro ao buscar músicas:', error);
      return NextResponse.json({ error: 'Erro ao buscar músicas' }, { status: 500 });
    }

    // Gerar signed URLs para cada track (temporário)
    const tracksWithUrl = await Promise.all((tracks || []).map(async (t) => {
      try {
        let trackWithUrl = { ...t };
        
        // Signed URL para o áudio
        if (t.storage_path && t.storage_bucket) {
          const { data: signedData, error: signedError } = await supabaseAdmin.storage.from(t.storage_bucket).createSignedUrl(t.storage_path, 3600);
          if (!signedError && signedData && signedData.signedUrl) {
            trackWithUrl.signed_url = signedData.signedUrl;
          }
        }
        
        // Signed URL para a capa
        if (t.cover_path && t.storage_bucket) {
          const { data: coverSignedData, error: coverSignedError } = await supabaseAdmin.storage.from(t.storage_bucket).createSignedUrl(t.cover_path, 3600);
          if (!coverSignedError && coverSignedData && coverSignedData.signedUrl) {
            trackWithUrl.cover_signed_url = coverSignedData.signedUrl;
          }
        }
        
        return trackWithUrl;
      } catch (e) {
        console.error('Erro ao gerar signed URLs para', t.id, e);
      }
      return t;
    }));

    return NextResponse.json({ tracks: tracksWithUrl || [] });
  } catch (error) {
    console.error('Erro na API de músicas:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { trackId, action, userId } = body;

    if (action === 'increment_play_count') {
      // Usar RPC para incrementar de forma segura seria ideal; aqui usamos update simples
      const { data: currentTrack, error: selectError } = await supabaseAdmin
        .from('music_tracks')
        .select('play_count')
        .eq('id', trackId)
        .single();

      if (selectError) {
        console.error('Erro ao buscar track atual:', selectError);
        return NextResponse.json({ error: 'Erro ao buscar track' }, { status: 500 });
      }

      const { data, error } = await supabaseAdmin
        .from('music_tracks')
        .update({ play_count: (currentTrack.play_count || 0) + 1 })
        .eq('id', trackId);

      if (error) {
        console.error('Erro ao atualizar play count:', error);
        return NextResponse.json({ error: 'Erro ao atualizar contador' }, { status: 500 });
      }

      // Inserir evento de play
      try {
        await supabaseAdmin.from('music_events').insert({ 
          music_track_id: trackId, 
          user_id: userId, 
          event_type: 'play' 
        });
      } catch (e) {
        console.error('Erro ao registrar evento de play:', e);
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Ação não reconhecida' }, { status: 400 });
  } catch (error) {
    console.error('Erro na API de músicas:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}