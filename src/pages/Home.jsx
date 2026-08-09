import Hero from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import Stats from '../components/Stats.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import AboutTeaser from '../components/AboutTeaser.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutTeaser />
      <Stats />
      <CtaBanner />
    </>
  );
}
