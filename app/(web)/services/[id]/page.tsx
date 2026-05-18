"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImageCard from "@/app/components/detailpages/ImageCard";
import WhyCCTVOperators from "@/app/components/detailpages/WhyService";
import {
  CoreResponsibilities,
  IndustriesWeServe,
} from "@/app/components/detailpages/Service";
import CTASection from "@/app/sections/home/CTASection";
import { listSeviceSecurityServicesApi } from "@/app/api/web/HomeService";

// ── Skeleton ────────────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-[420px] sm:h-[520px] md:h-[620px] lg:h-[720px] bg-gray-300 rounded-[20px] mx-4 sm:mx-6 md:mx-8" />

      {/* Why section skeleton */}
      <div className="px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-5">
            <div className="h-10 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-5/6 bg-gray-100 rounded" />
            <div className="h-4 w-4/6 bg-gray-100 rounded" />
          </div>
          <div className="aspect-[4/3] lg:aspect-[16/11] bg-gray-200 rounded-[20px]" />
        </div>
      </div>

      {/* Responsibilities skeleton */}
      <div className="w-full py-16 px-6">
        <div className="h-10 w-1/3 mx-auto bg-gray-200 rounded mb-12" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const result: any = await listSeviceSecurityServicesApi({});
        const root = result?.[0];

        if (!root || !root.services) {
          throw new Error("No data found");
        }

        const matchingService = root.services.find(
          (s: any) => s.slug === id || s._id === id,
        );

        if (matchingService && matchingService.detailPage) {
          setData(matchingService.detailPage);
        } else {
          setError("Service detail not found");
        }
      } catch (err: any) {
        console.error("ServiceDetailPage fetch error:", err);
        setError(err?.message ?? "Failed to load service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return <PageSkeleton />;
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
        <p className="text-gray-500 text-center max-w-sm">
          {error ?? "The requested service could not be found."}
        </p>
      </div>
    );
  }

  const {
    heroSection,
    whyChooseSection,
    responsibilitiesSection,
    industriesSection,
  } = data;

  // Map API shape → component props
  const responsibilityItems =
    responsibilitiesSection?.responsibilities?.map((item: any) => ({
      title: item.title,
      desc: item.description,
    })) || [];

  const industryItems =
    industriesSection?.industries?.map((item: any) => ({
      title: item.title,
      desc: item.description,
    })) || [];

  return (
    <div>
      {/* ── Hero ── */}
      {heroSection && (
        <ImageCard
          tag={heroSection.badgeText}
          title={heroSection.heading}
          highlight={heroSection.headingHighlight}
          description={heroSection.description}
          backgroundImage={heroSection.backgroundImage}
          buttonLabel={heroSection.buttonText}
        />
      )}

      {/* ── Why Section ── */}
      {whyChooseSection && (
        <WhyCCTVOperators
          headingLine1Word1={whyChooseSection.heading}
          headingLine1Accent={whyChooseSection.headingHighlight}
          paragraphs={[
            whyChooseSection.descriptionOne,
            whyChooseSection.descriptionTwo,
          ].filter(Boolean)}
          ctaLabel={whyChooseSection.buttonText}
          image={whyChooseSection.image}
        />
      )}

      {/* ── Core Responsibilities ── */}
      {responsibilitiesSection && (
        <CoreResponsibilities
          title={responsibilitiesSection.heading}
          highlight={responsibilitiesSection.headingHighlight}
          items={responsibilityItems}
        />
      )}

      {/* ── Industries We Serve ── */}
      {industriesSection && (
        <IndustriesWeServe
          title={industriesSection.heading}
          highlight={industriesSection.headingHighlight}
          description={industriesSection.description}
          items={industryItems}
        />
      )}

      {/* ── CTA ── */}
      <CTASection />
    </div>
  );
};

export default ServiceDetailPage;
