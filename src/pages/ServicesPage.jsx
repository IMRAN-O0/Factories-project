import PageHeader from '../components/PageHeader.jsx';
import ManufacturingServices from '../components/ManufacturingServices.jsx';
import RnD from '../components/RnD.jsx';
import PackagingSolutions from '../components/PackagingSolutions.jsx';
import Services from '../components/Services.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ServicesPage() {
  const { t } = useLanguage();
  const p = t('pages.services');

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />
      <ManufacturingServices />
      <RnD />
      <PackagingSolutions />
      <Services />
      <CtaBanner />
    </>
  );
}
