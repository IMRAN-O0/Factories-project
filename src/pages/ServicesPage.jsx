import PageHeader from '../components/PageHeader.jsx';
import Services from '../components/Services.jsx';
import Stats from '../components/Stats.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ServicesPage() {
  const { t } = useLanguage();
  const p = t('pages.services');

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />
      <Services withHeading={false} />
      <Stats />
      <CtaBanner />
    </>
  );
}
