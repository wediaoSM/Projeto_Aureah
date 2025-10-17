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

    const { email, password, fullName } = await request.json();

    // Validar dados recebidos
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    console.log('Tentando criar usuário:', { email, fullName });

    // Criar usuário no Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    console.log('Resposta do Supabase:', { data, error });

    if (error) {
      console.error('Erro do Supabase:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Usuário criado com sucesso! Verifique seu email.',
      user: data.user,
      session: data.session
    });

  } catch (error) {
    console.error('Erro na API signup:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor: ' + error.message },
      { status: 500 }
    );
  }
}