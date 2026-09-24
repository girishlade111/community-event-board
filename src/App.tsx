import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import Venues from './pages/Venues'
import About from './pages/About'
import Submit from './pages/Submit'
import CalendarPage from './pages/CalendarPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/venues" element={<Venues />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/submit" element={<Submit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
