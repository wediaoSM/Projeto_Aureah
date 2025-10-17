# 🔒 CONFIGURE AS POLÍTICAS RLS AGORA

## 1. Acesse o SQL Editor:
https://app.supabase.com/project/pldyocvgrpjikmeolafv/sql

## 2. Execute estas queries UMA POR VEZ:

### Query 1: Remover políticas existentes (se houver)
```sql
DROP POLICY IF EXISTS "allow_authenticated_uploads" ON storage.objects;
DROP POLICY IF EXISTS "allow_public_select" ON storage.objects;
DROP POLICY IF EXISTS "allow_authenticated_delete" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
```

### Query 2: Criar política de upload para usuários autenticados
```sql
CREATE POLICY "allow_authenticated_uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'library' AND 
  auth.role() = 'authenticated'
);
```

### Query 3: Criar política de visualização pública
```sql
CREATE POLICY "allow_public_select" ON storage.objects
FOR SELECT USING (bucket_id = 'library');
```

### Query 4: Criar política de deleção para usuários autenticados
```sql
CREATE POLICY "allow_authenticated_delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'library' AND 
  auth.role() = 'authenticated'
);
```

### Query 5: Verificar se as políticas foram criadas
```sql
SELECT policyname, cmd, permissive 
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY policyname;
```

## 3. Após executar todas as queries:
1. Recarregue a página do seu app
2. Teste o upload novamente
3. Deve funcionar! 🎵

## 4. Se ainda não funcionar, execute esta query adicional:
```sql
-- Política mais permissiva para testes
CREATE POLICY "temp_allow_all_library" ON storage.objects
FOR ALL USING (bucket_id = 'library')
WITH CHECK (bucket_id = 'library');
```