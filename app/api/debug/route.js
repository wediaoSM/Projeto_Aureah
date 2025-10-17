import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    return NextResponse.json({
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'undefined',
      keyLength: supabaseAnonKey ? supabaseAnonKey.length : 0,
      nodeEnv: process.env.NODE_ENV,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao verificar configuração: ' + error.message },
      { status: 500 }
    );
  }
}