import { useState, useEffect } from 'react'

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const colorDots = {
  moisture: '#6B9FD4',
  oiliness: '#D4C56B',
  radiance: '#D4AF37',
  acne: '#D47B6B',
  texture: '#A8B5A0',
  pore: '#B8A0C8',
}

const labelMap = {
  moisture: 'Moisture',
  oiliness: 'Oiliness',
  radiance: 'Radiance',
  acne: 'Acne',
  texture: 'Texture',
  pore: 'Pores',
}

function deriveProfile(results) {
  if (!results?.output) return null

  const scores = {}
  results.output.forEach((item) => {
    scores[item.type] = item.ui_score
  })

  const moisture = scores.moisture || 0
  const oiliness = scores.oiliness || 0

  let skinType = 'Normal'
  if (moisture < 50) skinType = 'Dry'
  else if (oiliness > 70) skinType = 'Oily'
  else if (oiliness > 50 && moisture < 65) skinType = 'Combination'

  const radiance = scores.radiance || 0
  let tone = 'Medium'
  if (radiance > 75) tone = 'Light-Medium'
  else if (radiance < 50) tone = 'Deep'

  return {
    scores,
    skinType,
    tone,
    undertone: 'Warm Golden',
    bestColors: ['Rust', 'Camel', 'Olive', 'Ivory', 'Terracotta'],
    avoidColors: ['Ash Gray', 'Cool Pink', 'Icy Blue'],
  }
}

export default function Step2SkinAnalysis({ selfieFile, onNext }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)
  const [rawResults, setRawResults] = useState(null)

  useEffect(() => {
    if (!selfieFile) return

    // Progress bar animation while waiting
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + 2))
    }, 300)

    const formData = new FormData()
    formData.append('selfie', selfieFile)

    fetch('http://localhost:3001/api/skin-analysis', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        clearInterval(interval)
        if (data.success) {
          setProgress(100)
          setRawResults(data.results)
          setProfile(deriveProfile(data.results))
          setTimeout(() => setLoading(false), 500)
        } else {
          setError(data.error || 'Analysis failed')
          setLoading(false)
        }
      })
      .catch((err) => {
        clearInterval(interval)
        setError('Could not reach the server. Is the backend running?')
        setLoading(false)
      })

    return () => clearInterval(interval)
  }, [selfieFile])

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
            className="h-full bg-yellow-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-stone-300 mt-3 font-medium">{progress}%</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 fade-in-up text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-2xl font-bold text-stone-900 mb-3">
          Something went wrong
        </h2>
        <p className="text-stone-400 text-sm max-w-sm mb-8">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-semibold tracking-wide px-6 py-3 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="fade-in-up delay-100">

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
          { label: 'Skin tone', value: profile?.tone },
          { label: 'Undertone', value: profile?.undertone },
          { label: 'Skin type', value: profile?.skinType },
          { label: 'Radiance', value: `${rawResults?.output?.find(i => i.type === 'radiance')?.ui_score ?? '--'}/100` },
        ].map((card) => (
          <div key={card.label} className="bg-stone-50 border border-stone-100 rounded-xl p-4">
            <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-2">{card.label}</p>
            <p style={{ fontFamily: 'Playfair Display, serif' }} className="text-lg font-bold text-stone-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Skin scores */}
      <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 mb-4">
        <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-5">Skin scores</p>
        <div className="space-y-4">
          {rawResults?.output?.filter(item => 
  ['moisture', 'oiliness', 'radiance', 'acne', 'texture', 'pore'].includes(item.type)
).map((item) => (
            <div key={item.type}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-stone-600">{labelMap[item.type] || item.type}</span>
                <span className="text-xs font-semibold text-stone-900">{item.ui_score}/100</span>
              </div>
              <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${item.ui_score}%`,
                    backgroundColor: colorDots[item.type] || '#D4AF37',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best colors */}
      <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 mb-4">
        <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-4">Colors that work for you</p>
        <div className="flex flex-wrap gap-3">
          {profile?.bestColors.map((color) => (
            <div key={color} className="flex items-center gap-2 bg-white border border-stone-100 rounded-full px-3 py-1.5">
              <span className="text-xs font-medium text-stone-700">{color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Avoid colors */}
      <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 mb-10">
        <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-4">Colors to avoid</p>
        <div className="flex flex-wrap gap-3">
          {profile?.avoidColors.map((color) => (
            <div key={color} className="flex items-center gap-2 bg-white border border-stone-100 rounded-full px-3 py-1.5 opacity-50">
              <span className="text-xs font-medium text-stone-500 line-through">{color}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onNext(profile)}
        className="flex items-center gap-2 text-sm font-semibold tracking-wide px-8 py-4 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-colors"
      >
        Try on an outfit
        <IconArrow />
      </button>

    </div>
  )
}