import Hero from '../components/Hero.jsx';
import ServicesScrolly from '../components/ServicesScrolly.jsx';
import CatalogTeaser from '../components/CatalogTeaser.jsx';
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
      <CatalogTeaser />
      <CtaBanner />
    </>
  );
}
