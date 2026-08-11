import Hero from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import Stats from '../components/Stats.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import AboutTeaser from '../components/AboutTeaser.jsx';
import Certifications from '../components/Certifications.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Certifications />
      <AboutTeaser />
      <Stats />
      <CtaBanner />
    </>
  );
}
