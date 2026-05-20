import type { Metadata } from 'next'
import { Cormorant_Garamond, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display'
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://universityofthestreets.com'),
  title: {
    default: 'The University of the Streets | AI, SMEs & The Future of Nigerian Business by Dr. Daniel Ochi',
    template: '%s | The University of the Streets',
  },
  description: 'The University of the Streets by Dr. Daniel Ochi — AI-powered strategies for Nigerian SMEs. Learn business growth, succession planning, digital entrepreneurship, and how to build a business that outlives you through practical, street-smart wisdom.',
  keywords: [
    'Dr. Daniel Ochi',
    'University of the Streets',
    'Nigerian business books',
    'AI for SMEs Nigeria',
    'SME growth Nigeria',
    'entrepreneurship Nigeria',
    'business sustainability Africa',
    'succession planning',
    'BSSP Consulting',
    'small business growth',
    'Nigerian entrepreneur book',
    'AI and business',
    'digital entrepreneurship Nigeria',
    'family business sustainability',
    'business strategy Africa',
    'wealth creation Nigeria',
  ],
  authors: [{ name: 'Dr. Daniel Ochi', url: 'https://universityofthestreets.com' }],
  creator: 'Dr. Daniel Ochi',
  publisher: 'BSSP Consulting Ltd',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'The University of the Streets',
    title: 'The University of the Streets | AI, SMEs & The Future of Nigerian Business by Dr. Daniel Ochi',
    description: 'The University of the Streets by Dr. Daniel Ochi — AI-powered strategies for Nigerian SMEs. Learn business growth, succession planning, digital entrepreneurship, and how to build a business that outlives you.',
    url: 'https://universityofthestreets.com',
    images: [
      {
        url: '/university-of-the-street.png',
        width: 400,
        height: 600,
        alt: 'The University of the Streets Book Cover — AI, SMEs & The Future of Nigerian Business',
      },
      {
        url: '/sirdan.jpeg',
        width: 320,
        height: 320,
        alt: 'Dr. Daniel Ochi — Author, Entrepreneur, Business Strategist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The University of the Streets | AI, SMEs & The Future of Nigerian Business',
    description: 'AI-powered strategies for Nigerian SMEs by Dr. Daniel Ochi. Learn business growth, succession planning, and how to build a business that outlives you.',
    images: ['/university-of-the-street.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    other: [
      { rel: 'manifest', url: '/favicon_io/site.webmanifest' },
    ],
  },
  verification: {
    google: '',
    // Add your Google Search Console verification code here
  },
  alternates: {
    canonical: 'https://universityofthestreets.com',
  },
  category: 'business',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect for performance (Core Web Vitals) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Paystack Inline Checkout - loaded globally so it's ready on the checkout page */}
        <script src="https://js.paystack.co/v1/inline.js"></script>
        {/* JSON-LD Structured Data - Book Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              "name": "The University of the Streets: AI, SMEs & The Future of Nigerian Business",
              "alternateName": "The University of the Streets",
              "author": {
                "@type": "Person",
                "name": "Dr. Daniel Ochi",
                "url": "https://universityofthestreets.com",
                "sameAs": [
                  "https://universityofthestreets.com"
                ]
              },
              "description": "AI-powered strategies for Nigerian SMEs. Learn business growth, succession planning, digital entrepreneurship, and how to build a business that outlives you through practical, street-smart wisdom.",
              "isbn": "",
              "image": "https://universityofthestreets.com/university-of-the-street.png",
              "offers": {
                "@type": "Offer",
                "price": "7500",
                "priceCurrency": "NGN",
                "availability": "https://schema.org/InStock",
                "url": "https://universityofthestreets.com/checkout",
                "priceValidUntil": "2027-12-31"
              },
              "publisher": {
                "@type": "Organization",
                "name": "BSSP Consulting Ltd"
              },
              "genre": ["Business", "Entrepreneurship", "AI", "SME Development"],
              "inLanguage": "en-US"
            })
          }}
        />

        {/* JSON-LD Structured Data - Person Schema (Dr. Daniel Ochi) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dr. Daniel Ochi",
              "givenName": "Daniel",
              "familyName": "Ochi",
              "honorificPrefix": "Dr.",
              "jobTitle": "Entrepreneur, Business Strategist & Enterprise Development Expert",
              "description": "Dr. Daniel Ochi is an entrepreneur, business strategist, and internationally oriented thought leader in entrepreneurship development, SME growth, business sustainability, and trans-generational enterprise development. Director of BSSP Consulting Ltd and author of The University of the Streets.",
              "image": "https://universityofthestreets.com/sirdan.jpeg",
              "url": "https://universityofthestreets.com",
              "knowsAbout": [
                "Entrepreneurship",
                "SME Growth",
                "Business Sustainability",
                "Succession Planning",
                "Artificial Intelligence for Business",
                "Digital Entrepreneurship",
                "Family Business Sustainability",
                "Innovation-Driven Enterprise Development"
              ],
              "affiliation": {
                "@type": "Organization",
                "name": "BSSP Consulting Ltd"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "BSSP Consulting Ltd"
              },
              "alumniOf": "",
              "nationality": "Nigerian"
            })
          }}
        />

        {/* JSON-LD Structured Data - Organization Schema (BSSP Consulting) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BSSP Consulting Ltd",
              "alternateName": "BSSP Consulting",
              "description": "A business advisory and enterprise development firm focused on sustainability, succession planning, executive education, and SME transformation across emerging markets.",
              "url": "https://universityofthestreets.com",
              "logo": "https://universityofthestreets.com/placeholder-logo.png",
              "foundingDate": "",
              "founder": {
                "@type": "Person",
                "name": "Dr. Daniel Ochi"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+2348037006559",
                "contactType": "customer service"
              }
            })
          }}
        />

        {/* JSON-LD Structured Data - Product Schema (for pricing) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "The University of the Streets",
              "description": "AI, SMEs & The Future of Nigerian Business. A practical guide integrating street-smart entrepreneurial wisdom with AI and modern business strategies.",
              "image": "https://universityofthestreets.com/university-of-the-street.png",
              "brand": {
                "@type": "Brand",
                "name": "BSSP Consulting Ltd"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Hardcopy Edition",
                  "price": "10000",
                  "priceCurrency": "NGN",
                  "availability": "https://schema.org/InStock",
                  "url": "https://universityofthestreets.com/checkout",
                  "description": "Physical hardcopy edition of The University of the Streets"
                },
                {
                  "@type": "Offer",
                  "name": "Softcopy Edition",
                  "price": "7500",
                  "priceCurrency": "NGN",
                  "availability": "https://schema.org/InStock",
                  "url": "https://universityofthestreets.com/checkout",
                  "description": "Digital softcopy edition of The University of the Streets"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "bestRating": "5",
                "ratingCount": "1",
                "reviewCount": "1"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}