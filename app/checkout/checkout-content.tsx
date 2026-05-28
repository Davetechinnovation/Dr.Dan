'use client'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { BookOpen, Download, Copy, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Footer from '@/components/footer'
import type { MonnifyInitResponse } from '@/app/api/monnify-init/route'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatTimeLeft(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

type CheckoutStep = 'form' | 'payment' | 'verifying' | 'confirmed'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [quantity, setQuantity] = useState(1)
  const [format, setFormat] = useState<'hardcopy' | 'softcopy' | null>(null)
  const [paramsLoaded, setParamsLoaded] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<CheckoutStep>('form')
  const [paymentDetails, setPaymentDetails] = useState<MonnifyInitResponse | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(40 * 60 * 1000) // 40 minutes
  const [error, setError] = useState('')
  const [showWhatsAppConfirm, setShowWhatsAppConfirm] = useState(false)
  const [showExpiredModal, setShowExpiredModal] = useState(false)
  const [pollCount, setPollCount] = useState(0)
  const [isTestMode, setIsTestMode] = useState(false)

  const PHONE_NUMBER = '2348037006559'

  useEffect(() => {
    // Detect test mode — Monnify TEST keys or localhost/vercel preview
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname.includes('vercel')
    const isTestKey = process.env.NEXT_PUBLIC_MONNIFY_API_KEY?.startsWith('MK_TEST')
    setIsTestMode(isLocal || !!isTestKey)
  }, [])

  // Read format & quantity from URL params
  useEffect(() => {
    const f = searchParams.get('format')
    const q = searchParams.get('quantity')

    let resolvedFormat: 'hardcopy' | 'softcopy' = 'hardcopy'
    if (f === 'hardcopy' || f === 'softcopy') {
      resolvedFormat = f
    }
    setFormat(resolvedFormat)

    if (q) {
      const parsed = parseInt(q, 10)
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 99) {
        setQuantity(parsed)
      }
    }

    setParamsLoaded(true)
  }, [searchParams])

  // Restore payment state from sessionStorage on refresh
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('uots_checkout')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.step === 'payment' && parsed.paymentDetails) {
          setStep('payment')
          setPaymentDetails(parsed.paymentDetails)
          setName(parsed.name || '')
          setEmail(parsed.email || '')
          if (parsed.format) setFormat(parsed.format)
          if (parsed.quantity) setQuantity(parsed.quantity)
          // Restore countdown based on when it was saved
          const elapsed = Date.now() - (parsed.savedAt || Date.now())
          const remaining = Math.max(0, 2400000 - elapsed) // 40 minutes
          setTimeLeft(remaining)
        }
      }
    } catch {
      // Ignore corrupt sessionStorage
    }
  }, [])

  const pricePerCopy = format === 'hardcopy' ? 10000 : format === 'softcopy' ? 7500 : 0
  const totalNaira = quantity * pricePerCopy

  const generateReference = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `SIRDAN-${timestamp}-${random}`
  }

  // Countdown timer for payment account expiry
  useEffect(() => {
    if (step !== 'payment') return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1000
        if (next <= 0) {
          clearInterval(interval)
          // Clear session so user can request a fresh account
          sessionStorage.removeItem('uots_checkout')
          setShowExpiredModal(true)
          return 0
        }
        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [step])

  // Poll for payment confirmation
  useEffect(() => {
    if (step !== 'payment' || !paymentDetails) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transactionReference: paymentDetails.transactionReference,
            paymentReference: paymentDetails.paymentReference,
            email,
            quantity,
            format,
            amount: totalNaira,
          }),
        })

        const data = await res.json()

        if (data.paid) {
          setStep('confirmed')
          clearInterval(interval)
          sessionStorage.removeItem('uots_checkout')
          sessionStorage.setItem('uots_payment_ref', paymentDetails.paymentReference)
          setTimeout(() => {
            window.location.href = '/download'
          }, 2000)
        } else {
          setPollCount((p) => p + 1)
        }
      } catch {
        setPollCount((p) => p + 1)
      }
    }, 5000)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, paymentDetails])

  const handleInitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name || !format) return

    setIsProcessing(true)
    setError('')
    const ref = generateReference()

    try {
      const res = await fetch('/api/monnify-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalNaira,
          customerName: name,
          customerEmail: email,
          paymentReference: ref,
          quantity,
          format,
        }),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error || 'Failed to initialize payment')
        setIsProcessing(false)
        return
      }

      setPaymentDetails(data)
      setStep('payment')
      setTimeLeft(40 * 60 * 1000)
      setPollCount(0)

      // Persist to sessionStorage so it survives refresh
      try {
        sessionStorage.setItem('uots_checkout', JSON.stringify({
          step: 'payment',
          paymentDetails: data,
          name,
          email,
          format,
          quantity,
          savedAt: Date.now(),
        }))
      } catch {
        // Ignore storage errors
      }
    } catch {
      setError('Network error. Please try again.')
    }

    setIsProcessing(false)
  }

  const handleSimulatePayment = async () => {
    if (!paymentDetails) return

    setIsProcessing(true)

    try {
      const res = await fetch('/api/simulate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionReference: paymentDetails.transactionReference,
          paymentReference: paymentDetails.paymentReference,
          email,
          quantity,
          format,
          amount: totalNaira,
        }),
      })

      const data = await res.json()

      if (data.paid) {
        setStep('confirmed')
        sessionStorage.removeItem('uots_checkout')
        sessionStorage.setItem('uots_payment_ref', paymentDetails.paymentReference)
        setTimeout(() => {
          window.location.href = '/download'
        }, 2000)
      }
    } catch {
      console.error('Simulate payment failed')
    }

    setIsProcessing(false)
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
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

  if (!paramsLoaded || !format) {
    return (
      <div className="min-h-screen bg-[#111413] flex items-center justify-center">
        <p className="text-[#c2c8c2]">Loading...</p>
      </div>
    )
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
              {step === 'form' ? (format === 'hardcopy' ? 'Order Hardcopy' : 'Secure Checkout') : 'Complete Your Payment'}
            </h1>
            <p className="text-[#c2c8c2] text-base mb-8">
              The University of the Streets: AI, SMEs & The Future of Nigerian business
            </p>

            {/* Step 1: Format + Quantity + Form */}
            {step === 'form' && (
              <>
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
                    <div className="w-16 h-16 bg-linear-to-br from-[#0a2415] to-[#1a3a2e] rounded-lg flex items-center justify-center shrink-0 border border-[#e9c176]">
                      <span className="font-display text-2xl font-bold bg-linear-to-r from-[#e9c176] to-[#98da27] bg-clip-text text-transparent">U</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-lg font-medium text-white mb-1">{format === 'hardcopy' ? 'Hardcopy' : 'Softcopy'} Edition</h2>
                      <p className="text-sm text-[#c2c8c2]">₦{pricePerCopy.toLocaleString()} each</p>
                    </div>
                  </div>

                  <div className="border-t border-[#424844] pt-4 flex flex-col items-center justify-center">
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
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                {format === 'softcopy' ? (
                  <form onSubmit={handleInitPayment} className="space-y-8">
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-[#e9c176] uppercase tracking-widest mb-4">
                        Contact Information
                      </label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-[#424844] text-white placeholder-[#8c928d] py-3 focus:outline-none focus:border-[#98da27] transition"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-[#424844] text-white placeholder-[#8c928d] py-3 focus:outline-none focus:border-[#98da27] transition"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                        <p className="text-red-400 text-sm">{error}</p>
                      </div>
                    )}

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
                          Initializing Payment...
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

                    <p className="text-center text-sm text-[#8c928d]">Secured by Monnify</p>
                  </form>
                ) : (
                  <>
                    <button
                      onClick={handleHardcopyOrder}
                      className="w-full bg-[#25D366] text-white font-semibold py-4 rounded-lg hover:bg-[#20bd5a] transition duration-300 flex items-center justify-center gap-2 mt-12 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884-1.804 0-3.521-.489-5.012-1.383l-.008.005z"/>
                      </svg>
                      Order via WhatsApp
                    </button>
                  </>
                )}
              </>
            )}

            {/* Step 2: Payment Details — Bank Transfer Account */}
            {step === 'payment' && paymentDetails && (
              <div className="animate-fade-in">
                {/* Order Summary */}
                <div className="bg-[#111413] border border-[#424844] rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#c2c8c2] text-sm">{format === 'hardcopy' ? 'Hardcopy' : 'Softcopy'} × {quantity}</span>
                    <span className="text-white font-semibold">₦{totalNaira.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-[#424844] pt-3 flex items-center justify-between">
                    <span className="text-[#c2c8c2] font-semibold">Total Due</span>
                    <span className="text-2xl font-bold text-[#98da27]">₦{totalNaira.toLocaleString()}</span>
                  </div>
                </div>


                {/* Bank Transfer Details */}
                <div className="bg-[#0a1410] border border-[#e9c176]/30 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#98da27]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#98da27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#e9c176] text-sm font-semibold uppercase tracking-widest">Bank Transfer</p>
                      <p className="text-[#c2c8c2] text-xs">Transfer the exact amount to the account below</p>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="bg-[#111413] border border-[#424844] rounded-lg p-4 mb-5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Clock className={`w-4 h-4 shrink-0 ${timeLeft < 5 * 60 * 1000 ? 'text-red-400' : 'text-[#e9c176]'}`} />
                        <span className={`text-xs md:text-sm font-semibold truncate ${timeLeft < 5 * 60 * 1000 ? 'text-red-400' : 'text-[#e9c176]'}`}>
                          Account Expires In
                        </span>
                      </div>
                      <span className={`text-base md:text-lg font-bold shrink-0 ${timeLeft < 5 * 60 * 1000 ? 'text-red-400' : 'text-[#98da27]'}`}>
                        {formatTimeLeft(timeLeft)}
                      </span>
                    </div>
                    <p className="text-[#8c928d] text-xs mt-2">Make your transfer before the account expires</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#111413] border border-[#424844] rounded-lg p-4">
                      <p className="text-xs text-[#8c928d] mb-1">Bank</p>
                      <p className="text-white font-semibold">{paymentDetails.bankName}</p>
                    </div>
                    <div className="bg-[#111413] border border-[#e9c176]/30 rounded-lg p-4">
                      <p className="text-xs text-[#8c928d] mb-1">Account Number</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-lg md:text-2xl font-bold text-[#e9c176] tracking-widest truncate">{paymentDetails.accountNumber}</p>
                        <button
                          onClick={() => handleCopy(paymentDetails.accountNumber, 'account')}
                          className="shrink-0 flex items-center gap-1 text-[#98da27] hover:text-[#b2f746] transition text-sm font-semibold cursor-pointer"
                        >
                          {copiedField === 'account' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          {copiedField === 'account' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#111413] border border-[#424844] rounded-lg p-4">
                      <p className="text-xs text-[#8c928d] mb-1">Account Name</p>
                      <p className="text-white font-semibold">{paymentDetails.accountName}</p>
                    </div>
                    <div className="bg-[#111413] border border-[#424844] rounded-lg p-4">
                      <p className="text-xs text-[#8c928d] mb-1">Amount to Transfer</p>
                      <p className="text-2xl font-bold text-[#98da27]">₦{totalNaira.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Polling Status */}
                <div className="bg-[#111413] border border-[#424844] rounded-lg p-5 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-4 h-4 animate-spin text-[#e9c176]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"></circle>
                      <path strokeLinecap="round" d="M12 2a10 10 0 010 20"></path>
                    </svg>
                    <p className="text-[#e9c176] text-sm font-semibold">Waiting for Payment</p>
                  </div>
                  <p className="text-[#8c928d] text-xs">
                    After you transfer, we'll automatically detect it and redirect you to download.
                  </p>
                </div>

                {/* Test Mode — Quick Payment Simulator */}
                {isTestMode && (
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full bg-[#98da27]/10 text-[#98da27] font-semibold py-3 px-6 rounded-lg border border-[#98da27]/30 hover:bg-[#98da27]/20 transition duration-300 disabled:opacity-50 cursor-pointer text-sm flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"></circle>
                          <path strokeLinecap="round" d="M12 2a10 10 0 010 20"></path>
                        </svg>
                        Completing Payment...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Simulate Successful Payment
                      </>
                    )}
                  </button>
                )}

                {/* WhatsApp Support */}
                <div className="mt-6 p-4 bg-[#111413] border border-[#424844] rounded-lg text-center">
                  <p className="text-sm text-[#c2c8c2] mb-2">Need help? Contact us on WhatsApp</p>
                  <a
                    href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(`Hi, I just made a transfer of ₦${totalNaira.toLocaleString()} to ${paymentDetails.bankName} ${paymentDetails.accountNumber} for The University of the Streets. Please confirm receipt.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-semibold text-sm hover:text-[#20bd5a] transition"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            )}

            {/* Step 3: Confirmed */}
            {step === 'confirmed' && (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-[#98da27]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#98da27]" />
                </div>
                <h2 className="font-display text-3xl font-bold text-white mb-4">Payment Confirmed!</h2>
                <p className="text-[#c2c8c2] mb-6">Redirecting you to download your book...</p>
                <div className="w-8 h-8 border-2 border-[#98da27] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Expired Modal */}
      {showExpiredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#1d201f] border border-[#e9c176]/50 rounded-lg p-8 md:p-10 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="font-display text-3xl font-medium text-white mb-4">Account Expired</h2>
            <p className="text-[#c2c8c2] text-base mb-2">
              The payment account is no longer valid.
            </p>
            <p className="text-[#c2c8c2] text-sm mb-8">
              Please request a fresh account to complete your purchase.
            </p>
            <button
              onClick={() => {
                setShowExpiredModal(false)
                setStep('form')
                setPaymentDetails(null)
                setTimeLeft(40 * 60 * 1000)
                sessionStorage.removeItem('uots_checkout')
              }}
              className="w-full bg-[#98da27] text-[#0a1410] font-semibold py-4 rounded-lg hover:bg-[#b2f746] transition duration-300 cursor-pointer"
            >
              Request New Account
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Confirmation Dialog (for Hardcopy) */}
      {showWhatsAppConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#1d201f] border-2 border-[#e9c176]/50 rounded-lg p-8 md:p-10 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-linear-to-br from-[#0a2415] to-[#1a3a2e] rounded-lg flex items-center justify-center mx-auto mb-6 border border-[#e9c176]">
              <span className="font-display text-2xl font-bold bg-linear-to-r from-[#e9c176] to-[#98da27] bg-clip-text text-transparent">U</span>
            </div>

            <h2 className="font-display text-3xl font-medium text-white mb-2">Order Summary</h2>
            <p className="text-[#c2c8c2] text-base mb-6">The University of the Streets: AI, SMEs & The Future of Nigerian business</p>

            <div className="bg-[#111413] border border-[#424844] rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#c2c8c2] text-sm">Edition</span>
                <span className="text-white font-semibold">Hardcopy</span>
              </div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#424844]">
                <span className="text-[#c2c8c2] text-sm">Quantity</span>
                <span className="text-white font-semibold">{quantity} {quantity === 1 ? 'copy' : 'copies'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#c2c8c2] text-sm">Total</span>
                <span className="text-xl font-bold text-[#98da27]">₦{totalNaira.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[#e9c176] text-sm font-semibold uppercase tracking-widest mb-6">Continue on WhatsApp to arrange delivery</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-[#25D366] text-white font-semibold py-4 rounded-lg hover:bg-[#20bd5a] transition duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884-1.804 0-3.521-.489-5.012-1.383l-.008.005z"/>
                </svg>
                Continue on WhatsApp
              </button>
              <button
                onClick={() => setShowWhatsAppConfirm(false)}
                className="w-full border border-[#424844] text-[#c2c8c2] font-semibold py-3 rounded-lg hover:bg-[#424844]/30 hover:text-white transition duration-300 cursor-pointer"
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
