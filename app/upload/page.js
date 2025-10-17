'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function UploadPage() {
  // Configuração de tamanho máximo (deve coincidir com o backend)
  const MAX_FILE_SIZE_MB = 50;
  
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [bpm, setBpm] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Categorias dinâmicas carregadas da API
  const [existingCategories, setExistingCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth?mode=login');
    }
  }, [user, router]);

  useEffect(() => {
    // Carregar categorias existentes
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setExistingCategories(data.categories || []);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryChange = (value) => {
    if (value === 'new') {
      setIsCreatingCategory(true);
      setCategory('');
    } else {
      setIsCreatingCategory(false);
      setCategory(value);
      setNewCategory('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth?mode=login');
      return;
    }

    if (!audioFile) {
      alert('Por favor, selecione um arquivo de áudio');
      return;
    }

    // Validar tamanho do arquivo
    console.log('[frontend] Validando tamanho do arquivo...');
    console.log('[frontend] Arquivo selecionado:', audioFile.name);
    console.log('[frontend] Tamanho do arquivo:', audioFile.size, 'bytes');
    console.log('[frontend] Tamanho em MB:', (audioFile.size / 1024 / 1024).toFixed(2), 'MB');
    console.log('[frontend] Limite configurado:', MAX_FILE_SIZE_MB, 'MB');
    
    const maxSize = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (audioFile.size > maxSize) {
      const errorMsg = `Arquivo muito grande! Máximo: ${MAX_FILE_SIZE_MB}MB. Seu arquivo: ${(audioFile.size / 1024 / 1024).toFixed(1)}MB`;
      console.error('[frontend] Arquivo rejeitado:', errorMsg);
      alert(errorMsg);
      return;
    }
    
    console.log('[frontend] Arquivo aprovado para upload');

    setIsUploading(true);

    try {
      // Helper para gerar slug limpo
      const slugify = (s) =>
        s
          .toString()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // tira acentos
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')                      // troca espaços/sep por -
          .replace(/(^-|-$)+/g, '');

      const finalCategory = isCreatingCategory ? newCategory : category;

      // Se criou nova categoria, criar a pasta primeiro
      if (isCreatingCategory && newCategory) {
        const categoryResponse = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            categoryName: newCategory,
            userId: user.id 
          })
        });

        if (!categoryResponse.ok) {
          throw new Error('Erro ao criar categoria');
        }

        // Atualizar lista de categorias
        setExistingCategories(prev => [...prev, newCategory].sort());
      }

      // SOLUÇÃO DEFINITIVA: Upload direto para Supabase Storage (bypassa Next.js 413)
      const slug = slugify(finalCategory || 'general');
      const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.floor(Math.random()*10000)}`;
      const dateFolder = new Date().toISOString().slice(0,10);
      const audioNameSanitized = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const audioExtension = (audioFile.name && audioFile.name.includes('.')) ? '.' + audioFile.name.split('.').pop() : '';
      const storagePath = `${slug}/${dateFolder}/${id}_${audioNameSanitized}${audioExtension}`;

      console.log('[frontend] Iniciando upload direto para Supabase...');
      console.log('[frontend] Storage path:', storagePath);
      console.log('[frontend] User ID:', user?.id);
      console.log('[frontend] User authenticated:', !!user);

      // Verificar se usuário está autenticado
      if (!user) {
        throw new Error('Usuário não está autenticado. Faça login primeiro.');
      }

      // Upload direto do cliente para Supabase Storage
      const bucket = 'library';
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(storagePath, audioFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: audioFile.type || 'audio/mpeg'
        });

      if (uploadError) {
        console.error('[frontend] Erro no upload para Storage:', uploadError);
        throw new Error(`Erro ao enviar arquivo: ${uploadError.message}`);
      }

      console.log('[frontend] Upload para Storage bem-sucedido:', uploadData);

      // Upload da capa (se existir)
      let coverStoragePath = null;
      if (coverFile) {
        console.log('[frontend] Upload da capa detectado...');
        console.log('[frontend] Cover file:', coverFile.name, 'Size:', coverFile.size);
        
        const coverExt = (coverFile.name && coverFile.name.includes('.')) ? '.' + coverFile.name.split('.').pop() : '';
        coverStoragePath = `covers/${slug}/${dateFolder}/${id}_cover${coverExt}`;
        
        console.log('[frontend] Cover storage path:', coverStoragePath);
        
        const { data: coverUploadData, error: coverUploadError } = await supabase.storage
          .from(bucket)
          .upload(coverStoragePath, coverFile, {
            contentType: coverFile.type || 'image/png',
            upsert: false
          });
        
        if (coverUploadError) {
          console.error('[frontend] Erro no upload da capa:', coverUploadError);
          coverStoragePath = null;
        } else {
          console.log('[frontend] Upload da capa bem-sucedido:', coverUploadData);
        }
      } else {
        console.log('[frontend] Nenhuma capa selecionada');
      }

      // Agora enviar apenas metadados (JSON pequeno) para salvar no banco
      console.log('[frontend] Enviando metadados para o banco...');
      
      const metadataResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          artist,
          description,
          mood,
          genre,
          bpm: bpm ? parseInt(bpm) : null,
          tags,
          category: finalCategory,
          storage_path: storagePath,
          storage_bucket: bucket,
          cover_path: coverStoragePath,
          file_size: audioFile.size,
          userId: user.id
        })
      });

      if (!metadataResponse.ok) {
        const payloadErr = await metadataResponse.json().catch(() => ({}));
        throw new Error(`Erro ao salvar metadados: ${payloadErr?.error || metadataResponse.status}`);
      }

      const uploadResult = await metadataResponse.json();
      console.log('[frontend] Metadados salvos com sucesso:', uploadResult);

      // Salvar metadados no localStorage
      const musicData = {
        id: Date.now(),
        title,
        artist: artist || 'Into the Shadows',
        description,
        mood,
        genre,
        bpm: bpm ? parseInt(bpm) : null,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        category: finalCategory,
        uploadedBy: user.email,
        createdAt: new Date().toISOString(),
        src: uploadResult.storage_path || uploadResult.audioPath,
        cover: uploadResult.cover_path || uploadResult.coverPath,
        status: 'uploaded'
      };

      const existing = JSON.parse(localStorage.getItem('uploaded_music') || '[]');
      existing.push(musicData);
      localStorage.setItem('uploaded_music', JSON.stringify(existing));

      setUploadSuccess(true);
      
      // Reset form
      setTitle('');
      setArtist('');
      setDescription('');
      setMood('');
      setGenre('');
      setBpm('');
      setTags('');
      setCategory('');
      setNewCategory('');
      setIsCreatingCategory(false);
      setAudioFile(null);
      setCoverFile(null);

      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (err) {
      console.error('Erro no upload:', err?.message || err);
      alert(`Erro no upload: ${err?.message || err}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50"></div>
      
      <div className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="text-center flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
                  Upload de Música
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Compartilhe suas criações musicais com a comunidade
              </p>
            </div>
            
            {/* Botão Voltar */}
            <button
              onClick={() => router.push('/dashboard')}
              className="absolute top-4 left-4 md:relative md:top-0 md:left-0 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Voltar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Upload Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Detalhes da Música</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Audio File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Arquivo de Áudio *</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setAudioFile(e.target.files[0])}
                        className="hidden"
                        id="audio-upload"
                        required
                      />
                      <label htmlFor="audio-upload" className="cursor-pointer">
                        {audioFile ? (
                          <div className="text-green-400">
                            <span className="text-2xl mb-2 block">🎵</span>
                            <p className="font-medium">{audioFile.name}</p>
                            <p className="text-sm text-gray-400">Clique para alterar</p>
                          </div>
                        ) : (
                          <div className="text-gray-400">
                            <span className="text-2xl mb-2 block">📁</span>
                            <p className="font-medium">Clique para selecionar arquivo de áudio</p>
                            <p className="text-sm">MP3, WAV, FLAC até {MAX_FILE_SIZE_MB}MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Cover Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Capa (Opcional)</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverFile(e.target.files[0])}
                        className="hidden"
                        id="cover-upload"
                      />
                      <label htmlFor="cover-upload" className="cursor-pointer">
                        {coverFile ? (
                          <div className="text-green-400">
                            <span className="text-2xl mb-2 block">🖼️</span>
                            <p className="font-medium">{coverFile.name}</p>
                            <p className="text-sm text-gray-400">Clique para alterar</p>
                          </div>
                        ) : (
                          <div className="text-gray-400">
                            <span className="text-2xl mb-2 block">🖼️</span>
                            <p className="font-medium">Clique para selecionar capa</p>
                            <p className="text-sm">JPG, PNG até 5MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título da Música *</label>
                      <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Nome da sua música"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Artista</label>
                      <input 
                        value={artist} 
                        onChange={(e) => setArtist(e.target.value)} 
                        placeholder="Into the Shadows (padrão)"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Categoria *</label>
                    <div className="space-y-3">
                      <select 
                        value={isCreatingCategory ? 'new' : category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                        required={!isCreatingCategory}
                        disabled={loadingCategories}
                      >
                        <option value="">{loadingCategories ? 'Carregando...' : 'Selecione uma categoria'}</option>
                        {existingCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="new">+ Criar nova categoria</option>
                      </select>

                      {isCreatingCategory && (
                        <input 
                          value={newCategory} 
                          onChange={(e) => setNewCategory(e.target.value)} 
                          placeholder="Nome da nova categoria"
                          className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                          required
                        />
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                    <textarea 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Descreva sua música, inspirações, processo criativo..."
                      className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      rows={4}
                    />
                  </div>

                  {/* Genre, Mood and BPM */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Gênero</label>
                      <input 
                        value={genre} 
                        onChange={(e) => setGenre(e.target.value)} 
                        placeholder="Ex: Synthwave, Lo-fi, Animecore"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Mood/Atmosfera</label>
                      <input 
                        value={mood} 
                        onChange={(e) => setMood(e.target.value)} 
                        placeholder="Ex: Épico, melancólico, energético"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">BPM</label>
                      <input 
                        type="number"
                        value={bpm} 
                        onChange={(e) => setBpm(e.target.value)} 
                        placeholder="Ex: 120"
                        min="1"
                        max="300"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                    <input 
                      value={tags} 
                      onChange={(e) => setTags(e.target.value)} 
                      placeholder="Ex: Nostálgico, Emocional, Instrumental"
                      className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separe as tags com vírgulas</p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center space-x-4 pt-6">
                    <button 
                      type="submit" 
                      disabled={isUploading}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 disabled:scale-100"
                    >
                      {isUploading ? 'Enviando...' : 'Publicar Música'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => router.push('/dashboard')} 
                      className="px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 font-medium rounded-lg transition-all duration-300"
                    >
                      Cancelar
                    </button>
                  </div>

                  {uploadSuccess && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                      <p className="text-green-400 font-medium">✅ Música enviada com sucesso!</p>
                      <p className="text-green-300 text-sm mt-1">Redirecionando para o dashboard...</p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Sidebar with Guidelines */}
            <div className="space-y-6">
              {/* Guidelines */}
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">📋 Diretrizes</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Apenas músicas originais ou com direitos</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Qualidade mínima de 128kbps</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Título e categoria obrigatórios</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Capa recomendada 1000x1000px</span>
                  </div>
                </div>
              </div>

              {/* Categories Info */}
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">🏷️ Categorias</h3>
                <div className="space-y-2">
                  {loadingCategories ? (
                    <div className="text-gray-400 text-sm">Carregando...</div>
                  ) : existingCategories.length > 0 ? (
                    existingCategories.map((cat) => (
                      <div key={cat} className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">{cat}</span>
                        <span className="text-xs text-gray-500">Ativa</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-sm">Nenhuma categoria encontrada</div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  {existingCategories.length === 0 
                    ? 'Crie a primeira categoria!' 
                    : 'Não encontrou sua categoria? Crie uma nova!'}
                </p>
              </div>

              {/* Stats */}
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">📊 Suas Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Músicas enviadas:</span>
                    <span className="text-white font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Reproduções:</span>
                    <span className="text-white font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Favoritos:</span>
                    <span className="text-white font-medium">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}