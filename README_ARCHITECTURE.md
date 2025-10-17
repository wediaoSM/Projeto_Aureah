# Projeto Aureah - Sistema de Portfólio Musical

## Arquitetura de Storage

### 🗂️ Sistema de Armazenamento (Storage)

**Supabase Storage (Bucket Privado)**
- Bucket: `private-audio` (configurável via ENV)
- Estrutura de paths: `audio/{categoria}/{YYYY-MM-DD}/{uuid}_{titulo_sanitizado}.{ext}`
- Exemplo: `audio/Animecore/2025-01-02/abc123-def_revive_again.wav`
- Segurança: Acesso via signed URLs temporárias (1h)

**Covers/Capas:**
- Path: `covers/{categoria}/{YYYY-MM-DD}/{uuid}_cover.{ext}`
- Mesmo bucket, estrutura paralela

### 🗄️ Banco de Dados (Supabase PostgreSQL)

**Tabela `music_tracks`:**
- `storage_path`: caminho do arquivo no Supabase Storage
- `storage_bucket`: nome do bucket utilizado
- `genre`, `mood`, `bpm`: campos para filtros/pesquisa
- Apenas metadados - arquivos ficam no Storage

**Tabela `music_events`:**
- Rastreamento de upload, play, download
- Histórico e analytics
- Meta em JSONB para dados adicionais

### 🔧 APIs Implementadas

**`/api/upload` (POST)**
- Upload para Supabase Storage
- Inserção de metadados no DB
- Registro de evento 'upload'
- Retorna signed URL temporário

**`/api/music` (GET)**
- Filtros: `genre`, `mood`, `bpmMin`, `bpmMax`, `q` (busca)
- Paginação: `page`, `limit`
- Retorna tracks com signed URLs

**`/api/music` (POST)**
- Incrementa play_count
- Registra evento 'play'

### 🎯 Filtros e Escalabilidade

**Índices criados:**
- `idx_music_tracks_genre`
- `idx_music_tracks_mood`
- `idx_music_tracks_bpm`
- `idx_music_tracks_category`

**Consultas suportadas:**
- Por gênero: `?genre=Synthwave`
- Por humor: `?mood=energetic`
- BPM range: `?bpmMin=120&bpmMax=140`
- Busca texto: `?q=revive`
- Combinações: `?genre=Animecore&bpmMin=100&q=again`

## 📦 Variáveis de Ambiente

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Storage
SUPABASE_STORAGE_BUCKET=private-audio
```

## 🔐 Segurança

- Service role key apenas server-side
- Bucket privado (não acesso público)
- Signed URLs temporárias (1h)
- RLS ativado no banco
- Upload validado (tipo, tamanho, usuário)

## 🚀 Próximos Passos

1. **Migração dos arquivos existentes** de `public/audio/` para Supabase Storage
2. **Cache de signed URLs** para reduzir chamadas da API
3. **Compressão de áudio** durante upload
4. **Análise de duração** automática
5. **Dashboard de analytics** baseado em `music_events`