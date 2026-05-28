import type { Metadata } from 'next'
import CheckoutPage from './checkout-content'

const siteUrl = 'https://drdanielochi.com'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Purchase The University of the Streets by Dr. Daniel Ochi. Choose between hardcopy (₦10,000) or softcopy (₦7,500) editions. Secure payment via Paystack.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Purchase The University of the Streets | Dr. Daniel Ochi',
    description: 'Secure checkout for The University of the Streets. Hardcopy ₦10,000 | Softcopy ₦7,500. Pay securely with Paystack.',
    url: `${siteUrl}/checkout`,
  },
  alternates: {
    canonical: `${siteUrl}/checkout`,
  },
}

export default function Checkout() {
  return <CheckoutPage />
}
