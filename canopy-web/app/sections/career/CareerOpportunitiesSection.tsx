"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import { listCareerLandingApi } from "@/app/api/CareerLanding";
import { ListCareerLandingResponse } from "@/Interfaces/CareerLanding";
import DotPattern from "../../../public/images/about/Pattern1.jpg";
import { IconTie } from "@tabler/icons-react";


// ─── Types ───────────────────────────────────────────────────────────────────
type CareerHeroData = ListCareerLandingResponse;

// ─── API Fetch ────────────────────────────────────────────────────────────────
async function fetchCareerHeroData(): Promise<CareerHeroData | null> {
  try {
    // Replace with your actual API endpoint
    const res = await fetch("/api/career-hero", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const data: CareerHeroData[] = await res.json();
    return data?.[0] ?? null;
  } catch (err) {
    console.error("CareerHero API error:", err);
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────────────

export default function CareerHero() {
  const [content, setContent] = useState<CareerHeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listCareerLandingApi({});
        console.log(data, "herodata");
        if (data && data.length > 0) {
          setContent(data[0]);
        }
      } catch (error) {
        console.error("HeroSection API error:", error);
        setError("Failed to load career section data");
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);


  // ── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="w-full overflow-hidden bg-white">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[42%_1fr]
            items-start
            gap-12
            lg:gap-14
            px-5
            sm:px-8
            md:px-14
            lg:pl-24
            lg:pr-10
            xl:pl-40
            xl:pr-16
            2xl:pl-60
            2xl:pr-24
            py-14
            md:py-20
            mx-auto
            overflow-visible
          "
        >
          {/* Left skeleton */}
          <div className="w-full pt-2 md:pt-4 z-20 animate-pulse">
            <div className="h-5 w-48 bg-gray-200 rounded mb-4" />
            <div className="h-10 w-72 bg-gray-200 rounded mb-3" />
            <div className="h-10 w-56 bg-gray-200 rounded mb-5" />
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="h-4 w-5/6 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-4/6 bg-gray-200 rounded mb-7" />
            <div className="flex gap-4">
              <div className="h-11 w-36 bg-gray-200 rounded-full" />
              <div className="h-11 w-28 bg-gray-200 rounded-full" />
            </div>
          </div>
          {/* Right skeleton */}
          <div className="relative w-full h-[260px] sm:h-[380px] md:h-[480px] lg:h-[720px] animate-pulse">
            <div className="w-full h-full rounded-[20px] bg-gray-200" />
          </div>
        </div>
      </section>
    );
  }

  // ── No Data ────────────────────────────────────────────────────────────────
  if (!content) return null;

  const {
    badgeText,
    heading,
    headingHighlight,
    headingEnd,
    description,
    image,
    patternImage,
    buttons,
    statsTitle,
    stats,
  } = content;

  return (
    <section className="w-full overflow-hidden bg-white">
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[42%_1fr]
          items-start

          gap-12
          lg:gap-14

          px-5
          sm:px-8
          md:px-14
          lg:pl-24
          lg:pr-10
          xl:pl-40
          xl:pr-16
          2xl:pl-60
          2xl:pr-24

          py-14
          md:py-20

          mx-auto
          overflow-visible
        "
      >
        {/* ── Left Content ───────────────────── */}
        <div className="w-full pt-2 md:pt-4 z-20">
          {/* Eyebrow */}
          <p
            className="
              flex
              items-center
              gap-1.5

              text-[14px]
              sm:text-[16px]
              md:text-[18px]

              font-semibold
              tracking-[0.14em]
              uppercase
              text-[#F26A23]

              mb-3
              md:mb-4
            "
          >
            <span
              aria-hidden="true"
              className="text-[16px] md:text-[18px] font-normal leading-none"
            >
              <IconTie/>
            </span>
            {badgeText}
          </p>

          {/* Heading */}
          <h2
            className="
              font-bold

              text-[30px]
              sm:text-[38px]
              md:text-[42px]
              lg:text-[46px]

              leading-[130%]
              tracking-[0.05em]
              md:tracking-[0.08em]

              text-[#0f0f0f]

              mb-4
              md:mb-5
            "
          >
            {heading}
            <br />
            <span className="text-[#F26A23]">{headingHighlight}</span>{" "}
            {headingEnd}
          </h2>

          {/* Description */}
          <p
            className="
              text-[15px]
              md:text-[16px]
              leading-[1.9]
              text-[#979797]
              max-w-[680px]
            "
          >
            {description}
          </p>

          {/* Buttons */}
          <div className="mt-5 sm:mt-6 md:mt-7 flex flex-wrap gap-3 sm:gap-4 md:gap-5">
            {buttons.map((btn) => (
              <Button
                key={btn.label}
                label={btn.label}
                href={btn.label.toLowerCase() === "view openings" ? "#job-openings" : btn.link}
                variant={btn.variant}
              />
            ))}
          </div>
        </div>

        {/* ── Right Section ─────────────────── */}
        <div
          className="
            relative
            w-full

            h-auto
            lg:h-[720px]

            overflow-visible

            pr-0
            lg:pr-[120px]

            mt-4
            lg:mt-0
          "
        >
          {/* Top Pattern */}
          <Image
            src={patternImage}
            alt=""
            width={320}
            height={320}
            aria-hidden="true"
            className="
              absolute

              top-[-35px]
              right-[-10px]

              lg:top-[-55px]
              lg:right-[-120px]

              z-0

              w-[120px]
              sm:w-[180px]
              md:w-[220px]
              lg:w-[300px]

              h-auto
              pointer-events-none
              opacity-100
            "
          />

          {/* ── Mobile / Tablet Layout ── */}
          <div className="relative lg:hidden w-full">
            {/* Main Image */}
            <div
              className="
                relative
                w-full

                h-[260px]
                sm:h-[380px]
                md:h-[480px]

                rounded-[20px]
                overflow-hidden
                z-10
              "
            >
              <Image
                src={image}
                alt="Security Officer"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* Glass Card */}
            <div
              className="
                relative
                z-20

                w-[92%]
                sm:w-[80%]

                mx-auto
                -mt-16
                sm:-mt-24

                rounded-[20px]
                overflow-hidden

                border border-[#BEBEBE]

                shadow-[0_8px_24px_rgba(0,0,0,0.06)]

                bg-white/20
                backdrop-blur-[18px]
              "
            >
              <div className="relative px-5 sm:px-7 pt-8 pb-6">
                {/* Frosted Overlay */}
                <div className="absolute inset-0 bg-[#B8B8B8]/22 pointer-events-none" />

                <div className="relative z-10">
                  <h3
                    className="
                      text-[26px]
                      sm:text-[30px]
                      font-bold
                      text-black
                      mb-5
                    "
                  >
                    {statsTitle}
                  </h3>

                  <div className="flex flex-col border-b border-[#A9A9A9]">
                    {stats.map((item, index) => (
                      <div
                        key={item.label}
                        className={`
                          flex items-center justify-between gap-4 py-4
                          ${index !== stats.length - 1 ? "border-b border-[#A9A9A9]" : ""}
                        `}
                      >
                        <p className="min-w-[70px] text-[18px] sm:text-[20px] font-semibold text-[#7F220E]">
                          {item.value}
                        </p>
                        <p className="flex-1 text-right text-[14px] sm:text-[16px] text-[#2E2E2E]">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Desktop Layout ── */}
          <div className="hidden lg:block">
            {/* Main Image */}
            <div
              className="absolute top-0 z-10 overflow-hidden rounded-[20px]"
              style={{ width: "722px", height: "511px", right: "20px" }}
            >
              <Image
                src={image}
                alt="Security Officer"
                fill
                priority
                className="object-cover"
                sizes="55vw"
              />
            </div>

            {/* Glass Card */}
            <div
              className="
                absolute
                z-20
                rounded-[20px]
                overflow-hidden
                border
                border-[#BEBEBE]
                shadow-[0_8px_24px_rgba(0,0,0,0.06)]
              "
              style={{
                width: "402px",
                height: "379px",
                top: "264px",
                left: "-42px",
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
              }}
            >
              <div className="relative w-full h-full px-[24px] pt-[42px] pb-[28px]">
                {/* Frosted Overlay */}
                <div className="absolute inset-0 bg-[#B8B8B8]/22 pointer-events-none" />

                <div className="relative z-10">
                  <h3
                    className="
                      text-[32px]
                      leading-none
                      font-[700]
                      tracking-[0.2px]
                      text-black
                      mb-[28px]
                    "
                  >
                    {statsTitle}
                  </h3>

                  <div className="flex flex-col border-b border-[#A9A9A9]">
                    {stats.map((item, index) => (
                      <div
                        key={item.label}
                        className={`
                          flex items-center justify-between py-[18px]
                          ${index !== stats.length - 1 ? "border-b border-[#A9A9A9]" : ""}
                        `}
                      >
                        <p className="min-w-[86px] text-[22px] leading-none font-[600] tracking-[0.3px] text-[#7F220E]">
                          {item.value}
                        </p>
                        <p className="flex-1 text-center text-[17px] leading-none font-[400] tracking-[0.1px] text-[#2E2E2E]">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pattern */}
          <Image
            src={DotPattern}
            alt=""
            width={320}
            height={320}
            aria-hidden="true"
            className="
              absolute

              bottom-[-40px]
              left-[-20px]

              lg:bottom-[-60px]
              lg:left-[-170px]

              z-0

              w-[120px]
              sm:w-[180px]
              md:w-[220px]
              lg:w-[300px]

              h-auto
              pointer-events-none
              opacity-100
            "
          />
        </div>
      </div>
    </section>
  );
}