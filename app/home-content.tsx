'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { BookOpen, Download } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { useToast } from '@/hooks/use-toast'

export default function HomeContent() {
  const { toast } = useToast()

  const handleScrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const [quantity, setQuantity] = useState(1)
  const [format, setFormat] = useState<'hardcopy' | 'softcopy' | null>(null)

  const pricePerCopy = format === 'hardcopy' ? 10000 : format === 'softcopy' ? 7500 : 0
  const totalNaira = quantity * pricePerCopy

  const handleCheckout = (e: React.MouseEvent) => {
    if (!format) {
      e.preventDefault()
      toast({
        title: 'Select a format',
        description: 'Please choose Hardcopy or Softcopy before checking out.',
        variant: 'destructive',
      })
      return
    }
    // Allow navigation to checkout with params
  }

  return (
    <div className="min-h-screen bg-[#111413]">
      <Navigation />
      
      {/* Hero Section - Attention Hook */}
      <section className="relative w-full overflow-hidden bg-linear-to-br from-[#111413] via-[#0f2415] to-[#1a3a2e] py-20 md:py-32">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[#0b2418] blur-3xl"></div>
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#0b2418] blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 text-center">
          <div className="inline-block bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-2 mb-6">
            <p className="text-red-400 text-xs md:text-sm font-bold uppercase tracking-wider">
              Attention Nigerian Entrepreneurs, SME Owners & Business Leaders
            </p>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Are You Running a Business That Depends Heavily on Your Daily Presence to Survive?
          </h1>
          
          <p className="text-lg md:text-xl text-[#c2c8c2] max-w-3xl mx-auto mb-8 leading-relaxed">
            Do you worry about slow growth, rising competition, economic uncertainty, or what will happen to your business in the next 5–10 years? <span className="text-[#e9c176] font-semibold">Or worse... what happens when you are no longer there?</span>
          </p>
          
          <p className="text-base md:text-lg text-[#e9c176] font-semibold mb-12">
            If any of these sound familiar, then this book was written specifically for YOU.
          </p>
          
          <a href="#pricing" onClick={handleScrollToPricing}>
            <button className="bg-[#98da27] text-[#0a1410] font-bold py-4 px-10 rounded-lg hover:bg-[#b2f746] transition duration-300 text-lg cursor-pointer">
              Yes, I Want to Build a Business That Outlives Me →
            </button>
          </a>
        </div>
      </section>

      {/* About the Professor */}
      <section className="bg-[#111413] py-20 md:py-32 px-6 md:px-12 border-b border-[#424844]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm font-semibold text-[#98da27] uppercase tracking-widest mb-4">About the Author</p>
              <meta name="author" content="Dr. Daniel Ochi" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Dr. Daniel Ochi
            </h2>
            <p className="text-lg text-[#e9c176] font-semibold">PhD in Entrepreneurship & Business Management | AI, SME, Business Sustainability & Succession Planning Specialist</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Professor Photo */}
            <div className="flex justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-linear-to-br from-[#0a2415] to-[#1a3a2e] border-2 border-[#e9c176]/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="/sirdan.webp"
                  alt="Dr. Daniel Ochi"
                  width={320}
                  height={410}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div className="bg-[#0a1410] border border-[#424844] rounded-lg p-8">
                <p className="text-[#c2c8c2] leading-relaxed mb-6">
                  Dr. Daniel Ochi is an entrepreneur, business strategist, and internationally oriented thought leader in entrepreneurship development, SME growth, business sustainability, and trans-generational enterprise development.
                </p>
                <p className="text-[#c2c8c2] leading-relaxed mb-6">
                  He is the Director of BSSP Consulting Ltd, a business advisory and enterprise development firm focused on sustainability, succession planning, executive education, and SME transformation across emerging markets. Through strategic collaborations with international academic institutions, including a UK-based business school, he has contributed to the development of executive and professional programs designed to prepare entrepreneurs and business leaders for the future global economy.
                </p>
                <p className="text-[#c2c8c2] leading-relaxed mb-6">
                  Dr. Ochi holds professional and executive interests in Artificial Intelligence for Business Growth, Digital Entrepreneurship, Family Business Sustainability, and Innovation-Driven Enterprise Development. His work combines practical entrepreneurial experience with academic research and global business perspectives, helping organizations build resilient, scalable, and future-ready enterprises.
                </p>
                <p className="text-[#c2c8c2] leading-relaxed">
                  As an educator and enterprise development advocate, he teaches Entrepreneurship and Wealth creation, mentors emerging entrepreneurs, and speaks on issues relating to SME growth, innovation, business succession, and the future of African enterprises in the digital age. He is also associated with professional and business development networks that promote entrepreneurship, leadership, and sustainable enterprise development within Africa and the international business community.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0a1410] border border-[#424844] rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-[#e9c176]">15+</p>
                  <p className="text-xs text-[#c2c8c2]">Years Experience</p>
                </div>
                <div className="bg-[#0a1410] border border-[#424844] rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-[#e9c176]">Director</p>
                  <p className="text-xs text-[#c2c8c2]">BSSP Consulting Ltd</p>
                </div>
                <div className="bg-[#0a1410] border border-[#424844] rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-[#e9c176]">Author</p>
                  <p className="text-xs text-[#c2c8c2]">The University of the Streets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Introduction */}
      <section id="book" className="bg-[#0a1410] py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm font-semibold text-[#98da27] uppercase tracking-widest mb-4">Introducing</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              THE UNIVERSITY OF THE STREETS
            </h2>
            <p className="text-lg md:text-xl text-[#e9c176] font-semibold max-w-3xl mx-auto">
              AI, SMEs & The Future of Nigerian Business
            </p>
            <p className="text-base md:text-lg text-[#c2c8c2] max-w-2xl mx-auto mt-4">
              How Small and Medium Scale Businesses Can Grow, Scale and Survive Across Generations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="bg-linear-to-br from-[#0a2415] to-[#1a3a2e] rounded-lg overflow-hidden border border-[#e9c176]/20 shadow-2xl">
                  <Image
                    src="/university-of-the-street.webp"
                    alt="The University of the Streets Book Cover"
                    width={400}
                    height={524}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#111413] border border-[#e9c176]/20 rounded-lg p-8">
                <p className="text-base md:text-lg text-[#c2c8c2] mb-6 leading-relaxed italic">
                  &ldquo;This is not theory. This is real-world, practical wisdom drawn from the streets of Nigerian business, combined with the power of Artificial Intelligence (AI) and modern business strategies.&rdquo;
                </p>
                <p className="text-[#c2c8c2] leading-relaxed">
                  A definitive guide detailing how small and medium scale businesses can grow, sustain and survive across generations. The blueprint for integrating hyper-modern AI with grassroots, proven market strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Benefits / What You Will Gain */}
      <section className="bg-[#111413] py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm font-semibold text-[#98da27] uppercase tracking-widest mb-4">What Makes This Book Different</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              What You Will Gain From This Book
            </h2>
            <p className="text-base md:text-lg text-[#c2c8c2] max-w-2xl mx-auto">
              Proven strategies drawn from the streets of Nigerian business, enhanced by AI and modern frameworks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="bg-[#0a1410] border border-[#424844] rounded-lg p-8 hover:border-[#e9c176]/40 transition">
              <div className="w-14 h-14 rounded-full bg-[#e9c176]/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#e9c176]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">How to Grow Your Business Faster</h3>
              <p className="text-[#c2c8c2] mb-4 leading-relaxed">Learn practical strategies to:</p>
              <ul className="space-y-2 text-[#c2c8c2]">
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>Attract more customers consistently</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>Increase your sales without increasing stress</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>Position your business for long-term relevance</span>
                </li>
              </ul>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#0a1410] border border-[#424844] rounded-lg p-8 hover:border-[#e9c176]/40 transition">
              <div className="w-14 h-14 rounded-full bg-[#e9c176]/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#e9c176]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">How to Scale Beyond Yourself</h3>
              <p className="text-[#c2c8c2] mb-4 leading-relaxed">Stop being the only engine of your business.</p>
              <ul className="space-y-2 text-[#c2c8c2]">
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>Build systems that run without you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>Delegate effectively and build a strong team</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>Turn your hustle into a structured, scalable enterprise</span>
                </li>
              </ul>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#0a1410] border border-[#424844] rounded-lg p-8 hover:border-[#e9c176]/40 transition">
              <div className="w-14 h-14 rounded-full bg-[#e9c176]/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#e9c176]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">How to Use AI to Your Advantage</h3>
              <p className="text-[#c2c8c2] mb-4 leading-relaxed">AI is not the future — it is NOW.</p>
              <ul className="space-y-2 text-[#c2c8c2]">
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>Simple ways to use AI tools in your business</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>How to automate marketing, customer service, and operations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>How to compete with bigger companies using smart technology</span>
                </li>
              </ul>
            </div>

            {/* Benefit 4 */}
            <div className="bg-[#0a1410] border border-[#424844] rounded-lg p-8 hover:border-[#e9c176]/40 transition">
              <div className="w-14 h-14 rounded-full bg-[#e9c176]/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#e9c176]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">How to Build a Business That Outlives You</h3>
              <p className="text-[#c2c8c2] mb-4 leading-relaxed">Most Nigerian businesses die with the founder.</p>
              <ul className="space-y-2 text-[#c2c8c2]">
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>Succession planning strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>How to build a legacy business</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#98da27] mt-1">✓</span>
                  <span>How to ensure continuity across generations</span>
                </li>
              </ul>
            </div>

            {/* Benefit 5 - Full width */}
            <div className="md:col-span-2 bg-[#0a1410] border border-[#424844] rounded-lg p-8 hover:border-[#e9c176]/40 transition">
              <div className="w-14 h-14 rounded-full bg-[#e9c176]/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#e9c176]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">How to Navigate the Realities of Nigerian Business Environment</h3>
              <p className="text-[#c2c8c2] mb-4 leading-relaxed">No sugar-coating. No imported theories.</p>
              <div className="grid md:grid-cols-3 gap-4">
                <ul className="space-y-2 text-[#c2c8c2]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#98da27] mt-1">✓</span>
                    <span>Street-smart strategies for survival and growth</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-[#c2c8c2]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#98da27] mt-1">✓</span>
                    <span>How to adapt to Nigeria's economic challenges</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-[#c2c8c2]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#98da27] mt-1">✓</span>
                    <span>How to turn obstacles into opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="bg-[#0a1410] py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-linear-to-br from-[#0f2415] to-[#1a3a2e] rounded-2xl p-12 md:p-16 text-center border border-[#e9c176]/10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
              This Book Is For You If You Are:
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-[#111413]/80 border border-[#424844] rounded-lg p-6">
                <p className="text-white font-semibold">A startup founder trying to grow</p>
              </div>
              <div className="bg-[#111413]/80 border border-[#424844] rounded-lg p-6">
                <p className="text-white font-semibold">An SME owner struggling to scale</p>
              </div>
              <div className="bg-[#111413]/80 border border-[#424844] rounded-lg p-6">
                <p className="text-white font-semibold">A business leader thinking long-term</p>
              </div>
              <div className="bg-[#111413]/80 border border-[#424844] rounded-lg p-6">
                <p className="text-white font-semibold">A student or aspiring entrepreneur who wants real knowledge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Order */}
      <section id="pricing" className="bg-[#111413] py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs md:text-sm font-semibold text-[#98da27] uppercase tracking-widest mb-4">Invest in Your Business Knowledge Today</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-12">
            Choose Your Format & Quantity
          </h2>

          <div className="bg-[#0a1410] border border-[#e9c176]/20 rounded-2xl p-8 md:p-12">
            {/* Format Selection - Required */}
            <div className="mb-10">
              <p className="text-sm font-semibold text-[#e9c176] uppercase tracking-widest mb-4">Select Format *</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormat('hardcopy')}
                  className={`p-2 rounded-lg border-2 transition cursor-pointer ${
                    format === 'hardcopy'
                      ? 'border-[#e9c176] bg-[#e9c176]/10'
                      : 'border-[#424844] bg-[#111413] hover:border-[#e9c176]/40'
                  }`}
                >
                  <BookOpen className="w-10 h-10 mx-auto mb-2 text-[#e9c176]" />
                  <p className={`font-semibold ${format === 'hardcopy' ? 'text-[#e9c176]' : 'text-white'}`}>Hardcopy</p>
                  <p className="text-2xl font-bold text-white mt-1">₦10,000</p>
                  <p className="text-sm text-[#c2c8c2] mt-1">per copy</p>
                </button>
                <button
                  onClick={() => setFormat('softcopy')}
                  className={`p-2 rounded-lg border-2 transition cursor-pointer ${
                    format === 'softcopy'
                      ? 'border-[#e9c176] bg-[#e9c176]/10'
                      : 'border-[#424844] bg-[#111413] hover:border-[#e9c176]/40'
                  }`}
                >
                  <Download className="w-10 h-10 mx-auto mb-2 text-[#e9c176]" />
                  <p className={`font-semibold ${format === 'softcopy' ? 'text-[#e9c176]' : 'text-white'}`}>Softcopy</p>
                  <p className="text-2xl font-bold text-white mt-1">₦7,500</p>
                  <p className="text-sm text-[#c2c8c2] mt-1">per copy</p>
                </button>
              </div>
            </div>

            {/* Functional Quantity Selector with Price */}
            <div className="mb-10">
              <p className="text-sm font-semibold text-[#e9c176] uppercase tracking-widest mb-4">Quantity</p>
              <div className="flex items-center justify-center gap-6">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg border-2 border-[#e9c176] text-[#e9c176] flex items-center justify-center hover:bg-[#e9c176]/10 transition text-2xl font-bold cursor-pointer"
                >
                  −
                </button>
                <div className="text-center">
                  <span className="text-5xl font-bold text-white">{quantity}</span>
                  <p className="text-sm text-[#c2c8c2] mt-1">copies</p>
                </div>
                <button 
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  className="w-12 h-12 rounded-lg border-2 border-[#e9c176] text-[#e9c176] flex items-center justify-center hover:bg-[#e9c176]/10 transition text-2xl font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Display */}
            {format && (
              <div className="border-t border-[#424844] pt-6 mb-10 animate-fade-in">
                <p className="text-lg text-[#c2c8c2] mb-2">Total</p>
                <p className="text-4xl font-bold text-[#e9c176]">
                  ₦{totalNaira.toLocaleString()}
                </p>
                <p className="text-sm text-[#c2c8c2] mt-1">
                  ₦{pricePerCopy.toLocaleString()} × {quantity} copy{quantity > 1 ? 'ies' : 'y'}
                  {format === 'hardcopy' ? ' (Hardcopy)' : ' (Softcopy)'}
                </p>
              </div>
            )}

            {!format && (
              <div className="border-t border-[#424844] pt-6 mb-10">
                <p className="text-[#c2c8c2] text-lg">Select a format above to see your total</p>
              </div>
            )}

            {format ? (
              <Link
                href={`/checkout?format=${format}&quantity=${quantity}`}
                onClick={handleCheckout}
              >
                <button className="w-full bg-[#98da27] text-[#0a1410] font-bold py-5 px-10 rounded-lg hover:bg-[#b2f746] transition duration-300 text-lg cursor-pointer">
                  Checkout Now →
                </button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  toast({
                    title: 'Select a format',
                    description: 'Please choose Hardcopy or Softcopy before checking out.',
                    variant: 'destructive',
                  })
                }}
                className="w-full bg-[#98da27] text-[#0a1410] font-bold py-5 px-10 rounded-lg hover:bg-[#b2f746] transition duration-300 text-lg cursor-pointer"
              >
                Checkout Now →
              </button>
            )}

            {/* Contact - WhatsApp */}
            <div className="mt-8 p-6 bg-[#111413] border border-[#424844] rounded-lg">
              <p className="text-sm text-[#c2c8c2] mb-2">Order directly on WhatsApp:</p>
              <a
                href={`https://wa.me/2348037006559?text=${encodeURIComponent("Hi Dr. Daniel Ochi! I visited The University of the Streets website and I'm interested in ordering the book. I have a few questions before I purchase. Please could you get back to me?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-[#e9c176] hover:text-[#98da27] transition inline-flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884-1.804 0-3.521-.489-5.012-1.383l-.008.005z"/>
                </svg>
                0803 700 6559
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final Word */}
      <section className="bg-linear-to-br from-[#0f2415] to-[#111413] py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Final Word
          </h2>
          <p className="text-lg md:text-xl text-[#c2c8c2] mb-8 leading-relaxed max-w-3xl mx-auto">
            Your business will either <span className="text-[#98da27] font-semibold">grow, evolve, and outlive you</span>… or struggle, stagnate, and eventually disappear.
          </p>
          <p className="text-xl md:text-2xl text-[#e9c176] font-semibold mb-4">
            The difference?
          </p>
          <p className="text-lg md:text-xl text-white mb-12">
            The knowledge and decisions you make <span className="text-[#98da27] font-bold">TODAY</span>.
          </p>
          <div className="border-t-2 border-[#e9c176]/30 pt-8 max-w-lg mx-auto">
            <p className="text-lg text-[#c2c8c2] italic">
              Don't just run a business.<br />
              Build a <span className="text-[#e9c176] font-bold">SYSTEM</span>.<br />
              Build a <span className="text-[#e9c176] font-bold">LEGACY</span>.
            </p>
          </div>
          <div className="mt-10">
          <a href="#pricing" onClick={handleScrollToPricing}>
            <button className="bg-[#98da27] text-[#0a1410] font-bold py-5 px-12 rounded-lg hover:bg-[#b2f746] transition duration-300 text-lg cursor-pointer">
              Get Your Copy of The University of the Streets NOW
            </button>
          </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
