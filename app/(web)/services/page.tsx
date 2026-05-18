import SecurityHeroSection from "@/app/sections/service/SecurityHeroSection";
import SecurityServicesSection from "@/app/sections/service/SecurityServicesSection";
import IndustriesSection from "@/app/sections/service/IndustriesSection";
import ProcessSection from "@/app/sections/service/ProcessSection";
import CTASection from "@/app/sections/home/CTASection";

const page = () => {
  return (
    <>
      <SecurityHeroSection />
      <SecurityServicesSection />
      <IndustriesSection />
      <ProcessSection />
      <CTASection/>
    </>
  );
};

export default page;
