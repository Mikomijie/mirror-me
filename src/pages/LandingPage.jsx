import { useEffect, useRef } from 'react'
import Button from '../components/Button'
import FeatureCard from '../components/FeatureCard'

const features = [
  {
    icon: 'photo_camera',
    title: 'Upload Your Selfie',
    description:
      'Take a clear photo in good lighting. Our AI reads your skin tone, undertone, and more in seconds.',
    delay: 200,
  },
  {
    icon: 'auto_awesome',
    title: 'Get Your Skin Profile',
    description:
      'Discover your exact undertone and the colors that enhance your natural beauty.',
    delay: 300,
  },
  {
    icon: 'checkroom',
    title: 'See It On You',
    description:
      'Upload any outfit and see exactly how it looks on YOUR body — before you buy.',
    delay: 400,
  },
]

export default function LandingPage({ onGetStarted }) {
  const featuresRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
            entry.target.style.transition =
              'opacity 0.8s ease-out, transform 0.8s ease-out'
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = document.querySelectorAll('.feature-card')
    cards.forEach((card) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white font-poppins">

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-cream px-6 md:px-16 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-dark-gray tracking-tight">
          Verdict<span className="text-gold">Style</span>
        </span>
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#how" className="text-sm text-light-gray hover:text-gold transition-colors duration-200 uppercase tracking-widest font-semibold">
            How It Works
          </a>
          <a href="#features" className="text-sm text-light-gray hover:text-gold transition-colors duration-200 uppercase tracking-widest font-semibold">
            Features
          </a>
        </nav>
        <Button onClick={onGetStarted} className="hidden md:flex text-xs py-3 px-6">
          Try Now
        </Button>
      </header>

      {/* ── HERO ── */}
      <main className="flex-grow">
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 pt-24 pb-16 relative overflow-hidden">

          {/* Background ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>

          {/* Icon trio above headline */}
          <div className="fade-in-up delay-100 flex items-center justify-center gap-6 mb-10 relative z-10">
            <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center float-icon" style={{ animationDelay: '0s' }}>
              <span className="material-symbols-outlined text-gold" style={{ fontSize: '32px' }}>
                photo_camera
              </span>
            </div>
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center float-icon" style={{ animationDelay: '0.4s', boxShadow: '0 12px 32px rgba(212,175,55,0.4)' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '40px' }}>
                auto_awesome
              </span>
            </div>
            <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center float-icon" style={{ animationDelay: '0.8s' }}>
              <span className="material-symbols-outlined text-gold" style={{ fontSize: '32px' }}>
                checkroom
              </span>
            </div>
          </div>

          {/* Badge */}
          <div className="fade-in-up delay-100 mb-6 relative z-10">
            <span className="inline-flex items-center gap-2 bg-cream text-gold text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-gold border-opacity-30">
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              AI-Powered Style Verdict
            </span>
          </div>

          {/* Headline */}
          <h1 className="fade-in-up delay-200 text-4xl md:text-6xl font-bold text-dark-gray leading-tight tracking-tight max-w-3xl relative z-10 mb-6">
            Know What Works{' '}
            <span className="text-gold">Before You Buy</span>
          </h1>

          {/* Subheader */}
          <p className="fade-in-up delay-300 text-base md:text-lg text-light-gray leading-relaxed max-w-xl relative z-10 mb-10">
            Upload your selfie. Our AI reads your skin tone and undertone, then shows you exactly how any outfit looks on YOU — not a model.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up delay-400 flex flex-col sm:flex-row gap-4 items-center relative z-10 mb-16">
            <Button onClick={onGetStarted}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                arrow_forward
              </span>
              Get Your Style Verdict
            </Button>
            <button
              onClick={() => document.getElementById('how').scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-light-gray hover:text-gold transition-colors duration-200 underline underline-offset-4 uppercase tracking-widest font-semibold"
            >
              See How It Works
            </button>
          </div>

          {/* Trust badges */}
          <div className="fade-in-up delay-500 flex flex-wrap justify-center gap-6 relative z-10">
            {[
              { icon: 'lock', text: 'Photos never stored' },
              { icon: 'bolt', text: 'Results in seconds' },
              { icon: 'devices', text: 'Works on any device' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-xs text-light-gray font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-gold" style={{ fontSize: '16px' }}>
                  {badge.icon}
                </span>
                {badge.text}
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="py-24 px-6 md:px-16 bg-cream">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-xs text-gold font-bold uppercase tracking-widest mb-4 block">
              The Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
              Three steps to confidence
            </h2>
            <p className="text-light-gray text-base leading-relaxed max-w-lg mx-auto">
              From selfie to style verdict in under 60 seconds.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-0">
            {[
              {
                step: '01',
                icon: 'photo_camera',
                title: 'Upload Selfie',
                desc: 'Clear photo, good lighting. That\'s it.',
              },
              {
                step: '02',
                icon: 'biotech',
                title: 'AI Skin Analysis',
                desc: 'We detect your undertone, skin type, and tones.',
              },
              {
                step: '03',
                icon: 'checkroom',
                title: 'Try On + Verdict',
                desc: 'See the outfit on you and get a color match score.',
              },
            ].map((item, i) => (
              <div key={item.step} className="flex-1 flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-gold" style={{ fontSize: '28px' }}>
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-5xl font-bold text-cream" style={{ WebkitTextStroke: '2px #D4AF37', lineHeight: 1 }}>
                    {item.step}
                  </span>
                  <h3 className="font-bold text-dark-gray mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-light-gray leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex items-center text-gold opacity-40">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                      arrow_forward
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-24 px-6 md:px-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs text-gold font-bold uppercase tracking-widest mb-4 block">
                What You Get
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
                Everything you need to shop smarter
              </h2>
              <p className="text-light-gray text-base leading-relaxed max-w-lg mx-auto">
                No more guessing. No more returns. Just confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-24 px-6 md:px-16 bg-dark-gray text-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center mx-auto mb-8 float-icon" style={{ boxShadow: '0 16px 40px rgba(212,175,55,0.4)' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '40px' }}>
                auto_awesome
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to find your{' '}
              <span className="text-gold">perfect match?</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-md mx-auto">
              Join thousands of women who shop with confidence using VerdictStyle.
            </p>
            <Button onClick={onGetStarted} className="mx-auto">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                arrow_forward
              </span>
              Get Started — It's Free
            </Button>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-cream px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-lg font-bold text-dark-gray">
          Verdict<span className="text-gold">Style</span>
        </span>
        <p className="text-xs text-light-gray uppercase tracking-widest">
          © 2026 VerdictStyle. Powered by YouCam API.
        </p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Contact'].map((link) => (
            <a key={link} href="#" className="text-xs text-light-gray hover:text-gold transition-colors duration-200 uppercase tracking-wider font-semibold">
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}