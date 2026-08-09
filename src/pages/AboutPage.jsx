import PageHeader from '../components/PageHeader.jsx';
import About from '../components/About.jsx';
import WhyUs from '../components/WhyUs.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="من نحن"
        title="قصة مصنع أول حلم"
        description="نؤمن بأن كل فكرة تستحق أن تتحول إلى منتج حقيقي بجودة تنافس الأسواق العالمية."
      />
      <About />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
