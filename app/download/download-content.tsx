'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CheckCircle, Download, ShieldAlert } from 'lucide-react'
import Footer from '@/components/footer'

export default function DownloadContent() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if user has a valid payment reference in sessionStorage
    const paymentRef = sessionStorage.getItem('uots_payment_ref')
    if (paymentRef) {
      setIsAuthorized(true)
    }
    setChecking(false)
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen bg-[#111413] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#98da27] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#111413] flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <ShieldAlert className="w-20 h-20 text-red-400 mx-auto" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-medium text-white mb-4">
              Access Denied
            </h1>
            <p className="text-[#c2c8c2] text-lg mb-8">
              You need to purchase the book before you can download it.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#98da27] text-[#0a1410] font-semibold py-4 px-8 rounded-lg hover:bg-[#b2f746] transition duration-300 cursor-pointer"
            >
              Purchase The University of the Streets
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111413] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-lg mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-[#98da27] mx-auto" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-[#c2c8c2] text-lg mb-8">
            Thank you for purchasing The University of the Streets.
            Your digital copy is ready for download.
          </p>

          {/* Download Button */}
          <a
            href="/the-university-of-the-streets.pdf"
            download="The University of the Streets.pdf"
            className="inline-flex items-center gap-3 bg-[#98da27] text-[#0a1410] font-semibold py-4 px-8 rounded-lg hover:bg-[#b2f746] transition duration-300 mb-6 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Download Your Book (PDF)
          </a>

          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#e9c176] text-sm font-semibold uppercase tracking-wide hover:text-[#b2f746] transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
