import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Verificar variáveis de ambiente
    const envCheck = {
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      values: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        service_key_length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0
      }
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Ambiente OK',
      env: envCheck
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Erro interno', 
      details: error.message 
    }, { status: 500 });
  }
}