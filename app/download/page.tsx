import type { Metadata } from 'next'
import DownloadContent from './download-content'

const siteUrl = 'https://drdanielochi.com'

export const metadata: Metadata = {
  title: 'Download Your Book',
  description: 'Payment successful! Download your copy of The University of the Streets by Dr. Daniel Ochi.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Download The University of the Streets | Dr. Daniel Ochi',
    description: 'Thank you for purchasing The University of the Streets. Your digital copy is ready for download.',
    url: `${siteUrl}/download`,
  },
  alternates: {
    canonical: `${siteUrl}/download`,
  },
}

export default function DownloadPage() {
  return <DownloadContent />
}
