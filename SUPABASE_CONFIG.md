# 🔧 Configuração Rápida do Supabase

## 1. Desabilitar confirmação de email (para testes)

No Supabase Dashboard:
1. Vá em **Authentication > Settings**
2. Role até **Email Auth**
3. **Desmarque** "Enable email confirmations"
4. Clique em **Save**

## 2. Configurar URL de redirecionamento

1. Ainda em **Authentication > Settings**
2. Em **Site URL**, coloque: `http://localhost:3000`
3. Em **Redirect URLs**, adicione:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000`
4. Clique em **Save**

## 3. Remover triggers problemáticos (se existirem)

Vá em **SQL Editor** e execute:
```sql
-- Remover trigger que pode estar causando erro
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Remover tabela profiles se existir e estiver causando problema
DROP TABLE IF EXISTS profiles;
```

## 4. Testar autenticação básica

Agora a autenticação deve funcionar apenas com o sistema básico do Supabase.

## 5. Se quiser restaurar profiles depois:

```sql
-- Criar tabela profiles simples (sem triggers)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Políticas simples
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles 
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles 
FOR INSERT WITH CHECK (auth.uid() = id);
```

## Status atual:
- ✅ Chaves do Supabase configuradas
- ⏳ Aguardando configuração do Dashboard
- 🔧 Sistema usando API de teste para debug