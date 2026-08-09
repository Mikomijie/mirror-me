export default function Button({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  className = '',
}) {
  const base =
    'font-semibold text-sm uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 py-4 px-8'

  const variants = {
    primary:
      'bg-gold text-white hover:bg-gold-dark shadow-md pulse-gold',
    secondary:
      'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white',
    ghost:
      'text-light-gray underline-offset-4 hover:underline hover:text-dark-gray',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}