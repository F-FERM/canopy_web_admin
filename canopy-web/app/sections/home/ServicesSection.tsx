"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowNarrowRight, IconExclamationCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { listSecurityServicesApi } from "@/app/api/HomeService";
import BadgeIcon from "../../../public/images/home/localoffer.png"

// ── API types ──────────────────────────────────────────────────────────────
interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

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

// ── Fallback / skeleton helpers ────────────────────────────────────────────
const SKELETON_COUNT = 4;

function CardSkeleton() {
  return (
    <div
      className="
        w-full mx-auto sm:mx-0
        h-[400px] sm:h-[450px] md:h-[480px] lg:h-[516px]
        rounded-[10px] overflow-hidden
        bg-gray-200 animate-pulse
      "
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ServicesSection() {
  const [data, setData] = useState<RootObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listSecurityServicesApi({});
        console.log(data, "herodata");
        setData(data?.[0] ?? null);
      } catch (error) {
        console.error("HeroSection API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  // Active services only
  const activeServices = data?.services.filter((s) => s.isActive) ?? [];

  return (
    // CHANGE: xl:px-40 → 2xl:px-40  (keeps desktop unchanged, gives mid-range room)
    <section className="relative overflow-hidden pt-12 sm:pt-16 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-40">
      <div className="relative z-10 max-w-[1920px] mx-auto">

        {/* ── SECTION HEADER ────────────────────────────────────────────── */}
        {/* CHANGE: lg:px-[120px] → xl:px-10 2xl:px-[120px]  (header padding bridge) */}
        <div className="mb-10 sm:mb-14 md:mb-16 lg:mb-20 px-2 sm:px-4 md:px-8 lg:px-10 2xl:px-[120px]">

          {/* Badge */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
  {/* Image instead of icon */}
  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
    <Image
      src={BadgeIcon}
      alt="Badge Icon"
      className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] object-contain"
    />
  </div>

  {/* Text */}
  <p className="text-[#F26A23] uppercase tracking-[2px] sm:tracking-[3px] text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
    {loading ? (
      <span className="inline-block w-28 h-4 bg-orange-200 rounded animate-pulse" />
    ) : (
      data?.badgeText ?? "What We Offer"
    )}
  </p>
</div>

          {/* Heading — unchanged */}
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[56px] font-bold leading-tight text-black">
            {loading ? (
              <span className="inline-block w-56 h-10 bg-gray-200 rounded animate-pulse" />
            ) : (
              <>
                {data?.heading ?? "Our"}{" "}
                <span className="text-[#F26A23]">
                  {data?.headingHighlight ?? "Security Services"}
                </span>
              </>
            )}
          </h2>

          {/* Description — unchanged */}
          <p className="text-[#979797] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed mt-3 sm:mt-4 font-normal max-w-[500px]">
            {loading ? (
              <span className="inline-block w-80 h-5 bg-gray-100 rounded animate-pulse" />
            ) : (
              data?.description ??
              "We offer a full range of professional security services tailored to your specific needs."
            )}
          </p>

          {/* Error banner */}
          {error && (
            <p className="mt-3 text-sm text-red-500">
              ⚠ something went wrong.
            </p>
          )}
        </div>

        {/* ── SERVICES GRID ─────────────────────────────────────────────── */}
        <div className="w-full max-w-[1430px] mx-auto px-2 sm:px-0">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-5 sm:gap-6 md:gap-8
              lg:gap-4
              xl:gap-6
              2xl:gap-y-10
              lg:justify-items-center
            "
          >
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <CardSkeleton key={i} />
              ))
              : activeServices.map((service, index) => (
                <Link
                  href="/services"
                  key={service._id || index}
                  className="
                    group
                    relative
                    w-full
                    mx-auto sm:mx-0
                    h-[400px] sm:h-[450px] md:h-[480px] lg:h-[516px]
                    overflow-hidden
                    rounded-[10px]
                    cursor-pointer
                    flex-shrink-0
                  "
                  // CHANGE: removed sm:max-w-[335px] lg:w-[335px] fixed widths —
                  // those hard-coded 335px values caused overflow at 1296–1584px
                  // because 4 × 335px + gaps > container width at those sizes.
                  // w-full + grid handles sizing correctly across all breakpoints.
                  // At 2xl the grid is wide enough that cards naturally reach ~335px.
                >
                  {/* IMAGE — unchanged */}
                  <div className="absolute inset-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="
                        (max-width: 639px)  100vw,
                        (max-width: 1023px) 50vw,
                        (max-width: 1535px) 25vw,
                        335px
                      "
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* OVERLAY — unchanged */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>

                  {/* CONTENT — unchanged */}
                  <div
                    className="
                      relative z-10
                      h-full flex flex-col justify-end
                      pl-[24px] sm:pl-[28px] md:pl-[31px]
                      pr-[24px] sm:pr-[28px] md:pr-[32px]
                      pb-[32px] sm:pb-[36px] md:pb-[42px]
                      text-white
                    "
                  >
                    {/* TITLE — unchanged */}
                    <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold leading-tight">
                      {service.title}
                    </h3>

                    {/* DESCRIPTION — unchanged */}
                    <p className="mt-[8px] sm:mt-[10px] text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] sm:leading-[26px] md:leading-[28px] text-white/80 font-normal">
                      {service.description}
                    </p>

                    {/* LEARN MORE — unchanged */}
                    <div className="flex items-center gap-2 mt-4 sm:mt-5 text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#F26A23]">
                      <span>{service.buttonText || "Learn More"}</span>
                      <IconArrowNarrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
}