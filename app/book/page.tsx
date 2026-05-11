'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function BookCover() {
  return (
    <div className="min-h-screen bg-[#111413] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-[#e9c176] text-sm font-semibold uppercase tracking-wide mb-12 inline-flex items-center gap-2 hover:text-[#b2f746] transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Book Cover Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-linear-to-br from-[#98da27]/30 to-[#e9c176]/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-linear-to-br from-[#0a2415] to-[#1a3a2e] rounded-2xl overflow-hidden border-2 border-[#e9c176]/30 shadow-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the%20image-5dS7XNxxCIJVUWKpywYWebCeZaZb0q.png"
                  alt="The University of the Streets Book Cover"
                  width={400}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div>
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#98da27] uppercase tracking-widest mb-2">NEW PUBLICATION</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                The University of the Streets
              </h1>
              <p className="text-lg font-semibold text-[#e9c176] mb-4">AI, SMEs & The Future of Nigerian Business</p>
            </div>

            <div className="prose prose-invert mb-8 space-y-4">
              <p className="text-base md:text-lg text-[#c2c8c2] leading-relaxed">
                This groundbreaking book bridges the gap between traditional Nigerian enterprise and cutting-edge artificial intelligence. Dr. Daniel Ochi distills over 20 years of real-world market experience into actionable strategies for small and medium scale businesses.
              </p>
              <p className="text-base md:text-lg text-[#c2c8c2] leading-relaxed">
                Learn how to harness AI while maintaining the authentic, human-centered values that made street commerce legendary. This is not a theoretical exercise—it&apos;s a practical blueprint for survival, sustainability, and multi-generational success.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4 mb-12">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#98da27] text-[#0a1410]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">20+ Years of Market Experience</p>
                  <p className="text-xs text-[#c2c8c2]">Proven strategies from the ground level</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#98da27] text-[#0a1410]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">AI-Ready Frameworks</p>
                  <p className="text-xs text-[#c2c8c2]">Modern technology meets traditional wisdom</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#98da27] text-[#0a1410]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Multi-Generational Success</p>
                  <p className="text-xs text-[#c2c8c2]">Strategies for sustainable growth</p>
                </div>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="space-y-3">
              <Link href="/checkout">
                <button className="w-full bg-[#98da27] text-[#0a1410] font-semibold py-4 rounded-lg hover:bg-[#b2f746] transition duration-300 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  USD 24.99 - Digital Edition
                </button>
              </Link>
              <button className="w-full border-2 border-[#e9c176] text-[#e9c176] font-semibold py-4 rounded-lg hover:bg-[#e9c176]/10 transition duration-300">
                Coming Soon - Physical Edition
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-[#424844]">
              <p className="text-xs text-[#8c928d] mb-2">By Dr. Daniel Ochi</p>
              <p className="text-xs text-[#8c928d]">© 2024 The University of the Streets Legacy | All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
