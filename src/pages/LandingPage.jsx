import { useEffect, useRef } from 'react'

const IconCamera = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
)

const IconSparkle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
)

const IconShirt = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
  </svg>
)

const IconLock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const IconBolt = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const IconDevices = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12" y2="18.01"/>
  </svg>
)

const IconMicroscope = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/>
    <path d="M9 14a5 5 0 1 0 0-10h-1"/><path d="M9 6h1"/>
  </svg>
)

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const features = [
  {
    Icon: IconCamera,
    title: 'Upload your selfie',
    description: 'Clear photo, natural light. Our AI reads skin tone, undertone, and depth in seconds — no filters needed.',
  },
  {
    Icon: IconSparkle,
    title: 'Get your skin profile',
    description: 'Warm, cool, or neutral — with your exact undertone mapped to a curated palette of colors that work for you.',
  },
  {
    Icon: IconShirt,
    title: 'See it on you',
    description: 'Upload any outfit screenshot. Our virtual try-on renders it on your photo and scores the color match.',
  },
]

const steps = [
  { number: '01', Icon: IconCamera, title: 'Upload selfie', desc: 'Clear photo in good lighting.' },
  { number: '02', Icon: IconMicroscope, title: 'Skin analysis', desc: 'Undertone, depth, and tone detected.' },
  { number: '03', Icon: IconShirt, title: 'Try on + verdict', desc: 'Color match score on your actual photo.' },
]

