import type { Metadata } from 'next'
import HomeContent from './home-content'

const siteUrl = 'https://drdanielochi.com'

export const metadata: Metadata = {
  title: 'The University of the Streets | AI, SMEs & The Future of Nigerian Business by Dr. Daniel Ochi',
  description: 'Are you running a business that depends on your daily presence to survive? Learn how to build a business that outlives you with AI-powered strategies for Nigerian SMEs.',
  openGraph: {
    title: 'The University of the Streets | AI, SMEs & The Future of Nigerian Business by Dr. Daniel Ochi',
    description: 'Are you running a business that depends on your daily presence to survive? Learn how to build a business that outlives you.',
    url: siteUrl,
  },
  twitter: {
    title: 'The University of the Streets | AI, SMEs & The Future of Nigerian Business',
    description: 'Are you running a business that depends on your daily presence to survive? Learn how to build a business that outlives you.',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  return <HomeContent />
}
