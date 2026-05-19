'use client'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { BookOpen, Download, CheckCircle } from 'lucide-react'
import Footer from '@/components/footer'

declare global {
  interface Window {
    PaystackPop: {
      setup(config: {
        key: string
        email: string
        amount: number
        ref: string
        currency?: string
        metadata?: Record<string, unknown>
        callback: (response: { reference: string; trxref: string }) => void
        onClose: () => void
      }): {
        openIframe(): void
      }
    }
  }
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [quantity, setQuantity] = useState(1)
  const [format, setFormat] = useState<'hardcopy' | 'softcopy'>('hardcopy')
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showWhatsAppConfirm, setShowWhatsAppConfirm] = useState(false)
  const [paystackReady, setPaystackReady] = useState(false)

  const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!
  const PHONE_NUMBER = '2348037006559'

  // Load Paystack script
  useEffect(() => {
    if (typeof window.PaystackPop !== 'undefined') {
      setPaystackReady(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = () => setPaystackReady(true)
    script.onerror = () => console.error('Failed to load Paystack script')
    document.head.appendChild(script)
  }, [])

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

  const pricePerCopy = format === 'hardcopy' ? 10000 : 7500
  const totalNaira = quantity * pricePerCopy
  const totalUsdNaira = (quantity * (format === 'hardcopy' ? 35 : 25)).toFixed(2)

  const generateReference = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `SIRDAN-${timestamp}-${random}`
  }

  const openPaystack = () => {
    if (!paystackReady) {
      setIsProcessing(false)
      return
    }

    setIsProcessing(true)
    const reference = generateReference()

    try {
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email,
        amount: totalNaira * 100,
        ref: reference,
        currency: 'NGN',
        metadata: { quantity, format },
        callback: (response: { reference: string }) => {
          fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reference: response.reference,
              email,
              quantity,
              format,
              amount: totalNaira,
            }),
          }).catch(() => {})
          setIsProcessing(false)
          router.push('/download')
        },
        onClose: () => {
          setIsProcessing(false)
        },
      })

      handler.openIframe()
    } catch (err) {
      console.error('Paystack error:', err)
      setIsProcessing(false)
    }
  }

  const handleWhatsAppRedirect = () => {
    const greeting = getGreeting()
    const message = `${greeting}, I need ${quantity} ${quantity === 1 ? 'copy' : 'copies'} of The University of the Streets (Hardcopy).`
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setShowWhatsAppConfirm(false)
    router.push('/')
  }

  const handleHardcopyOrder = () => {
    setShowWhatsAppConfirm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    openPaystack()
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
              {format === 'hardcopy' ? 'Order Hardcopy' : 'Secure Checkout'}
            </h1>
            <p className="text-[#c2c8c2] text-base mb-8">
              The University of the Streets: AI, SMEs & The Future of Nigerian business
            </p>

            {/* Format Selector */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => { setFormat('hardcopy'); setShowWhatsAppConfirm(false) }}
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
                onClick={() => { setFormat('softcopy'); setShowWhatsAppConfirm(false) }}
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
            <form onSubmit={format === 'softcopy' ? handleSubmit : (e) => { e.preventDefault(); handleHardcopyOrder() }} className="space-y-8">
              {/* Contact Information - only for softcopy */}
              {format === 'softcopy' && (
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
              )}

              {/* Submit Button */}
              {format === 'softcopy' ? (
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
                      Opening Paystack...
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
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#25D366] text-white font-semibold py-4 rounded-lg hover:bg-[#20bd5a] transition duration-300 flex items-center justify-center gap-2 mt-12 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order via WhatsApp
                </button>
              )}

              {/* Security Info - only show for softcopy */}
              {format === 'softcopy' && (
                <p className="text-center text-sm text-[#8c928d]">Secured by Paystack</p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* WhatsApp Confirmation Dialog */}
      {showWhatsAppConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#1d201f] border border-[#424844] rounded-lg p-8 max-w-md w-full text-center">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 text-[#98da27] mx-auto" />
            </div>
            <h2 className="font-display text-2xl font-medium text-white mb-2">
              Order Confirmation
            </h2>
            <p className="text-[#c2c8c2] mb-6">
              You're ordering <strong className="text-white">{quantity}</strong> hardcopy {quantity === 1 ? 'copy' : 'copies'}.
            </p>
            <p className="text-[#c2c8c2] text-sm mb-6">
              Continue on WhatsApp to arrange delivery?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-[#25D366] text-white font-semibold py-3 rounded-lg hover:bg-[#20bd5a] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Yes, Continue on WhatsApp
              </button>
              <button
                onClick={() => setShowWhatsAppConfirm(false)}
                className="w-full border border-[#424844] text-[#c2c8c2] font-semibold py-3 rounded-lg hover:bg-[#424844]/30 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
