import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import HomePage from './HomePage'
import GamePage from './GamePage'
import WishesPage from './WishesPage'
import './MainSite.css'

export default function MainSite({ quizScore }) {
  return (
    <HashRouter>
      <div className="main-site">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage quizScore={quizScore} />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/wishes" element={<WishesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
