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

const siteUrl = 'https://drdanielochi.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  authors: [{ name: 'Dr. Daniel Ochi', url: siteUrl }],
  creator: 'Dr. Daniel Ochi',
  publisher: 'BSSP Consulting Ltd',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'The University of the Streets',
    title: 'The University of the Streets | AI, SMEs & The Future of Nigerian Business by Dr. Daniel Ochi',
    description: 'The University of the Streets by Dr. Daniel Ochi — AI-powered strategies for Nigerian SMEs. Learn business growth, succession planning, digital entrepreneurship, and how to build a business that outlives you.',
    url: siteUrl,
    images: [
      {
        url: '/university-of-the-street.webp',
        width: 1200,
        height: 1571,
        alt: 'The University of the Streets Book Cover — AI, SMEs & The Future of Nigerian Business',
      },
      {
        url: '/sirdan.webp',
        width: 400,
        height: 410,
        alt: 'Dr. Daniel Ochi — Author, Entrepreneur, Business Strategist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The University of the Streets | AI, SMEs & The Future of Nigerian Business',
    description: 'AI-powered strategies for Nigerian SMEs by Dr. Daniel Ochi. Learn business growth, succession planning, and how to build a business that outlives you.',
    images: ['/university-of-the-street.webp'],
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
    // Add your Google Search Console verification meta tag content here
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'business',
  other: {
    'geo.region': 'NG',
    'geo.placename': 'Nigeria',
  },
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
        
        {/* JSON-LD Structured Data - WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "The University of the Streets",
              "alternateName": "Dr. Daniel Ochi",
              "url": siteUrl,
              "description": "AI-powered strategies for Nigerian SMEs. Learn business growth, succession planning, digital entrepreneurship, and how to build a business that outlives you.",
              "author": {
                "@type": "Person",
                "name": "Dr. Daniel Ochi"
              },
              "inLanguage": "en-NG",
              "isFamilyFriendly": true
            })
          }}
        />

        {/* JSON-LD Structured Data - Book Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              "name": "The University of the Streets: AI, SMEs & The Future of Nigerian Business",
              "author": {
                "@type": "Person",
                "name": "Dr. Daniel Ochi",
                "url": siteUrl,
                "sameAs": [
                  siteUrl
                ]
              },
              "description": "AI-powered strategies for Nigerian SMEs. Learn business growth, succession planning, digital entrepreneurship, and how to build a business that outlives you through practical, street-smart wisdom.",
              "isbn": "",
              "image": `${siteUrl}/university-of-the-street.webp`,
              "offers": {
                "@type": "Offer",
                "price": "7500",
                "priceCurrency": "NGN",
                "availability": "https://schema.org/InStock",
                "url": `${siteUrl}/checkout`,
                "priceValidUntil": "2027-12-31"
              },
              "publisher": {
                "@type": "Organization",
                "name": "BSSP Consulting Ltd"
              },
              "genre": ["Business", "Entrepreneurship", "AI", "SME Development"],
              "inLanguage": "en-US",
              "numberOfPages": ""
            })
          }}
        />

        {/* JSON-LD Structured Data - Person Schema (Dr. Daniel Ochi) with enhanced sameAs */}
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
              "image": `${siteUrl}/sirdan.webp`,
              "url": siteUrl,
              "sameAs": [
                `${siteUrl}`,
                "https://wa.me/2348037006559"
              ],
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
              "nationality": "Nigerian",
              "telephone": "+2348037006559"
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
              "@id": `${siteUrl}/#organization`,
              "name": "BSSP Consulting Ltd",
              "alternateName": "BSSP Consulting",
              "description": "A business advisory and enterprise development firm focused on sustainability, succession planning, executive education, and SME transformation across emerging markets.",
              "url": siteUrl,
              "logo": `${siteUrl}/placeholder-logo.png`,
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
                "contactType": "customer service",
                "availableLanguage": ["English"]
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
              "image": `${siteUrl}/university-of-the-street.webp`,
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
                  "url": `${siteUrl}/checkout`,
                  "description": "Physical hardcopy edition of The University of the Streets"
                },
                {
                  "@type": "Offer",
                  "name": "Softcopy Edition",
                  "price": "7500",
                  "priceCurrency": "NGN",
                  "availability": "https://schema.org/InStock",
                  "url": `${siteUrl}/checkout`,
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

        {/* JSON-LD Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": siteUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Book",
                  "item": `${siteUrl}/book`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Checkout",
                  "item": `${siteUrl}/checkout`
                }
              ]
            })
          }}
        />

        {/* JSON-LD Structured Data - FAQPage based on page content */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Are you running a business that depends heavily on your daily presence to survive?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The University of the Streets teaches you how to build systems that run without you, delegate effectively, and turn your hustle into a structured, scalable enterprise that outlives you."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can AI help my Nigerian SME business?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The book covers simple ways to use AI tools in your business, how to automate marketing, customer service, and operations, and how to compete with bigger companies using smart technology."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the price of The University of the Streets?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The hardcopy edition is ₦10,000 per copy and the softcopy (digital) edition is ₦7,500 per copy. Bulk purchases are available."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who is Dr. Daniel Ochi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dr. Daniel Ochi is an entrepreneur, business strategist, and thought leader in entrepreneurship development and SME growth. He holds a PhD in Data Science and is the Director of BSSP Consulting Ltd, author of The University of the Streets."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who is this book for?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "This book is for startup founders trying to grow, SME owners struggling to scale, business leaders thinking long-term, and students or aspiring entrepreneurs who want real, practical knowledge about Nigerian business."
                  }
                }
              ]
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
