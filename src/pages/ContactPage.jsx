import PageHeader from '../components/PageHeader.jsx';
import Contact from '../components/Contact.jsx';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="تواصل معنا"
        title="لنبدأ رحلتك التصنيعية"
        description="فريقنا جاهز للإجابة على كل استفساراتك حول تصنيع مستحضرات التجميل الخاصة بعلامتك."
      />
      <Contact />
    </>
  );
}
