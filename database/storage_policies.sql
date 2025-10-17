-- Políticas RLS para Supabase Storage
-- Execute estas queries no SQL Editor do Supabase Dashboard

-- 1. Criar bucket 'library' se não existir (execute via Dashboard ou código)
-- Nota: Esta linha deve ser executada via Dashboard > Storage ou via código JS

-- 2. Habilitar RLS no storage.objects (já está habilitado por padrão)

-- 3. Política para permitir que usuários autenticados façam upload
CREATE POLICY "Authenticated users can upload to library bucket" 
ON storage.objects
FOR INSERT 
WITH CHECK (
  bucket_id = 'library' 
  AND auth.role() = 'authenticated'
);

-- 4. Política para permitir que usuários vejam arquivos públicos do bucket library
CREATE POLICY "Anyone can view library bucket files" 
ON storage.objects
FOR SELECT 
USING (bucket_id = 'library');

-- 5. Política para permitir que usuários deletem apenas seus próprios arquivos
CREATE POLICY "Users can delete their own files in library bucket" 
ON storage.objects
FOR DELETE 
USING (
  bucket_id = 'library' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 6. Política para permitir que usuários atualizem apenas seus próprios arquivos
CREATE POLICY "Users can update their own files in library bucket" 
ON storage.objects
FOR UPDATE 
USING (
  bucket_id = 'library' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 7. Verificar se as políticas foram criadas corretamente
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';