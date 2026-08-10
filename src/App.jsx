import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import SmoothScroll from './components/layout/SmoothScroll.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import Home from './pages/Home.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  const location = useLocation();

  return (
    <div className="overflow-x-hidden">
      <SmoothScroll />
      <ScrollToTop />
      <ScrollProgress />
      <CursorGlow />
      <Header />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/booking" element={<PageTransition><BookingPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
