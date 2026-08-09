import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Stats from './components/Stats.jsx';
import WhyUs from './components/WhyUs.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Stats />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
