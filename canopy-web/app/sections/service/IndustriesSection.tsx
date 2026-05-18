"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import HotelIcon from "../../../public/images/Service/Icon1.png";
import EstateIcon from "../../../public/images/Service/Icon2.png";
import ExchangeIcon from "../../../public/images/Service/Icon10.png";
import WorkplaceIcon from "../../../public/images/Service/Icon4.png";
import ConstructionIcon from "../../../public/images/Service/Icon5.png";
import CorporateIcon from "../../../public/images/Service/Icon6.png";
import ManufacturingIcon from "../../../public/images/Service/Icon7.png";
import CulturalIcon from "../../../public/images/Service/Icon8.png";
import BankIcon from "../../../public/images/Service/Icon9.png";
import { listIndustriesGridApi } from "@/app/api/ServiceIndustry";

// ─── Icon map (API icon name → local PNG) ────────────────────────────────────

const ICON_MAP: Record<string, StaticImageData> = {
  Building2: HotelIcon,
  Building: EstateIcon,
  Landmark: WorkplaceIcon,
  ShieldCheck: WorkplaceIcon,
  PlusSquare: ConstructionIcon,
  Construction: CorporateIcon,
  BuildingOffice: ManufacturingIcon,
  Factory: CulturalIcon,
  Library: BankIcon,
  Banknote: ExchangeIcon,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface IndustryItem {
  title: string;
  icon: string;
  isActive: boolean;
}

interface IndustriesAPIResponse {
  _id: string;
  industries: IndustryItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div
      className="
        w-full
        h-[139px]
        rounded-[30px] border border-gray-200 bg-gray-100
        animate-pulse
      "
    />
  );
}

// ─── Industry Card ────────────────────────────────────────────────────────────

function IndustryCard({ industry }: { industry: IndustryItem }) {
  const iconSrc = ICON_MAP[industry.icon] ?? HotelIcon;

  return (
    <div
      className="
        w-full
        h-[139px]

        rounded-[30px]
        border border-gray-200
        bg-white

        flex flex-col
        items-center
        justify-center

        px-4
        sm:px-6
        lg:px-8

        pt-[23px]
        pb-[19px]

        gap-[10px]

        hover:shadow-lg
        hover:border-orange-300
        hover:-translate-y-1

        transition-all duration-300
      "
    >
      {/* Icon */}
      <div className="relative w-[28px] h-[28px] sm:w-[30px] sm:h-[30px]">
        <Image
          src={iconSrc}
          alt={industry.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3
        className="
          text-center

          text-[13px]
          sm:text-[14px]
          md:text-[15px]
          lg:text-[16px]

          font-semibold
          text-[#111111]

          leading-[1.4]
        "
      >
        {industry.title}
      </h3>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const IndustriesSection = () => {
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res: IndustriesAPIResponse[] = await listIndustriesGridApi({});
        const active = res?.[0]?.industries.filter((i) => i.isActive) ?? [];
        setIndustries(active);
      } catch (err) {
        console.error("IndustriesSection API error:", err);
        setError("Failed to load industries data");
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  return (
    <section
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
      {error && !loading && (
        <p className="text-center text-sm text-red-500 mb-6">{error}</p>
      )}

      {/* Grid */}
      <div
        className="
          grid

          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5

          gap-4
          md:gap-5
        "
      >
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
          : industries.map((industry, i) => (
            <IndustryCard key={`${industry.title}-${i}`} industry={industry} />
          ))}
      </div>
    </section>
  );
};

export default IndustriesSection;