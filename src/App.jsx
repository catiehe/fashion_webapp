import { Routes, Route } from 'react-router-dom'
import Discovery from './pages/Discovery'
import StoreDetail from './pages/StoreDetail'
import StyleMap from './pages/StyleMap'
import VintageGuide from './pages/VintageGuide'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Discovery />} />
      <Route path="/map" element={<StyleMap />} />
      <Route path="/boutiques/the-archive" element={<StoreDetail />} />
      <Route path="/vintage" element={<VintageGuide />} />
    </Routes>
  )
}
