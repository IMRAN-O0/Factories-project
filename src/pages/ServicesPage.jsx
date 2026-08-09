import PageHeader from '../components/PageHeader.jsx';
import Services from '../components/Services.jsx';
import Stats from '../components/Stats.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="خدماتنا"
        title="تصنيع متكامل لمستحضرات التجميل"
        description="من أول فكرة حتى منتج جاهز على الرف، نرافقك في كل مرحلة من مراحل تصنيع علامتك التجارية."
      />
      <Services withHeading={false} />
      <Stats />
      <CtaBanner />
    </>
  );
}
