import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { MediaDetailPage } from './pages/MediaDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <div className="min-h-screen bg-space-black">
      <div className="cosmic-gradient min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/media/:nasaId" element={<MediaDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
