import { useState } from 'react'
import LandingPage from './pages/LandingPage'

export default function App() {
  const [page, setPage] = useState('landing')

  return (
    <>
      {page === 'landing' && (
        <LandingPage onGetStarted={() => setPage('app')} />
      )}
      {page === 'app' && (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <h1 className="text-2xl font-bold text-gold">App Flow Coming Next...</h1>
        </div>
      )}
    </>
  )
}