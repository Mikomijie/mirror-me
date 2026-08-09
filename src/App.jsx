import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import AppPage from './pages/AppPage'

export default function App() {
  const [page, setPage] = useState('landing')

  return (
    <>
      {page === 'landing' && (
        <LandingPage onGetStarted={() => setPage('app')} />
      )}
      {page === 'app' && (
        <AppPage onBack={() => setPage('landing')} />
      )}
    </>
  )
}