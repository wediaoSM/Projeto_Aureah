# 🔧 Configuração do Supabase - Passo a Passo

## ⚠️ IMPORTANTE: Execute estas etapas ANTES de testar o upload!

### 1. 🗄️ Configurar Database

Vá para seu painel do Supabase → **SQL Editor** e execute este script:

```sql
-- Cole todo o conteúdo do arquivo database/music_schema.sql
-- Ou execute os comandos um por um
```

### 2. 🗂️ Criar Bucket de Storage

Vá para **Storage** → **Buckets** → **Create a new bucket**:

- **Nome do bucket**: `private-audio`
- **Public bucket**: ❌ **DESMARQUE** (deve ser privado)
- **File size limit**: 50MB
- **Allowed MIME types**: `audio/*,image/*`

### 3. 🔑 Configurar Variáveis de Ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

**Edite `.env.local` com suas chaves:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
SUPABASE_STORAGE_BUCKET=private-audio
```

### 4. 🔍 Onde encontrar as chaves:

**No painel do Supabase:**
- Vá em **Settings** → **API**
- `NEXT_PUBLIC_SUPABASE_URL` = **Project URL**
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = **anon public** (primeira chave)
- `SUPABASE_SERVICE_ROLE_KEY` = **service_role** (⚠️ NUNCA EXPONHA PUBLICAMENTE)

### 5. ✅ Testar configuração

Após configurar tudo:

1. **Reinicie o servidor Next.js**
2. **Vá para `/upload`**
3. **Faça upload de uma música**
4. **Verifique se apareceu no Supabase Storage**

### 🚨 Status Atual:

- ✅ Código implementado
- ❌ SQL não executado
- ❌ Bucket não criado
- ❌ Service role key não configurada

**SEM ESSAS CONFIGURAÇÕES O UPLOAD VAI FALHAR!**