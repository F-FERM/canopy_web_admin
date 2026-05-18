import CareerOpportunitiesSection from "@/app/sections/career/CareerOpportunitiesSection";
import JobOpeningsSection from "@/app/sections/career/JobOpeningsSection";
import CTASection from "@/app/sections/home/CTASection";

const page = () => {
  return (
    <div>
      <CareerOpportunitiesSection />
      <JobOpeningsSection />
      <CTASection/>
    </div>
  );
};

export default page;