export default function LandingPage({ onGetStarted }) {
  const featuresRef = useRef(null)

  useEffect(() => {
    if (!featuresRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    const cards = featuresRef.current.querySelectorAll('.feature-card')
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100 px-6 md:px-16 py-4 flex justify-between items-center">
        <span style={{ fontFamily: 'Playfair Display, serif' }} className="text-xl font-bold text-stone-900 tracking-tight">
          Verdict<span className="text-yellow-600">Style</span>
        </span>
        <nav className="hidden md:flex gap-10 items-center">
          <a href="#how" className="text-xs text-stone-400 hover:text-stone-800 transition-colors font-medium tracking-widest uppercase">
            How it works
          </a>
          <a href="#features" className="text-xs text-stone-400 hover:text-stone-800 transition-colors font-medium tracking-widest uppercase">
            Features
          </a>
        </nav>
        <button
          onClick={onGetStarted}
          className="text-xs font-semibold tracking-widest uppercase text-white bg-yellow-600 hover:bg-yellow-700 transition-colors px-5 py-2.5 rounded-lg"
        >
          Try now
        </button>
      </header>

      <main className="flex-grow">

        {/* HERO */}
        <section className="min-h-screen flex items-center px-6 md:px-16 pt-24 pb-16">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="flex flex-col items-start">

              {/* Decorative italic word */}
              <div
                style={{ fontFamily: 'Playfair Display, serif', fontSize: '7rem', lineHeight: 1, color: '#f5f0e8', fontStyle: 'italic', userSelect: 'none', marginBottom: '-2rem', marginLeft: '-4px' }}
                className="font-bold hidden md:block"
                aria-hidden="true"
              >
                Style
              </div>

              <span className="fade-in-up delay-100 text-xs font-semibold tracking-widest uppercase text-yellow-600 mb-5 border border-yellow-200 px-4 py-2 rounded-full">
                AI-powered color analysis
              </span>

              <h1
                style={{ fontFamily: 'Playfair Display, serif' }}
                className="fade-in-up delay-200 text-5xl md:text-6xl font-bold text-stone-900 leading-tight mb-6"
              >
                Know what works<br />
                <span className="gold-underline text-yellow-600 italic">before you buy.</span>
              </h1>

              <p className="fade-in-up delay-300 text-base text-stone-400 leading-relaxed max-w-md mb-10">
                Upload a selfie. VerdictStyle reads your skin tone and undertone, then shows you exactly how any outfit color looks on you — not a model.
              </p>

              <div className="fade-in-up delay-400 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
                <button
                  onClick={onGetStarted}
                  className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white bg-stone-900 hover:bg-stone-700 transition-colors px-8 py-4 rounded-lg"
                >
                  Get your verdict
                  <IconArrow />
                </button>
                <button
                  onClick={() => document.getElementById('how').scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm font-medium text-stone-400 hover:text-yellow-600 transition-colors underline underline-offset-4"
                >
                  See how it works
                </button>
              </div>

              {/* Trust strip */}
              <div className="fade-in-up delay-500 flex flex-wrap gap-6 pt-6 border-t border-stone-100 w-full">
                {[
                  { Icon: IconLock, label: 'Photos never stored' },
                  { Icon: IconBolt, label: 'Results in seconds' },
                  { Icon: IconDevices, label: 'Any device' },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-yellow-600"><Icon /></span>
                    <span className="text-xs text-stone-400 font-medium tracking-wide">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — mock card */}
            <div className="fade-in-up delay-300 flex justify-center md:justify-end">
              <div className="relative w-full max-w-xs">

                {/* Floating tag */}
                <div
                  className="float-slow absolute -top-5 -right-4 bg-white border border-stone-100 rounded-xl px-4 py-3 z-10"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', animationDelay: '1s' }}
                >
                  <p className="text-xs font-semibold text-stone-800">No returns.</p>
                  <p className="text-xs text-stone-400">Shop with confidence.</p>
                </div>

                {/* Main card */}
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">

                  {/* Profile row */}
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-stone-100">
                    <div className="w-10 h-10 rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center text-yellow-600 float-slow">
                      <IconCamera />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-widest font-medium">Skin profile</p>
                      <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>Warm Medium</p>
                    </div>
                  </div>

                  {/* Data rows */}
                  <div className="space-y-3 mb-6">
                    {[
                      { label: 'Undertone', value: 'Golden' },
                      { label: 'Depth', value: 'Medium' },
                      { label: 'Best neutrals', value: 'Camel, Ivory, Rust' },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center pb-3 border-b border-stone-100">
                        <span className="text-xs text-stone-400 uppercase tracking-wider">{row.label}</span>
                        <span className="text-xs font-semibold text-stone-800">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Score */}
                  <div className="bg-white rounded-xl p-4 border border-stone-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-stone-400 uppercase tracking-wider">Color match</span>
                      <span className="text-xl font-bold text-yellow-600" style={{ fontFamily: 'Playfair Display, serif' }}>95%</span>
                    </div>
                    <div className="h-1 bg-stone-100 rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '95%' }} />
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      This warm rust complements your golden undertone.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-24 px-6 md:px-16 bg-stone-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <span className="text-xs text-yellow-600 font-semibold uppercase tracking-widest block mb-4">The process</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl font-bold text-stone-900 mb-4">
                Three steps to confidence
              </h2>
              <p className="text-stone-400 text-base max-w-sm">From selfie to style verdict in under 60 seconds.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {steps.map(({ number, Icon, title, desc }, i) => (
                <div key={number} className="flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <span
                      style={{ fontFamily: 'Playfair Display, serif', WebkitTextStroke: '1.5px #ca8a04', color: 'transparent', fontSize: '3rem', lineHeight: 1 }}
                      className="font-bold"
                    >
                      {number}
                    </span>
                    {i < 2 && (
                      <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-yellow-200 to-transparent" />
                    )}
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center mb-4 text-yellow-600">
                    <Icon />
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2 text-sm tracking-wide uppercase">{title}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" ref={featuresRef} className="py-24 px-6 md:px-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <span className="text-xs text-yellow-600 font-semibold uppercase tracking-widest block mb-4">What you get</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl font-bold text-stone-900 mb-4">
                Everything you need to shop smarter
              </h2>
              <p className="text-stone-400 text-base max-w-sm">No guessing. No returns. Just confidence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="feature-card opacity-0 translate-y-4 transition-all duration-500 border border-stone-100 rounded-2xl p-8 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-lg bg-yellow-50 border border-yellow-100 flex items-center justify-center mb-6 text-yellow-600">
                    <Icon />
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-3 text-sm tracking-wide uppercase">{title}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-6 md:px-16 bg-stone-900">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
            <div>
              <p className="text-xs text-yellow-500 font-semibold uppercase tracking-widest mb-4">Start today</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl font-bold text-white mb-4 leading-tight">
                Ready to find your<br />
                <span className="text-yellow-500 italic">perfect match?</span>
              </h2>
              <p className="text-stone-400 text-base max-w-sm leading-relaxed">
                Thousands of women shop with confidence knowing before they buy.
              </p>
            </div>
            <button
              onClick={onGetStarted}
              className="shrink-0 flex items-center gap-2 text-sm font-semibold tracking-wide text-stone-900 bg-yellow-500 hover:bg-yellow-400 transition-colors px-10 py-5 rounded-lg"
            >
              Get started — it's free
              <IconArrow />
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-stone-100 px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span style={{ fontFamily: 'Playfair Display, serif' }} className="text-lg font-bold text-stone-900">
          Verdict<span className="text-yellow-600">Style</span>
        </span>
        <p className="text-xs text-stone-400 uppercase tracking-widest">
          2026 VerdictStyle. Powered by YouCam API.
        </p>
        <div className="flex gap-8">
          {['Privacy', 'Terms', 'Contact'].map((link) => (
            <a key={link} href="#" className="text-xs text-stone-400 hover:text-stone-800 transition-colors uppercase tracking-wider font-medium">
              {link}
            </a>
          ))}
        </div>
      </footer>

    </div>
  )
}