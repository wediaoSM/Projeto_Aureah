import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password, fullName } = await request.json();

    console.log('API signup chamada com:', { email, fullName, passwordLength: password?.length });

    // Validar dados básicos
    if (!email || !password || !fullName) {
      console.log('Dados faltando:', { email: !!email, password: !!password, fullName: !!fullName });
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('Senha muito curta:', password.length);
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Validar email formato
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email inválido:', email);
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    console.log('Validações passaram, tentando criar usuário...');

    // Por enquanto, simular sucesso para debug
    // TODO: Reativar Supabase quando chaves estiverem corretas
    
    return NextResponse.json({
      message: 'Conta criada com sucesso! (modo de teste)',
      user: {
        id: 'test-' + Date.now(),
        email: email,
        user_metadata: { full_name: fullName }
      }
    });

  } catch (error) {
    console.error('Erro na API signup:', error);
    return NextResponse.json(
      { error: 'Erro interno: ' + error.message },
      { status: 500 }
    );
  }
}