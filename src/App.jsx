import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import SmoothScroll from './components/layout/SmoothScroll.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import RouteLoader from './components/layout/RouteLoader.jsx';
import Analytics from './components/Analytics.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const BookingPage = lazy(() => import('./pages/BookingPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

export default function App() {
  const location = useLocation();

  return (
    <div className="overflow-x-hidden">
      <SmoothScroll />
      <ScrollToTop />
      <ScrollProgress />
      <CursorGlow />
      <RouteLoader />
      <Analytics />
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-white dark:bg-night-900" />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/booking" element={<PageTransition><BookingPage /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
