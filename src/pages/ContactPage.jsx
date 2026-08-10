import PageHeader from '../components/PageHeader.jsx';
import Contact from '../components/Contact.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ContactPage() {
  const { t } = useLanguage();
  const p = t('pages.contact');

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />
      <Contact />
    </>
  );
}
