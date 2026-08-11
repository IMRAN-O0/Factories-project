import Hero from '../components/Hero.jsx';
import ServicesScrolly from '../components/ServicesScrolly.jsx';
import Stats from '../components/Stats.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import AboutTeaser from '../components/AboutTeaser.jsx';
import Certifications from '../components/Certifications.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesScrolly />
      <Certifications />
      <AboutTeaser />
      <Stats />
      <CtaBanner />
    </>
  );
}
