-- Criar tabela para armazenar informações das músicas
CREATE TABLE IF NOT EXISTS public.music_tracks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) DEFAULT 'Into the Shadows',
    description TEXT,
    mood VARCHAR(100),
    genre VARCHAR(100),
    bpm INTEGER,
    tags TEXT[], -- Array de tags
    category VARCHAR(100) NOT NULL,
    storage_path VARCHAR(500) NOT NULL, -- Caminho no Supabase Storage (ex: audio/Animecore/2025-01-01/uuid_title.wav)
    storage_bucket VARCHAR(200) DEFAULT 'private-audio', -- bucket usado (por padrão private-audio)
    cover_path VARCHAR(500), -- Caminho da capa (opcional)
    duration INTEGER, -- Duração em segundos
    file_size INTEGER, -- Tamanho do arquivo em bytes
    uploaded_by UUID REFERENCES auth.users(id), -- Usuário que fez upload
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active', -- active, deleted, pending
    play_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_music_tracks_category ON public.music_tracks(category);
CREATE INDEX IF NOT EXISTS idx_music_tracks_genre ON public.music_tracks(genre);
CREATE INDEX IF NOT EXISTS idx_music_tracks_mood ON public.music_tracks(mood);
CREATE INDEX IF NOT EXISTS idx_music_tracks_bpm ON public.music_tracks(bpm);
CREATE INDEX IF NOT EXISTS idx_music_tracks_uploaded_by ON public.music_tracks(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_music_tracks_created_at ON public.music_tracks(created_at);
CREATE INDEX IF NOT EXISTS idx_music_tracks_status ON public.music_tracks(status);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.music_tracks ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários vejam todas as músicas ativas
CREATE POLICY "Anyone can view active music tracks" ON public.music_tracks
    FOR SELECT USING (status = 'active');

-- Política para permitir que usuários autenticados façam upload
CREATE POLICY "Authenticated users can insert music tracks" ON public.music_tracks
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir que usuários editem apenas suas próprias músicas
CREATE POLICY "Users can update their own music tracks" ON public.music_tracks
    FOR UPDATE USING (auth.uid() = uploaded_by);

-- Política para permitir que usuários deletem apenas suas próprias músicas
CREATE POLICY "Users can delete their own music tracks" ON public.music_tracks
    FOR DELETE USING (auth.uid() = uploaded_by);

-- Criar tabela para categorias
CREATE TABLE IF NOT EXISTS public.music_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    track_count INTEGER DEFAULT 0
);

-- Índice para categorias
CREATE INDEX IF NOT EXISTS idx_music_categories_name ON public.music_categories(name);

-- RLS para categorias
ALTER TABLE public.music_categories ENABLE ROW LEVEL SECURITY;

-- Políticas para categorias
CREATE POLICY "Anyone can view categories" ON public.music_categories
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create categories" ON public.music_categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Função para atualizar contador de tracks por categoria
CREATE OR REPLACE FUNCTION update_category_track_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.music_categories 
        SET track_count = track_count + 1 
        WHERE name = NEW.category;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.music_categories 
        SET track_count = track_count - 1 
        WHERE name = OLD.category;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar contador automaticamente
CREATE TRIGGER update_category_count_trigger
    AFTER INSERT OR DELETE ON public.music_tracks
    FOR EACH ROW EXECUTE FUNCTION update_category_track_count();

-- Tabela de eventos / histórico para uploads, plays, downloads etc.
CREATE TABLE IF NOT EXISTS public.music_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    music_track_id UUID REFERENCES public.music_tracks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    event_type VARCHAR(50) NOT NULL, -- upload, play, download, delete
    meta JSONB DEFAULT '{}', -- Dados adicionais (ex: ip, user_agent, device)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_music_events_track_id ON public.music_events(music_track_id);
CREATE INDEX IF NOT EXISTS idx_music_events_user_id ON public.music_events(user_id);
CREATE INDEX IF NOT EXISTS idx_music_events_event_type ON public.music_events(event_type);

-- Inserir categoria inicial
INSERT INTO public.music_categories (name, description) 
VALUES ('Animecore', 'Músicas inspiradas em anime com elementos modernos')
ON CONFLICT (name) DO NOTHING;