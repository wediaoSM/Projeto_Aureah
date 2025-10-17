# 🔒 Configuração Manual de Políticas RLS - Supabase Storage

## ⚠️ IMPORTANTE: Execute estas configurações no Supabase Dashboard

Como as políticas RLS não podem ser criadas via API, você precisa configurá-las manualmente no Supabase Dashboard.

### 📋 Passo a Passo:

#### 1. Acesse o Supabase Dashboard
- Vá para: https://app.supabase.com/project/pldyocvgrpjikmeolafv
- Login com sua conta

#### 2. Navegue para Storage
- Clique em **"Storage"** no menu lateral
- Clique em **"Policies"** na aba superior

#### 3. Verifique se o bucket 'library' existe
- Na aba **"Buckets"**, confirme que o bucket `library` está listado
- ✅ **Status atual**: Bucket existe e está configurado

#### 4. Criar Políticas RLS para Storage Objects

Na seção **"Policies"** > **"storage.objects"**, clique em **"New Policy"** e crie as seguintes políticas:

##### 📤 Política 1: Upload para usuários autenticados
```sql
-- Nome: "Authenticated users can upload to library bucket"
-- Allowed operation: INSERT
-- Target roles: authenticated

-- Condição WITH CHECK:
bucket_id = 'library' AND auth.role() = 'authenticated'
```

##### 👁️ Política 2: Visualização pública
```sql
-- Nome: "Anyone can view library bucket files"
-- Allowed operation: SELECT
-- Target roles: public

-- Condição USING:
bucket_id = 'library'
```

##### 🗑️ Política 3: Deleção pelos proprietários
```sql
-- Nome: "Users can delete their own files in library bucket"
-- Allowed operation: DELETE
-- Target roles: authenticated

-- Condição USING:
bucket_id = 'library' AND auth.uid()::text = (string_to_array(name, '/'))[1]
```

### 🔧 Como Criar as Políticas:

1. **Clique em "New Policy"**
2. **Selecione "For full customization"**
3. **Preencha os campos:**
   - Policy name: (nome da política)
   - Allowed operation: (INSERT, SELECT, DELETE)
   - Target roles: (authenticated ou public)
4. **Cole a condição SQL** no campo apropriado (WITH CHECK ou USING)
5. **Clique em "Review"** e depois **"Save policy"**

### ✅ Verificação

Após criar todas as políticas, você deve ver 3 políticas listadas em **storage.objects**:
- ✅ Upload policy (INSERT)
- ✅ View policy (SELECT) 
- ✅ Delete policy (DELETE)

### 🚀 Teste Após Configuração

1. **Recarregue a página** do seu app (Ctrl+F5)
2. **Tente fazer upload** do arquivo de 41MB
3. **Deve funcionar** sem erros 413 ou RLS!

---

## 🛟 Se Ainda Não Funcionar

Caso continue com erro, execute este debug no console do navegador:

```javascript
// Verificar se o usuário está autenticado
console.log('User:', await supabase.auth.getUser());

// Testar upload direto (só para debug)
const testFile = new Blob(['test'], {type: 'text/plain'});
const result = await supabase.storage.from('library').upload('test/debug.txt', testFile);
console.log('Upload test:', result);
```

## 📞 Suporte

Se precisar de ajuda adicional, compartilhe:
1. Screenshots das políticas criadas
2. Mensagem de erro completa do console do navegador
3. Network tab mostrando a requisição que falha