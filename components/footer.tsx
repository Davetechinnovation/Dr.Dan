'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0f0e] border-t border-[#424844] py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <p className="text-[#e9c176] font-display text-lg font-semibold mb-2">Dr. Daniel Ochi</p>
          <p className="text-sm text-[#c2c8c2]">The University of the Streets Legacy</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-[#c2c8c2] text-center ">© {currentYear} Dr. Daniel Ochi. A University of the Streets Legacy.</p>
        </div>
      </div>
    </footer>
  )
}
