import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  try {
    // Validar variáveis de ambiente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Variáveis de ambiente não configuradas');
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      );
    }

    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { email, password } = await request.json();

    // Validar dados recebidos
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    console.log('Tentando fazer login:', { email });

    // Fazer login no Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('Resposta do login:', { data, error });

    if (error) {
      console.error('Erro de login:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Login realizado com sucesso!',
      user: data.user,
      session: data.session
    });

  } catch (error) {
    console.error('Erro na API signin:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor: ' + error.message },
      { status: 500 }
    );
  }
}