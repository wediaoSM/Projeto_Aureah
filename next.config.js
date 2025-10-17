/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações do projeto
  serverExternalPackages: ['@supabase/supabase-js'],
  experimental: {
    // Configurações experimentais se necessário
  },
  // Configurações para uploads grandes
  poweredByHeader: false,
  compress: false, // Desabilitar compressão para uploads grandes
};

export default nextConfig;