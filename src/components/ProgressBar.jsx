const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
)

const steps = [
  { number: 1, label: 'Skin analysis' },
  { number: 2, label: 'Try on' },
  { number: 3, label: 'Results' },
]

export default function ProgressBar({ currentStep, onBack }) {
  return (
    <div className="w-full border-b border-stone-100 bg-white px-6 md:px-16 py-4">
      <div className="max-w-3xl mx-auto flex items-center gap-6">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs text-stone-400 hover:text-stone-800 transition-colors font-medium tracking-wide uppercase shrink-0"
        >
          <IconArrowLeft />
          Back
        </button>

        <div className="flex-1 flex items-center justify-center gap-3">
          {steps.map((step, i) => {
            const isActive = step.number === currentStep
            const isDone = step.number < currentStep

            return (
              <div key={step.number} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors
                      ${isActive ? 'bg-yellow-600 text-white' : ''}
                      ${isDone ? 'bg-stone-900 text-white' : ''}
                      ${!isActive && !isDone ? 'bg-stone-100 text-stone-400' : ''}
                    `}
                  >
                    {isDone ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : step.number}
                  </div>
                  <span className={`text-xs font-medium tracking-wide hidden sm:block
                    ${isActive ? 'text-stone-900' : 'text-stone-400'}
                  `}>
                    {step.label}
                  </span>
                </div>

                {i < steps.length - 1 && (
                  <div className={`w-8 h-px transition-colors ${isDone ? 'bg-stone-900' : 'bg-stone-200'}`} />
                )}
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}