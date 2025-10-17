import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    // Testar conexão básica com Supabase
    const { data, error } = await supabase.auth.getSession();
    
    return NextResponse.json({
      status: 'ok',
      connected: !error,
      hasSession: !!data?.session,
      error: error?.message || null
    });

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      connected: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { email, password, fullName } = await request.json();

    console.log('Testando signup direto:', { email, fullName });

    // Testar signup simples
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    console.log('Resultado do signup:', { data, error });

    return NextResponse.json({
      success: !error,
      user: data?.user || null,
      session: data?.session || null,
      error: error?.message || null,
      details: data
    });

  } catch (error) {
    console.error('Erro no teste:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}