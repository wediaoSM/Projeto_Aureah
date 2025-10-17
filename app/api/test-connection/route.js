import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Testar conexão básica e tabelas específicas
    const results = {};

    // Verificar se tabelas existem
    try {
      const { data: musicTracks, error: musicError } = await supabaseAdmin
        .from('music_tracks')
        .select('*')
        .limit(1);
      results.music_tracks = musicError ? { exists: false, error: musicError.message } : { exists: true, count: musicTracks?.length || 0 };
    } catch (e) {
      results.music_tracks = { exists: false, error: e.message };
    }

    try {
      const { data: categories, error: catError } = await supabaseAdmin
        .from('music_categories')
        .select('*')
        .limit(1);
      results.music_categories = catError ? { exists: false, error: catError.message } : { exists: true, count: categories?.length || 0 };
    } catch (e) {
      results.music_categories = { exists: false, error: e.message };
    }

    // Testar bucket
    try {
      const { data: buckets, error: bucketError } = await supabaseAdmin.storage.listBuckets();
      const privateBucket = buckets?.find(b => b.name === 'private-audio');
      results.storage_bucket = bucketError ? { exists: false, error: bucketError.message } : { 
        exists: !!privateBucket, 
        bucket_name: 'private-audio',
        found: privateBucket || null,
        all_buckets: buckets?.map(b => b.name) || []
      };
    } catch (e) {
      results.storage_bucket = { exists: false, error: e.message };
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Teste de conexão completo',
      results
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Erro interno', 
      details: error.message 
    }, { status: 500 });
  }
}