import PageHeader from '../components/PageHeader.jsx';
import Catalog from '../components/Catalog.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ProductsPage() {
  const { t } = useLanguage();
  const p = t('pages.products');

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />
      <Catalog />
      <CtaBanner />
    </>
  );
}
