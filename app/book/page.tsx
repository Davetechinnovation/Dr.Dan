import type { Metadata } from 'next'
import BookContent from './book-content'

const siteUrl = 'https://drdanielochi.com'

export const metadata: Metadata = {
  title: 'Book Overview',
  description: 'The University of the Streets: AI, SMEs & The Future of Nigerian Business by Dr. Daniel Ochi. A practical blueprint for survival, sustainability, and multi-generational success.',
  openGraph: {
    title: 'The University of the Streets | Book by Dr. Daniel Ochi',
    description: 'AI, SMEs & The Future of Nigerian Business — a groundbreaking book bridging traditional Nigerian enterprise with cutting-edge artificial intelligence.',
    url: `${siteUrl}/book`,
  },
  alternates: {
    canonical: `${siteUrl}/book`,
  },
}

export default function BookPage() {
  return <BookContent />
}
