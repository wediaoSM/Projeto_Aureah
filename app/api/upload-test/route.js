import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request) {
  try {
    const contentLength = request.headers.get('content-length');
    const contentType = request.headers.get('content-type');
    
    console.log('Test endpoint - Content-Length:', contentLength);
    console.log('Test endpoint - Content-Type:', contentType);
    
    // Se for muito grande, rejeitar antes do parse
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (contentLength && parseInt(contentLength) > MAX_SIZE) {
      return NextResponse.json({
        error: 'Arquivo muito grande',
        contentLength,
        maxSize: MAX_SIZE
      }, { status: 413 });
    }
    
    // Tentar fazer parse do FormData
    const formData = await request.formData();
    const file = formData.get('file');
    
    return NextResponse.json({
      success: true,
      fileName: file?.name,
      fileSize: file?.size,
      contentLength,
      message: 'Upload test successful'
    });
    
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      error: 'Error in test endpoint',
      details: error.message
    }, { status: 500 });
  }
}