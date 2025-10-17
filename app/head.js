export default function Head() {
  return (
    <>
      <title>Aureah Music Studio | Trilhas Personalizadas e Biblioteca Musical</title>
      <meta name="description" content="Trilhas sonoras exclusivas, biblioteca musical para criadores e audio branding profissional. Música para vídeos, marcas e conteúdo digital. IA + toque humano." />
      <meta name="keywords" content="trilha sonora, música personalizada, biblioteca musical, audio branding, música para vídeo, IA música, Aureah, trilha para YouTube, trilha para TikTok, música para marcas" />
      <meta name="author" content="Aureah Music Studio" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      <meta property="og:title" content="Aureah Music Studio | Trilhas Personalizadas e Biblioteca Musical" />
      <meta property="og:description" content="Trilhas sonoras exclusivas, biblioteca musical para criadores e audio branding profissional. Música para vídeos, marcas e conteúdo digital." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://aureah.com.br" />
      <meta property="og:image" content="/og-image.png" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Aureah Music Studio | Trilhas Personalizadas e Biblioteca Musical" />
      <meta name="twitter:description" content="Trilhas sonoras exclusivas, biblioteca musical para criadores e audio branding profissional." />
      <meta name="twitter:image" content="/og-image.png" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Dados Estruturados JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Aureah Music Studio',
          url: 'https://aureah.com.br',
          logo: '/logo.png',
          sameAs: [
            'https://instagram.com/aureahmusic',
            'https://youtube.com/@aureahmusic'
          ],
          description: 'Trilhas sonoras exclusivas, biblioteca musical para criadores e audio branding profissional.'
        })
      }} />
    </>
  );
}
