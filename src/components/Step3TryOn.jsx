import { useState, useRef } from 'react'

const IconUpload = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
)

const IconShirt = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
  </svg>
)

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function Step3TryOn({ selfieFile, onNext }) {
  const [outfitPreview, setOutfitPreview] = useState(null)
  const [outfitFile, setOutfitFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [verdict, setVerdict] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  const handleFile = (f) => {
    if (!f || !f.type.startsWith('image/')) return
    setOutfitFile(f)
    setOutfitPreview(URL.createObjectURL(f))
    setVerdict(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const runVerdict = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVerdict({
        score: 95,
        label: 'Excellent match',
        description: 'This warm rust complements your golden undertone beautifully. The depth works well with your medium skin tone.',
        tags: ['Warm tone harmony', 'Undertone match', 'Depth balance'],
      })
    }, 2000)
  }

  const clearOutfit = () => {
    setOutfitFile(null)
    setOutfitPreview(null)
    setVerdict(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="fade-in-up delay-100">

      {/* Heading */}
      <div className="mb-10">
        <span className="text-xs text-yellow-600 font-semibold uppercase tracking-widest block mb-3">Step 3 of 3</span>
        <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl font-bold text-stone-900 mb-3">
          Try on your outfit
        </h1>
        <p className="text-stone-400 text-base leading-relaxed max-w-md">
          Upload a screenshot of the outfit you want to try. We will render it on your photo and score the color match.
        </p>
      </div>

      {/* Upload zone */}
      {!outfitPreview ? (
        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors py-20 px-8
            ${dragging ? 'border-yellow-400 bg-yellow-50' : 'border-stone-200 hover:border-yellow-300 hover:bg-stone-50'}
          `}
        >
          <div className={`mb-4 transition-colors ${dragging ? 'text-yellow-500' : 'text-stone-300'}`}>
            <IconShirt />
          </div>
          <p className="text-sm font-semibold text-stone-700 mb-1">Drop your outfit screenshot here</p>
          <p className="text-xs text-stone-400 mb-6">or click to browse your files</p>
          <div className="flex items-center gap-2 text-xs font-medium text-yellow-600 border border-yellow-200 px-4 py-2 rounded-full">
            <IconUpload />
            Choose outfit photo
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Outfit preview */}
          <div className="rounded-2xl overflow-hidden border border-stone-100 relative">
            <img src={outfitPreview} alt="Outfit preview" className="w-full object-cover max-h-72" />
            <button
              onClick={clearOutfit}
              className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center border border-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
            >
              <IconX />
            </button>
            <div className="absolute bottom-3 left-3 bg-white/90 rounded-lg px-3 py-1.5 border border-stone-100">
              <p className="text-xs text-stone-500 font-medium">Outfit</p>
            </div>
          </div>

          {/* Selfie preview */}
          {selfieFile && (
            <div className="rounded-2xl overflow-hidden border border-stone-100 relative">
              <img
                src={URL.createObjectURL(selfieFile)}
                alt="Your selfie"
                className="w-full object-cover max-h-72"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 rounded-lg px-3 py-1.5 border border-stone-100">
                <p className="text-xs text-stone-500 font-medium">Your photo</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Get verdict button */}
      {outfitPreview && !verdict && (
        <button
          onClick={runVerdict}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-semibold tracking-wide px-8 py-4 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-colors disabled:opacity-50 mb-8"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Running color analysis...
            </>
          ) : (
            <>Get my verdict</>
          )}
        </button>
      )}

      {/* Verdict card */}
      {verdict && (
        <div className="fade-in-up bg-stone-50 border border-stone-100 rounded-2xl p-8 mt-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-1">Color verdict</p>
              <p style={{ fontFamily: 'Playfair Display, serif' }} className="text-2xl font-bold text-stone-900">
                {verdict.label}
              </p>
            </div>
            <div className="text-right">
              <p style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl font-bold text-yellow-600">
                {verdict.score}%
              </p>
              <p className="text-xs text-stone-400 font-medium">match score</p>
            </div>
          </div>

          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-yellow-500 rounded-full transition-all duration-1000"
              style={{ width: `${verdict.score}%` }}
            />
          </div>

          <p className="text-sm text-stone-500 leading-relaxed mb-6">{verdict.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {verdict.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-1.5 bg-white border border-stone-100 rounded-full px-3 py-1.5">
                <span className="text-yellow-600"><IconCheck /></span>
                <span className="text-xs font-medium text-stone-700">{tag}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNext(outfitFile)}
              className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide px-8 py-4 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-colors"
            >
              Save my results
            </button>
            <button
              onClick={clearOutfit}
              className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide px-8 py-4 rounded-lg border border-stone-200 text-stone-600 hover:border-stone-400 transition-colors"
            >
              Try another outfit
            </button>
          </div>
        </div>
      )}

    </div>
  )
}