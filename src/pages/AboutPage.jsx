import PageHeader from '../components/PageHeader.jsx';
import About from '../components/About.jsx';
import WhyUs from '../components/WhyUs.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import Certifications from '../components/Certifications.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function AboutPage() {
  const { t } = useLanguage();
  const p = t('pages.about');

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />
      <About />
      <Certifications />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
