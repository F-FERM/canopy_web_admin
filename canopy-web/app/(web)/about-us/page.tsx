import ExcellenceSection from "@/app/components/about/ExcellenceSection";
import WelcomeSection from "@/app/components/about/WelcomeSection";
import WhyChooseSection from "@/app/components/about/WhyChooseSection";
import CTASection from "@/app/sections/home/CTASection";

const page = () => {
  return (
    <div>
      <WelcomeSection />
      <ExcellenceSection />
      <WhyChooseSection />
      <CTASection />
    </div>
  );
};

export default page;
