import EventsHeroSection from "@/app/sections/events/EventsHeroSection";
import FeaturedEventSection from "@/app/sections/events/FeaturedEventSection";
import UpcomingEventsSection from "@/app/sections/events/UpcomingEventsSection";
import WhyAttendSection from "@/app/sections/events/WhyAttendSection";

const page = () => {
  return (
    <>
      <EventsHeroSection />
      <FeaturedEventSection />
      <UpcomingEventsSection />
      <WhyAttendSection />
    </>
  );
};

export default page;
