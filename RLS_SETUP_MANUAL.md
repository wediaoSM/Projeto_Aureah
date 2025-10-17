# 🔒 INSTRUÇÕES PARA CONFIGURAR RLS MANUALMENTE

## ⚠️ EXECUTE ESTAS QUERIES NO SUPABASE DASHBOARD

1. **Acesse**: https://app.supabase.com/project/pldyocvgrpjikmeolafv/sql
2. **Execute estas queries uma por vez**:

### Query 1: Política de Upload
```sql
CREATE POLICY "allow_authenticated_uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'library' AND 
  auth.role() = 'authenticated'
);
```

### Query 2: Política de Visualização
```sql
CREATE POLICY "allow_public_select" ON storage.objects
FOR SELECT USING (bucket_id = 'library');
```

### Query 3: Política de Deleção
```sql
CREATE POLICY "allow_authenticated_delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'library' AND 
  auth.role() = 'authenticated'
);
```

### Query 4: Verificar Políticas Criadas
```sql
SELECT policyname, cmd, permissive, roles, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects'
AND policyname LIKE '%library%' OR policyname LIKE '%allow_%';
```

## 🚀 APÓS EXECUTAR AS QUERIES:

1. Recarregue a página do seu app
2. Teste o upload do arquivo de 41MB
3. Deve funcionar sem erro 413!

## 📞 Se ainda não funcionar:
Execute no console do navegador para debug:
```javascript
const { data: user } = await supabase.auth.getUser();
console.log('User:', user);
```