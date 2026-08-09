import { useState, useRef } from 'react'

const IconUpload = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
)

const IconImage = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
)

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const tips = [
  { label: 'Stand back so shoulders and face are both visible' },
  { label: 'Face forward, standing upright — no sitting or crouching' },
  { label: 'Natural light, no flash, no filters' },
  { label: 'Single person only, clear background preferred' },
]

export default function Step1Upload({ onNext }) {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFile = (f) => {
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="fade-in-up delay-100">

      {/* Heading */}
      <div className="mb-10">
        <span className="text-xs text-yellow-600 font-semibold uppercase tracking-widest block mb-3">
          Step 1 of 3
        </span>
        <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl font-bold text-stone-900 mb-3">
          Upload your photo
        </h1>
        <p className="text-stone-400 text-base leading-relaxed max-w-md">
          We need a clear upper-body photo — shoulders to head — so our AI can analyze your skin and try on outfits accurately.
        </p>
      </div>

      {/* Upload zone */}
      {!preview ? (
        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors py-20 px-8
            ${dragging
              ? 'border-yellow-400 bg-yellow-50'
              : 'border-stone-200 hover:border-yellow-300 hover:bg-stone-50'
            }
          `}
        >
          <div className={`mb-4 transition-colors ${dragging ? 'text-yellow-500' : 'text-stone-300'}`}>
            <IconImage />
          </div>
          <p className="text-sm font-semibold text-stone-700 mb-1">Drop your photo here</p>
          <p className="text-xs text-stone-400 mb-6">or click to browse — jpg or png, under 10MB</p>
          <div className="flex items-center gap-2 text-xs font-medium text-yellow-600 border border-yellow-200 px-4 py-2 rounded-full">
            <IconUpload />
            Choose photo
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="w-full rounded-2xl overflow-hidden border border-stone-100 relative">
          <img
            src={preview}
            alt="Your photo preview"
            className="w-full object-cover max-h-96"
          />
          <button
            onClick={clearFile}
            className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <IconX />
          </button>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs text-stone-500 font-medium">{file?.name}</p>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 bg-stone-50 border border-stone-100 rounded-2xl p-6">
        <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-4">
          Photo requirements
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tips.map((t) => (
            <div key={t.label} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center shrink-0 mt-0.5 text-yellow-600">
                <IconCheck />
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">{t.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10">
        <button
          onClick={() => preview && onNext(file)}
          disabled={!preview}
          className={`flex items-center gap-2 text-sm font-semibold tracking-wide px-8 py-4 rounded-lg transition-colors
            ${preview
              ? 'bg-stone-900 text-white hover:bg-stone-700 cursor-pointer'
              : 'bg-stone-100 text-stone-300 cursor-not-allowed'
            }
          `}
        >
          Analyze my skin
          <IconArrow />
        </button>
        {!preview && (
          <p className="text-xs text-stone-400 mt-3">Upload a photo to continue</p>
        )}
      </div>

    </div>
  )
}