import dotenv from 'dotenv';

// Carregar variáveis de ambiente ANTES de importar supabaseAdmin
dotenv.config({ path: '.env.local' });

// Verificar se as variáveis foram carregadas
console.log('🔍 Verificando variáveis de ambiente...');
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Definida' : '❌ Não definida');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Definida' : '❌ Não definida');

// Importação dinâmica para garantir que as env vars foram carregadas
const { supabaseAdmin } = await import('../lib/supabaseAdmin.js');

// Script para verificar e configurar o bucket 'library' e suas políticas

async function checkAndSetupStorageBucket() {
  try {
    console.log('🔍 Verificando configuração do bucket...');

    // 1. Listar buckets existentes
    const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets();
    
    if (bucketsError) {
      console.error('❌ Erro ao listar buckets:', bucketsError);
      return;
    }

    console.log('📁 Buckets existentes:', buckets.map(b => b.name));

    // 2. Verificar se o bucket 'library' existe
    const libraryBucket = buckets.find(bucket => bucket.name === 'library');
    
    if (!libraryBucket) {
      console.log('➕ Criando bucket library...');
      
      const { data: newBucket, error: createError } = await supabaseAdmin.storage.createBucket('library', {
        public: false, // Bucket privado por segurança
        allowedMimeTypes: ['audio/*', 'image/*'], // Apenas áudio e imagens
        fileSizeLimit: 52428800 // 50MB em bytes
      });

      if (createError) {
        console.error('❌ Erro ao criar bucket:', createError);
        return;
      }

      console.log('✅ Bucket library criado:', newBucket);
    } else {
      console.log('✅ Bucket library já existe');
      console.log('📋 Configurações do bucket:', libraryBucket);
    }

    // 3. Testar upload de um arquivo pequeno
    console.log('🧪 Testando upload de arquivo pequeno...');
    
    const testContent = 'test file content';
    const testPath = 'test/test-file.txt';
    
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('library')
      .upload(testPath, testContent, {
        contentType: 'text/plain',
        upsert: true
      });

    if (uploadError) {
      console.error('❌ Erro no teste de upload:', uploadError);
    } else {
      console.log('✅ Teste de upload bem-sucedido:', uploadData);
      
      // Limpar arquivo de teste
      await supabaseAdmin.storage.from('library').remove([testPath]);
      console.log('🧹 Arquivo de teste removido');
    }

    // 4. Verificar políticas RLS
    console.log('🔒 Verificando políticas RLS...');
    
    const { data: policies, error: policiesError } = await supabaseAdmin
      .from('pg_policies')
      .select('*')
      .eq('schemaname', 'storage')
      .eq('tablename', 'objects');

    if (policiesError) {
      console.error('❌ Erro ao verificar políticas:', policiesError);
    } else {
      console.log('📜 Políticas de storage encontradas:', policies.length);
      policies.forEach(policy => {
        console.log(`  - ${policy.policyname}: ${policy.cmd} (${policy.permissive})`);
      });
    }

  } catch (error) {
    console.error('💥 Erro geral:', error);
  }
}

// Executar o script
checkAndSetupStorageBucket().then(() => {
  console.log('🏁 Verificação concluída');
  process.exit(0);
}).catch(error => {
  console.error('💥 Erro fatal:', error);
  process.exit(1);
});