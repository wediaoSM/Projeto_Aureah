import Head from 'next/head';

export default function SEOHead({ 
  title = "Aureah - O som da sua marca começa aqui",
  description = "Criamos trilhas musicais exclusivas com IA + toque humano para marcas, criadores e empresas. Entrega em 24-48h com qualidade profissional.",
  canonical = "",
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image"
}) {
  const fullTitle = title.includes("Aureah") ? title : `${title} | Aureah`;
  const baseUrl = "https://aureah.com.br"; // Substitua pela URL real
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Aureah" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Aureah" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Aureah",
            "description": description,
            "url": baseUrl,
            "logo": `${baseUrl}/logo.png`,
            "sameAs": [
              "https://instagram.com/intotheshadows",
              "https://linkedin.com/company/intotheshadows",
              "https://youtube.com/@intotheshadows"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-11-99999-9999",
              "contactType": "Customer Service",
              "availableLanguage": "Portuguese"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR",
              "addressLocality": "São Paulo"
            },
            "offers": {
              "@type": "Offer",
              "name": "Trilhas Musicais Personalizadas",
              "description": "Criação de música exclusiva com IA + toque humano",
              "category": "Music Production"
            }
          })
        }}
      />
    </Head>
  );
}