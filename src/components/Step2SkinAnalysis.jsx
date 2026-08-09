import { useState, useEffect } from 'react'

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const mockSkinData = {
  tone: 'Warm Medium',
  undertone: 'Golden',
  depth: 'Medium',
  skinType: 'Combination',
  bestColors: ['Rust', 'Camel', 'Olive', 'Ivory', 'Terracotta'],
  avoidColors: ['Ash Gray', 'Cool Pink', 'Icy Blue'],
  matchScore: 95,
}

const colorDots = {
  Rust: '#8B3A2F',
  Camel: '#C19A6B',
  Olive: '#6B7645',
  Ivory: '#F5F0E1',
  Terracotta: '#C06F4A',
  'Ash Gray': '#B2B2B2',
  'Cool Pink': '#E8A0B4',
  'Icy Blue': '#A8C8E0',
}

export default function Step2SkinAnalysis({ selfieFile, onNext }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 400)
          return 100
        }
        return p + 4
      })
    }, 60)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 fade-in-up">
        <div className="w-16 h-16 rounded-full border-2 border-stone-100 border-t-yellow-500 animate-spin mb-8" />
        <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-2xl font-bold text-stone-900 mb-3">
          Analyzing your skin
        </h2>
        <p className="text-stone-400 text-sm mb-8">Reading undertone, depth, and skin type...</p>
        <div className="w-48 h-1 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-stone-300 mt-3 font-medium">{progress}%</p>
      </div>
    )
  }

  return (
    <div className="fade-in-up delay-100">

      {/* Heading */}
      <div className="mb-10">
        <span className="text-xs text-yellow-600 font-semibold uppercase tracking-widest block mb-3">Step 2 of 3</span>
        <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl font-bold text-stone-900 mb-3">
          Your skin profile
        </h1>
        <p className="text-stone-400 text-base leading-relaxed max-w-md">
          Here is what our AI found. These results will guide your color verdict.
        </p>
      </div>

      {/* Profile cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Skin tone', value: mockSkinData.tone },
          { label: 'Undertone', value: mockSkinData.undertone },
          { label: 'Depth', value: mockSkinData.depth },
          { label: 'Skin type', value: mockSkinData.skinType },
        ].map((card) => (
          <div key={card.label} className="bg-stone-50 border border-stone-100 rounded-xl p-4">
            <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-2">{card.label}</p>
            <p style={{ fontFamily: 'Playfair Display, serif' }} className="text-lg font-bold text-stone-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Best colors */}
      <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 mb-4">
        <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-4">Colors that work for you</p>
        <div className="flex flex-wrap gap-3">
          {mockSkinData.bestColors.map((color) => (
            <div key={color} className="flex items-center gap-2 bg-white border border-stone-100 rounded-full px-3 py-1.5">
              <div
                className="w-3 h-3 rounded-full border border-stone-200 shrink-0"
                style={{ backgroundColor: colorDots[color] }}
              />
              <span className="text-xs font-medium text-stone-700">{color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Avoid colors */}
      <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 mb-10">
        <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-4">Colors to avoid</p>
        <div className="flex flex-wrap gap-3">
          {mockSkinData.avoidColors.map((color) => (
            <div key={color} className="flex items-center gap-2 bg-white border border-stone-100 rounded-full px-3 py-1.5 opacity-60">
              <div
                className="w-3 h-3 rounded-full border border-stone-200 shrink-0"
                style={{ backgroundColor: colorDots[color] }}
              />
              <span className="text-xs font-medium text-stone-500 line-through">{color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        className="flex items-center gap-2 text-sm font-semibold tracking-wide px-8 py-4 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-colors"
      >
        Try on an outfit
        <IconArrow />
      </button>

    </div>
  )
}