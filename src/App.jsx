import { useState } from 'react'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import ProviderPage from './pages/ProviderPage'
import AIReaderPage from './pages/AIReaderPage'
import Navbar from './components/Navbar'
import SOSButton from './components/SOSButton'

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = (target, data = null) => {
    if (target === 'provider' && data) setSelectedProvider(data)
    setPage(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar page={page} navigate={navigate} />

      <main style={{ flex: 1, paddingTop: '72px' }}>
        {page === 'home' && (
          <HomePage
            navigate={navigate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {page === 'results' && (
          <ResultsPage
            navigate={navigate}
            searchQuery={searchQuery}
          />
        )}
        {page === 'provider' && (
          <ProviderPage
            provider={selectedProvider}
            navigate={navigate}
          />
        )}
        {page === 'ai-reader' && (
          <AIReaderPage navigate={navigate} />
        )}
      </main>

      {page !== 'ai-reader' && <SOSButton />}
    </div>
  )
}
