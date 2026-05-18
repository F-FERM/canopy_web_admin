"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconExclamationCircle } from "@tabler/icons-react";
import {
  listSecurityServicesApi,
  listSeviceSecurityServicesApi,
} from "@/app/api/web/HomeService";
import BadgeIcon from "../../../public/images/home/localoffer.png";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RootObject {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  description: string;
  services: Service[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Service {
  title: string;
  slug?: string;
  image: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  detailPage?: DetailPage;
}

interface DetailPage {
  heroSection: HeroSection;
  whyChooseSection: WhyChooseSection;
  responsibilitiesSection: ResponsibilitiesSection;
  industriesSection: IndustriesSection;
}

interface IndustriesSection {
  heading: string;
  headingHighlight: string;
  description: string;
  industries: Responsibility[];
}

interface ResponsibilitiesSection {
  heading: string;
  headingHighlight: string;
  responsibilities: Responsibility[];
}

interface Responsibility {
  title: string;
  description: string;
}

interface WhyChooseSection {
  heading: string;
  headingHighlight: string;
  descriptionOne: string;
  descriptionTwo: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroSection {
  badgeText: string;
  heading: string;
  headingHighlight: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ServiceCardSkeleton() {
  return (
    <div
      className="
        w-full max-w-[425px]
        h-[360px] sm:h-[390px] lg:h-[426px]
        rounded-[20px] overflow-hidden
        bg-gray-200 animate-pulse
      "
    />
  );
}

function SectionSkeleton() {
  return (
    <section
      className="
        px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60
        py-14 md:py-20 mx-auto
      "
    >
      {/* Header skeleton */}
      <div className="mb-15 sm:mb-14 md:mb-16 lg:mb-25 px-2 sm:px-4 md:px-8 lg:px-[120px] text-center flex flex-col items-center gap-4">
        <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
        <div className="h-10 w-72 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-[500px] max-w-full rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="
        group
        relative

        w-full
        max-w-[425px]

        h-[360px]
        sm:h-[390px]
        lg:h-[426px]

        rounded-[20px]
        overflow-hidden

        bg-white
        border border-gray-200

        shadow
        hover:shadow-xl

        transition-all duration-500
        block
      "
    >
      {/* Image */}
      <div className="relative w-full h-full overflow-hidden bg-gray-200">
        {service.image && (
          <Image
            src={service.image}
            alt={service.title || "Service"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-[27px]">
        <div className="flex flex-col transition-all duration-500">
          {/* Title */}
          <h3
            className="
              text-[22px]
              md:text-[24px]
              font-semibold
              text-white
              transition-all duration-500
            "
          >
            {service.title}
          </h3>

          {/* Description — reveal on hover */}
          <div
            className="
              overflow-hidden
              max-h-0 opacity-0
              group-hover:max-h-[250px] group-hover:opacity-100
              transition-all duration-500 ease-in-out
            "
          >
            <p
              className="
                text-[14px]
                md:text-[15px]
                text-[#E5E5E5]
                leading-[1.8]
                mt-3 mb-4
              "
            >
              {service.description}
            </p>
          </div>

          {/* Button */}
          <div
            className="
              inline-flex items-center
              text-[#F26A23]
              font-semibold
              transition-all duration-300
            "
          >
            {service.buttonText}
            <span className="ml-2">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const SecurityServicesSection = () => {
  const [data, setData] = useState<RootObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const res = await listSeviceSecurityServicesApi({});
        setData(res?.[0] ?? null);
      } catch (err) {
        console.error("SecurityServicesSection API error:", err);
        setError("Failed to load services data");
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  if (loading) return <SectionSkeleton />;

  if (error || !data) {
    return (
      <p className="text-center text-sm text-red-500 py-10">
        Failed to load section{error ? `: ${error}` : ""}.
      </p>
    );
  }

  const activeServices = data.services.filter((s) => s.isActive);

  return (
    <section
      id="services-list"
      className="
        px-5
        sm:px-8
        md:px-14
        lg:px-24
        xl:px-40
        2xl:px-60

        py-14
        md:py-20

        mx-auto
      "
    >
      {/* Header */}
      <div className="mb-15 sm:mb-14 md:mb-16 lg:mb-25 px-2 sm:px-4 md:px-8 lg:px-[120px] text-center">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Image
            src={BadgeIcon}
            alt="Badge Icon"
            className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] object-contain"
          />

          <p className="text-[#F26A23] uppercase tracking-[2px] sm:tracking-[3px] text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
            {data.badgeText}
          </p>
        </div>

        <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[56px] font-bold leading-tight text-black">
          {data.heading}{" "}
          <span className="text-[#F26A23]">{data.headingHighlight}</span>
        </h2>

        <p className="text-[#979797] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed mt-3 sm:mt-4 font-normal max-w-[500px] mx-auto">
          {data.description}
        </p>
      </div>

      {/* Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3

          gap-6
          lg:gap-8

          justify-items-center
        "
      >
        {activeServices.map((service, index) => (
          <ServiceCard key={service.slug || index} service={service} />
        ))}
      </div>
    </section>
  );
};

export default SecurityServicesSection;
