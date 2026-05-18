"use client";

import { listAboutSectionApi } from "@/app/api/AboutHero";
import { IconExclamationCircle } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Stat {
  value: string;
  label: string;
}

interface AboutUsSectionData {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  headingEnd: string;
  descriptions: string[];
  image: string;
  stats: Stat[];
  patternImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function SkeletonLoader() {
  return (
    <section className="w-full overflow-x-hidden">
      <div className="
        grid grid-cols-1 lg:grid-cols-[42%_1fr] items-start
        gap-10 sm:gap-12 md:gap-14
        lg:gap-10 min-[1280px]:gap-11 min-[1360px]:gap-12 2xl:gap-14
        px-4 sm:px-6 md:px-10
        lg:px-16 min-[1280px]:px-20 min-[1360px]:px-32 2xl:px-60
        py-12 sm:py-14 md:py-16
        lg:py-16 min-[1280px]:py-17 min-[1360px]:py-18 2xl:py-20
        mx-auto
      ">
        <div className="w-full pt-1 sm:pt-2 md:pt-3 2xl:pt-4 space-y-3 sm:space-y-4 animate-pulse">
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-28 sm:w-32" />
          <div className="h-10 sm:h-12 bg-gray-200 rounded w-3/4" />
          <div className="h-10 sm:h-12 bg-gray-200 rounded w-full" />
          <div className="h-20 sm:h-24 bg-gray-200 rounded w-full" />
        </div>
        <div className="relative w-full pb-16 animate-pulse">
          <div className="
            relative w-full bg-gray-200 rounded-xl sm:rounded-2xl
            min-h-[280px] sm:min-h-[340px] md:min-h-[400px]
            lg:min-h-[420px] min-[1280px]:min-h-[460px] min-[1360px]:min-h-[490px] 2xl:min-h-[520px]
          " />
        </div>
      </div>
    </section>
  );
}

export default function AboutUs() {
  const [data, setData] = useState<AboutUsSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const result = await listAboutSectionApi({});
        setData(result?.[0] ?? null);
      } catch (err) {
        console.error("HeroSection API error:", err);
        setError("Failed to load about section data");
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) {
    return (
      <section className="w-full overflow-x-hidden py-16 sm:py-20">
        <div className="text-center text-red-500 px-4">
          <p className="text-base sm:text-lg font-semibold">⚠ Error loading content</p>
          <p className="text-xs sm:text-sm mt-2">{error}</p>
        </div>
      </section>
    );
  }
  if (!data) return null;

  const fullDescription = data.descriptions.join(" ");

