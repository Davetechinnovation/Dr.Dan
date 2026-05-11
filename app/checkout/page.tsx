'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { BookOpen, Download } from 'lucide-react'
import Footer from '@/components/footer'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const [quantity, setQuantity] = useState(1)
  const [format, setFormat] = useState<'hardcopy' | 'softcopy'>('hardcopy')
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvc, setCvc] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Read format & quantity from URL params
  useEffect(() => {
    const f = searchParams.get('format')
    const q = searchParams.get('quantity')
    if (f === 'hardcopy' || f === 'softcopy') setFormat(f)
    if (q) {
      const parsed = parseInt(q, 10)
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 99) setQuantity(parsed)
    }
  }, [searchParams])

  // Update quantity when format changes and we're at the checkout
  const pricePerCopy = format === 'hardcopy' ? 10000 : 7500
  const totalNaira = quantity * pricePerCopy
  const totalUsdNaira = (quantity * (format === 'hardcopy' ? 35 : 25)).toFixed(2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert('Payment successful! Thank you for your purchase.')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#111413] flex flex-col">
      <div className="flex-1 py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Back Link */}
          <Link href="/" className="inline-flex items-center gap-2 text-[#e9c176] text-sm font-semibold uppercase tracking-wide mb-12 hover:text-[#b2f746] transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to the Story
          </Link>

          {/* Checkout Container */}
          <div className="bg-[#1d201f] border border-[#424844] rounded-lg p-8 md:p-12">
            {/* Header */}
            <h1 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">
              Secure Checkout
            </h1>
            <p className="text-[#c2c8c2] text-base mb-8">
              The University of the Streets: AI, SMEs & The Future of Nigerian business
            </p>

            {/* Format Selector */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setFormat('hardcopy')}
                className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                  format === 'hardcopy'
                    ? 'border-[#e9c176] bg-[#e9c176]/10'
                    : 'border-[#424844] bg-[#111413] hover:border-[#e9c176]/40'
                }`}
              >
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-[#e9c176]" />
                <p className="text-white font-semibold">Hardcopy</p>
                <p className="text-sm text-[#c2c8c2]">₦10,000 each</p>
              </button>
              <button
                onClick={() => setFormat('softcopy')}
                className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                  format === 'softcopy'
                    ? 'border-[#e9c176] bg-[#e9c176]/10'
                    : 'border-[#424844] bg-[#111413] hover:border-[#e9c176]/40'
                }`}
              >
                <Download className="w-8 h-8 mx-auto mb-2 text-[#e9c176]" />
                <p className="text-white font-semibold">Softcopy</p>
                <p className="text-sm text-[#c2c8c2]">₦7,500 each</p>
              </button>
            </div>

            {/* Product Info with Quantity */}
            <div className="bg-[#111413] border border-[#424844] rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0a2415] to-[#1a3a2e] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#e9c176]">
                  <span className="font-display text-2xl font-bold bg-gradient-to-r from-[#e9c176] to-[#98da27] bg-clip-text text-transparent">U</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-medium text-white mb-1">{format === 'hardcopy' ? 'Hardcopy' : 'Softcopy'} Edition</h2>
                  <p className="text-sm text-[#c2c8c2]">₦{pricePerCopy.toLocaleString()} each</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="border-t border-[#424844] pt-4 flex flex-col items-center justify-center ">
                <p className="text-sm font-semibold text-[#e9c176] uppercase tracking-widest mb-4">Quantity</p>
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-[#e9c176] text-[#e9c176] flex items-center justify-center hover:bg-[#e9c176]/10 transition text-xl font-bold cursor-pointer"
                    >
                      −
                    </button>
                    <span className="text-2xl font-bold text-white w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(99, quantity + 1))}
                      className="w-10 h-10 rounded-lg border border-[#e9c176] text-[#e9c176] flex items-center justify-center hover:bg-[#e9c176]/10 transition text-xl font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#c2c8c2]">Total</p>
                    <p className="text-2xl font-bold text-[#98da27]">₦{totalNaira.toLocaleString()}</p>
                    <p className="text-xs text-[#c2c8c2]">≈ ${totalUsdNaira} USD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div>
                <label className="block text-sm font-semibold text-[#e9c176] uppercase tracking-widest mb-4">
                  Contact Information
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-[#424844] text-white placeholder-[#8c928d] py-3 focus:outline-none focus:border-[#98da27] transition"
                />
              </div>

              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#98da27] text-[#0a1410] font-semibold py-4 rounded-lg hover:bg-[#b2f746] transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-12 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"></circle>
                      <path strokeLinecap="round" d="M12 2a10 10 0 010 20"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pay ₦{totalNaira.toLocaleString()} Now
                  </>
                )}
              </button>

              {/* Security Info */}
              <p className="text-center text-sm text-[#8c928d]">Secured by Paystack</p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function Checkout() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111413] flex items-center justify-center"><p className="text-[#c2c8c2]">Loading...</p></div>}>
      <CheckoutContent />
    </Suspense>
  )
}