export default function FeatureCard({ icon, title, description, delay }) {
  return (
    <div
      className={`feature-card fade-in-up delay-${delay} bg-white border-2 border-cream rounded-xl p-8 flex flex-col items-center text-center`}
      style={{ boxShadow: '0 10px 40px rgba(26,26,26,0.05)' }}
    >
      <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-6 float-icon">
        <span
          className="material-symbols-outlined text-gold"
          style={{ fontSize: '40px', fontVariationSettings: "'FILL' 0" }}
        >
          {icon}
        </span>
      </div>
      <h3 className="font-bold text-lg text-dark-gray mb-3">{title}</h3>
      <p className="text-light-gray text-sm leading-relaxed">{description}</p>
    </div>
  )
}