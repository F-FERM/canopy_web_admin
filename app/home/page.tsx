"use client"
import AboutSection from "../sections/home/AboutSection";
import BlogSection from "../sections/home/BlogSection";
import CTASection from "../sections/home/CTASection";
import HeroSection from "../sections/home/HeroSection";
import IndustriesSection from "../sections/home/IndustriesSection";
import ServicesSection from "../sections/home/ServicesSection";
import StatsSection from "../sections/home/StatsSection";
import WhyChooseUsSection from "../sections/home/WhyChooseUsSection";

export default function HomePage() {
  return (
    <>
<HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <IndustriesSection />
      <BlogSection />
      <CTASection />
    </>
  );
}
