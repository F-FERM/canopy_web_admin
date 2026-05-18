import ExcellenceSection from "@/app/components/about/ExcellenceSection";
import WelcomeSection from "@/app/components/about/WelcomeSection";
import WhyChooseSection from "@/app/components/about/WhyChooseSection";
import SecurityImportance from "@/app/components/detailpages/Security";
import SecurityWhy from "@/app/components/detailpages/WhySecurity";
import CTASection from "@/app/sections/home/CTASection";

const page = () => {
  return (
    <div>
   
      <SecurityImportance />
      <SecurityWhy/>
      
    </div>
  );
};

export default page;
