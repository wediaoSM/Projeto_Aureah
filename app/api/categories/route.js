import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export async function GET() {
  try {
    // Buscar categorias do banco de dados
    const { data: dbCategories, error: dbError } = await supabaseAdmin
      .from('music_categories')
      .select('name')
      .order('name');

    if (dbError) {
      console.error('Erro ao buscar categorias do banco:', dbError);
    }

    // Buscar pastas físicas como fallback
    const audioPath = path.join(process.cwd(), 'public', 'audio');
    let fileSystemCategories = [];
    
    if (fs.existsSync(audioPath)) {
      const items = fs.readdirSync(audioPath, { withFileTypes: true });
      fileSystemCategories = items
        .filter(item => item.isDirectory())
        .map(item => item.name);
    }

    // Combinar categorias do banco com as do sistema de arquivos
    const dbCategoryNames = dbCategories ? dbCategories.map(cat => cat.name) : [];
    const allCategories = [...new Set([...dbCategoryNames, ...fileSystemCategories])].sort();

    return NextResponse.json({ categories: allCategories });
  } catch (error) {
    console.error('Erro ao ler categorias:', error);
    return NextResponse.json({ categories: [] });
  }
}

export async function POST(request) {
  try {
    const { categoryName, userId } = await request.json();
    
    if (!categoryName) {
      return NextResponse.json({ error: 'Nome da categoria é obrigatório' }, { status: 400 });
    }

    // Criar a pasta da categoria no sistema de arquivos
    const categoryPath = path.join(process.cwd(), 'public', 'audio', categoryName);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    // Salvar categoria no banco de dados
    const { error: dbError } = await supabaseAdmin
      .from('music_categories')
      .upsert({ 
        name: categoryName,
        description: `Categoria ${categoryName}`,
        created_by: userId
      }, { 
        onConflict: 'name',
        ignoreDuplicates: true 
      });

    if (dbError) {
      console.error('Erro ao salvar categoria no banco:', dbError);
    }

    return NextResponse.json({ success: true, message: 'Categoria criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}