# 🎵 Sistema de Upload de Músicas - Configuração do Banco de Dados

## 📋 Pré-requisitos

1. **Projeto Supabase** já configurado
2. **Variáveis de ambiente** configuradas no `.env.local`

## 🗄️ Configuração do Banco de Dados

### 1. Executar Schema SQL

No painel do Supabase, vá para **SQL Editor** e execute o script `database/music_schema.sql`:

```sql
-- O arquivo contém:
-- ✅ Tabela music_tracks (informações das músicas)
-- ✅ Tabela music_categories (categorias)
-- ✅ Índices para performance
-- ✅ Políticas RLS (Row Level Security)
-- ✅ Triggers para contadores automáticos
-- ✅ Inserção da categoria inicial "Animecore"
```

### 2. Configurar Variável de Ambiente

Adicione a **Service Role Key** no arquivo `.env.local`:

```bash
# No painel Supabase > Settings > API
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
```

⚠️ **Importante**: A Service Role Key é diferente da Anon Key e permite operações administrativas.

## 🔧 Funcionalidades Implementadas

### 📤 Upload de Arquivos
- ✅ **Salvamento físico**: Arquivos salvos em `public/audio/[categoria]/`
- ✅ **Metadados no banco**: Informações salvas na tabela `music_tracks`
- ✅ **Criação de categorias**: Novas categorias criam pastas e registros no banco
- ✅ **Validação**: Campos obrigatórios e tipos de arquivo

### 🗂️ Sistema de Categorias
- ✅ **Dinâmico**: Categorias carregadas do banco de dados
- ✅ **Sincronização**: Pastas físicas sincronizadas com banco
- ✅ **Contadores**: Número de tracks por categoria atualizado automaticamente

### 🔐 Segurança
- ✅ **RLS habilitado**: Políticas de segurança configuradas
- ✅ **Autenticação**: Apenas usuários logados podem fazer upload
- ✅ **Propriedade**: Usuários só editam suas próprias músicas

## 📡 APIs Criadas

### 🎵 `/api/music`
- **GET**: Buscar músicas com filtros (categoria, paginação)
- **POST**: Incrementar contador de reprodução

### 🗂️ `/api/categories`
- **GET**: Listar categorias (banco + sistema de arquivos)
- **POST**: Criar nova categoria (pasta + registro no banco)

### 📤 `/api/upload`
- **POST**: Upload de arquivo + metadados no banco

## 🚀 Fluxo de Upload

1. **Usuário faz upload** → Arquivo salvo fisicamente
2. **Metadados salvos** → Tabela `music_tracks` no Supabase
3. **Categoria processada** → Criada se não existir
4. **Sucesso** → Retorna IDs e caminhos dos arquivos

## 🔄 Próximos Passos

1. **Configure a Service Role Key** no `.env.local`
2. **Execute o schema SQL** no painel Supabase
3. **Teste o upload** de uma música
4. **Verifique no banco** se os dados foram salvos

## 📊 Estrutura das Tabelas

### `music_tracks`
- `id` (UUID, PK)
- `title`, `artist`, `description`, `mood`
- `tags` (array), `category`
- `audio_path`, `cover_path` (caminhos dos arquivos)
- `uploaded_by` (FK para auth.users)
- `created_at`, `play_count`, etc.

### `music_categories` 
- `id` (UUID, PK)
- `name` (único), `description`
- `track_count` (atualizado automaticamente)
- `created_by`, `created_at`