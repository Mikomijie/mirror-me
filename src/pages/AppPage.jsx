import { useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import Step1Upload from '../components/Step1Upload'
import Step2SkinAnalysis from '../components/Step2SkinAnalysis'
import Step3TryOn from '../components/Step3TryOn'

export default function AppPage({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selfieFile, setSelfieFile] = useState(null)
  const [outfitFile, setOutfitFile] = useState(null)

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
              onNext={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <Step3TryOn
              selfieFile={selfieFile}
              onNext={(file) => {
                setOutfitFile(file)
              }}
            />
          )}

        </div>
      </main>

    </div>
  )
}