  return (
    <section className="w-full overflow-x-hidden">

      {/* ── Outer grid
          lg:       1024–1279px
          min-1280: 1280–1359px  ← the broken band
          min-1360: 1360–1535px  ← also broken
          2xl:      1536px+      ← your desktop, untouched
      ── */}
      <div className="
        grid grid-cols-1 lg:grid-cols-[42%_1fr] items-start
        gap-10 sm:gap-12 md:gap-14
        lg:gap-10 min-[1280px]:gap-11 min-[1360px]:gap-12 2xl:gap-14
        px-4 sm:px-6 md:px-10
        lg:px-16 min-[1280px]:px-20 min-[1360px]:px-32 2xl:px-60
        py-12 sm:py-14 md:py-16
        lg:py-16 min-[1280px]:py-17 min-[1360px]:py-18 2xl:py-20
        mx-auto
      ">

        {/* ── Left column ── */}
        <div className="w-full pt-1 sm:pt-2 md:pt-3 2xl:pt-4">

          {/* Eyebrow */}
          <p className="
            flex items-center gap-1.5 uppercase font-semibold text-[#F26A23]
            text-[13px] sm:text-[14px] md:text-[15px]
            lg:text-[15px] min-[1280px]:text-[16px] min-[1360px]:text-[17px] 2xl:text-[18px]
            tracking-[0.12em] min-[1360px]:tracking-[0.13em] 2xl:tracking-[0.14em]
            mb-2 sm:mb-2.5 md:mb-3 2xl:mb-4
          ">
                 <span
              className="
                flex items-center justify-center
                w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]
                text-[#F26A23]
                text-[10px] sm:text-[11px]
                font-bold
                leading-none
              "
            >
              <IconExclamationCircle />
            </span>
            {data.badgeText}
          </p>

          {/* Heading */}
          <h2 className="
            font-bold text-[#0f0f0f] leading-[130%]
            text-[28px] sm:text-[32px] md:text-[36px]
            lg:text-[32px] min-[1280px]:text-[37px] min-[1360px]:text-[42px] 2xl:text-[46px]
            tracking-[0.06em] md:tracking-[0.08em] min-[1360px]:tracking-[0.09em] 2xl:tracking-[0.10em]
            mb-3 sm:mb-3.5 md:mb-4 2xl:mb-5
          ">
            {data.heading}
            <br />
            <span className="text-[#F26A23]">{data.headingHighlight}</span>{" "}
            {data.headingEnd}
          </h2>

          {/* Description */}
          <p className="
            text-[#979797] max-w-[680px]
            text-[13.5px] sm:text-[14px] md:text-[14.5px]
            lg:text-[14px] min-[1280px]:text-[14.5px] min-[1360px]:text-[15px] 2xl:text-[16px]
            leading-[1.75] sm:leading-[1.8] 2xl:leading-[1.9]
          ">
            {fullDescription}
          </p>
        </div>

        {/* ── Right column ── */}
        <div className="
          relative w-full overflow-visible
          pb-14 sm:pb-14 md:pb-16
          lg:pb-16 min-[1280px]:pb-17 min-[1360px]:pb-18 2xl:pb-20
        ">

          {/* Top dot pattern */}
          <Image
            src={data.patternImage}
            alt=""
            width={180}
            height={180}
            aria-hidden="true"
            className="
              absolute pointer-events-none z-0 h-auto
              -top-6 sm:-top-7 md:-top-8
              lg:-top-9 min-[1280px]:-top-10 min-[1360px]:-top-11 2xl:-top-13
              right-0 md:-right-2
              lg:-right-3 min-[1280px]:-right-6 min-[1360px]:-right-10 2xl:-right-16
              w-[90px] sm:w-[110px] md:w-[120px]
              lg:w-[130px] min-[1280px]:w-[145px] min-[1360px]:w-[160px] 2xl:w-[180px]
            "
          />

          {/* Hero image */}
          <div className="
            relative w-full overflow-hidden z-10
            rounded-xl sm:rounded-[18px] 2xl:rounded-2xl
            min-h-[280px] sm:min-h-[340px] md:min-h-[400px]
            lg:min-h-[420px] min-[1280px]:min-h-[460px] min-[1360px]:min-h-[490px] 2xl:min-h-[520px]
          ">
            <Image
              src={data.image}
              alt="Canopy Security Services"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, (max-width: 1360px) 58vw, 55vw"
              priority
            />
          </div>

          {/* Stats card */}
          <div
            className="
              absolute z-20 bg-[#D9D9D933]
              grid grid-cols-3 divide-x divide-[#e8e8e8]
              rounded-[16px] sm:rounded-[18px] 2xl:rounded-[20px]

              w-[94%] sm:w-[92%] md:w-[90%]
              lg:w-[95%] min-[1280px]:w-[92%] min-[1360px]:w-[88%] 2xl:w-[530px]

              h-[85px] sm:h-[95px] md:h-[100px]
              lg:h-[100px] min-[1280px]:h-[105px] min-[1360px]:h-[110px] 2xl:h-[115px]

              px-3 sm:px-4
              lg:px-4 min-[1280px]:px-5 min-[1360px]:px-6 2xl:px-[38px]

              py-3 sm:py-4 md:py-[18px]
              lg:py-[18px] min-[1280px]:py-[20px] min-[1360px]:py-[22px] 2xl:py-[26px]

              left-1/2 2xl:left-[2%]
              -translate-x-1/2 2xl:-translate-x-[50%]
            "
            style={{ bottom: "50px", backdropFilter: "blur(10px)" }}
          >
            {data.stats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="
                  grid place-items-center
                  px-1 sm:px-2
                  lg:px-3 min-[1280px]:px-4 min-[1360px]:px-6 2xl:px-10
                "
              >
                <p className="
                  font-semibold text-[#7F220E] leading-tight
                  text-[17px] sm:text-[19px] md:text-[20px]
                  lg:text-[19px] min-[1280px]:text-[21px] min-[1360px]:text-[23px] 2xl:text-[1.75rem]
                ">
                  {stat.value}
                </p>
                <p className="
                  text-[#979797] font-medium tracking-wide text-center mt-0.5 sm:mt-1
                  text-[11px] sm:text-[12px] md:text-[13px]
                  lg:text-[12px] min-[1280px]:text-[13px] min-[1360px]:text-[14px] 2xl:text-[16px]
                ">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom dot pattern */}
          <Image
            src={data.patternImage}
            alt=""
            width={180}
            height={180}
            aria-hidden="true"
            className="
              absolute bottom-0 pointer-events-none z-10 h-auto
              -left-8 sm:-left-10 md:-left-12
              lg:-left-14 min-[1280px]:-left-20 min-[1360px]:-left-32 2xl:-left-56
              w-[90px] sm:w-[110px] md:w-[120px]
              lg:w-[130px] min-[1280px]:w-[145px] min-[1360px]:w-[160px] 2xl:w-[180px]
            "
          />
        </div>
      </div>
    </section>
  );
}