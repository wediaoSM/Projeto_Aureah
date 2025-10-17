import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' });

// Importação dinâmica
const { supabaseAdmin } = await import('../lib/supabaseAdmin.js');

async function setupStoragePolicies() {
  try {
    console.log('🔒 Configurando políticas RLS para Storage...');

    // Criar políticas diretamente via SQL usando o service role
    const policies = [
      {
        name: 'allow_authenticated_uploads',
        sql: `
          CREATE POLICY "allow_authenticated_uploads" ON storage.objects
          FOR INSERT WITH CHECK (
            bucket_id = 'library' AND 
            (auth.role() = 'authenticated' OR auth.role() = 'service_role')
          );
        `
      },
      {
        name: 'allow_public_select',
        sql: `
          CREATE POLICY "allow_public_select" ON storage.objects
          FOR SELECT USING (bucket_id = 'library');
        `
      },
      {
        name: 'allow_authenticated_delete',
        sql: `
          CREATE POLICY "allow_authenticated_delete" ON storage.objects
          FOR DELETE USING (
            bucket_id = 'library' AND 
            (auth.role() = 'authenticated' OR auth.role() = 'service_role')
          );
        `
      }
    ];

    for (const policy of policies) {
      try {
        const { error } = await supabaseAdmin
          .from('_storage_policies')
          .insert({
            name: policy.name,
            sql: policy.sql
          });
        
        if (error) {
          console.log(`⚠️ Política ${policy.name}:`, error.message);
        } else {
          console.log(`✅ Política ${policy.name} criada`);
        }
      } catch (e) {
        console.log(`⚠️ Erro ao criar política ${policy.name}:`, e.message);
      }
    }

    // Alternativa: Configurar bucket como público para uploads
    console.log('📝 Configurando bucket como público para uploads...');
    
    const { error: bucketUpdateError } = await supabaseAdmin.storage
      .updateBucket('library', { 
        public: false, // Manter privado mas com políticas
        allowedMimeTypes: ['audio/*', 'image/*'],
        fileSizeLimit: 52428800 // 50MB
      });

    if (bucketUpdateError) {
      console.log('⚠️ Erro ao atualizar bucket:', bucketUpdateError.message);
    } else {
      console.log('✅ Bucket atualizado com sucesso');
    }

    console.log('🏁 Configuração concluída');

  } catch (error) {
    console.error('💥 Erro geral:', error);
  }
}

// Executar
setupStoragePolicies().then(() => {
  process.exit(0);
}).catch(error => {
  console.error('💥 Erro fatal:', error);
  process.exit(1);
});