import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' });

// Importação dinâmica
const { supabaseAdmin } = await import('../lib/supabaseAdmin.js');

async function createStoragePolicies() {
  try {
    console.log('🔒 Criando políticas RLS para Storage...');

    // 1. Política para permitir que usuários autenticados façam upload
    const uploadPolicy = `
      CREATE POLICY "Authenticated users can upload to library bucket" 
      ON storage.objects
      FOR INSERT 
      WITH CHECK (
        bucket_id = 'library' 
        AND auth.role() = 'authenticated'
      );
    `;

    const { error: uploadPolicyError } = await supabaseAdmin.rpc('exec_sql', {
      sql: uploadPolicy
    });

    if (uploadPolicyError) {
      console.log('⚠️ Política de upload:', uploadPolicyError.message);
    } else {
      console.log('✅ Política de upload criada');
    }

    // 2. Política para permitir que qualquer um veja arquivos do bucket library
    const selectPolicy = `
      CREATE POLICY "Anyone can view library bucket files" 
      ON storage.objects
      FOR SELECT 
      USING (bucket_id = 'library');
    `;

    const { error: selectPolicyError } = await supabaseAdmin.rpc('exec_sql', {
      sql: selectPolicy
    });

    if (selectPolicyError) {
      console.log('⚠️ Política de visualização:', selectPolicyError.message);
    } else {
      console.log('✅ Política de visualização criada');
    }

    // 3. Política para permitir que usuários deletem apenas seus próprios arquivos
    const deletePolicy = `
      CREATE POLICY "Users can delete their own files in library bucket" 
      ON storage.objects
      FOR DELETE 
      USING (
        bucket_id = 'library' 
        AND auth.uid()::text = (string_to_array(name, '/'))[1]
      );
    `;

    const { error: deletePolicyError } = await supabaseAdmin.rpc('exec_sql', {
      sql: deletePolicy
    });

    if (deletePolicyError) {
      console.log('⚠️ Política de deleção:', deletePolicyError.message);
    } else {
      console.log('✅ Política de deleção criada');
    }

    console.log('🏁 Configuração de políticas concluída');

  } catch (error) {
    console.error('💥 Erro ao criar políticas:', error);
  }
}

// Executar
createStoragePolicies().then(() => {
  process.exit(0);
}).catch(error => {
  console.error('💥 Erro fatal:', error);
  process.exit(1);
});