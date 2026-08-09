import { useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import Step1Upload from '../components/Step1Upload'
import Step2SkinAnalysis from '../components/Step2SkinAnalysis'
import Step3TryOn from '../components/Step3TryOn'

export default function AppPage({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selfieFile, setSelfieFile] = useState(null)
  const [outfitFile, setOutfitFile] = useState(null)
  const [skinProfile, setSkinProfile] = useState(null)

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <ProgressBar
        currentStep={currentStep}
        onBack={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)}
      />

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">

          {currentStep === 1 && (
            <Step1Upload
              onNext={(file) => {
                setSelfieFile(file)
                setCurrentStep(2)
              }}
            />
          )}

          {currentStep === 2 && (
            <Step2SkinAnalysis
              selfieFile={selfieFile}
              onNext={(profile) => {
                setSkinProfile(profile)
                setCurrentStep(3)
              }}
            />
          )}

          {currentStep === 3 && (
            <Step3TryOn
              selfieFile={selfieFile}
              skinProfile={skinProfile}
              onNext={(data) => {
                setOutfitFile(data?.outfitFile || null)
                setCurrentStep(4)
              }}
            />
          )}

          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-3xl font-bold text-stone-900 mb-3">
                Your verdict is ready
              </h2>
              <p className="text-stone-400 text-base max-w-sm mb-10 leading-relaxed">
                Results page coming soon. For now your analysis is complete.
              </p>
              <button
                onClick={onBack}
                className="text-sm font-semibold tracking-wide px-8 py-4 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-colors"
              >
                Back to home
              </button>
            </div>
          )}

        </div>
      </main>

    </div>
  )
}