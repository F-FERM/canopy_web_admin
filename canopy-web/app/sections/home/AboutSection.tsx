"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import { IconExclamationCircle } from "@tabler/icons-react";
import { listHomeAboutApi } from "@/app/api/HomeAbout";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AboutData {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  descriptions: string[];
  primaryImage: string;
  secondaryImage: string;
  buttonText: string;
  buttonLink: string;
  patternImageTop: string;
  patternImageBottom: string;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AboutSection() {
  const [content, setContent] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listHomeAboutApi({});
        console.log(data, "herodata");
        setContent(data?.[0] ?? null);
      } catch (error) {
        console.error("HeroSection API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  // ── Loading State ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-20 mb-16 sm:mb-20 md:mb-24 lg:mb-30">
        <div className="relative z-10 max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 animate-pulse">
          {/* Title skeleton */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-5 w-5 bg-gray-200 rounded-full" />
              <div className="h-5 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-72 bg-gray-200 rounded mx-auto" />
          </div>
          {/* Grid skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-[90px]">
            <div className="relative w-full max-w-[705px] mx-auto h-[280px] sm:h-[340px] md:h-[380px] lg:h-[421px] bg-gray-200 rounded-[10px]" />
            <div className="flex flex-col gap-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded mt-2" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-10 w-32 bg-gray-200 rounded-full mt-4" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── No Data ──────────────────────────────────────────────────────────────
  if (!content) return null;

  const {
    badgeText,
    heading,
    headingHighlight,
    descriptions,
    primaryImage,
    secondaryImage,
    buttonText,
    buttonLink,
    patternImageTop,
    patternImageBottom,
  } = content;

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-20 mb-16 sm:mb-20 md:mb-24 lg:mb-30">

      {/* TOP RIGHT dot pattern */}
      <Image
        src={patternImageTop}
        alt="pattern"
        width={320}
        height={320}
        className="
          absolute
          top-[-2%] sm:top-[-3%] lg:top-[-4%]
          right-[10%] sm:right-[20%] lg:right-[29%]
          w-[160px] sm:w-[220px] md:w-[280px] lg:w-[320px]
          opacity-40 sm:opacity-50 lg:opacity-60
          pointer-events-none
          select-none
          z-0
        "
      />

      {/* BOTTOM LEFT dot pattern */}
      <Image
        src={patternImageBottom}
        alt="pattern"
        width={320}
        height={320}
        className="
          absolute
          bottom-[-40px] sm:bottom-[-50px] lg:bottom-[-70px]
          left-[5%] sm:left-[12%] lg:left-[22%]
          w-[160px] sm:w-[220px] md:w-[280px] lg:w-[320px]
          opacity-15 sm:opacity-20 lg:opacity-25
          pointer-events-none
          select-none
          z-0
        "
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6">

        {/* SECTION TITLE */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
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
            <p
              className="
                text-[#F26A23]
                uppercase
                tracking-[2px] sm:tracking-[3px]
                text-[14px] sm:text-[16px] md:text-[18px]
                font-semibold
              "
            >
              {badgeText}
            </p>
          </div>

          <h2
            className="
              text-[28px] sm:text-[36px] md:text-[42px] lg:text-[56px]
              font-bold
              leading-tight
              text-black
              px-4
            "
          >
            {heading}{" "}
            <span className="text-[#F26A23]">{headingHighlight}</span>
          </h2>
        </div>

        {/* MAIN CONTENT GRID
            Breakpoint strategy:
            - < lg  (< 1024px) : single column stack — fine
            - lg    (1024px)   : two columns, percentage-based image sizing
            - xl    (1280px)   : two columns, still percentage-based (fluid through 1535px)
            - 2xl   (1536px)   : two columns, original fixed pixel values restored

            This fixes the 1290–1624px range where the old code jumped straight
            from lg percentages to xl fixed-pixel sizes that were too large for
            the container at those intermediate widths.
        -->*/}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            items-start
            gap-8 sm:gap-12 md:gap-16 lg:gap-10 xl:gap-14 2xl:gap-[90px]
          "
        >
          {/* ── LEFT: OVERLAPPING IMAGES ── */}
          <div
            className="
              relative
              w-full
              max-w-[705px]
              mx-auto
              h-[280px] sm:h-[340px] md:h-[380px] lg:h-[380px] xl:h-[400px] 2xl:h-[421px]
            "
          >
            {/* FIRST IMAGE — top-left */}
            <div
              className="
                absolute
                top-0
                left-0
                w-[55%] lg:w-[52%] xl:w-[54%] 2xl:w-[377px]
                h-[72%] sm:h-[75%] lg:h-[78%] xl:h-[79%] 2xl:h-[349px]
                rounded-[8px] sm:rounded-[10px]
                overflow-hidden
                shadow-lg sm:shadow-xl
                z-20
              "
            >
              <Image
                src={secondaryImage}
                alt="Security Guards"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 55vw, (max-width: 1024px) 54vw, (max-width: 1536px) 54vw, 377px"
              />
            </div>

            {/* SECOND IMAGE — offset bottom-right */}
            <div
              className="
                absolute
                top-[32px] sm:top-[38px] md:top-[40px] lg:top-[42px] xl:top-[44px] 2xl:top-[42px]
                left-[42%] sm:left-[44%] lg:left-[44%] xl:left-[44%] 2xl:left-[321px]
                w-[57%] lg:w-[55%] xl:w-[56%] 2xl:w-[384px]
                h-[75%] sm:h-[80%] lg:h-[86%] xl:h-[87%] 2xl:h-[384px]
                rounded-[8px] sm:rounded-[10px]
                overflow-hidden
                shadow-xl sm:shadow-2xl
                z-10
              "
            >
              <Image
                src={primaryImage}
                alt="Security Officer"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 57vw, (max-width: 1024px) 55vw, (max-width: 1536px) 56vw, 384px"
              />
            </div>
          </div>

          {/* ── RIGHT: TEXT CONTENT ── */}
          <div
            className="
              w-full
              max-w-[705px]
              mx-auto lg:mx-0
              flex
              flex-col
              gap-6 sm:gap-8 md:gap-10 lg:gap-[40px]
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4 sm:gap-5 md:gap-6 lg:gap-[24px]
                text-[#979797]
                text-[14px] sm:text-[15px] md:text-[16px]
                leading-[1.7] sm:leading-[1.75] md:leading-[1.85]
                font-normal
              "
            >
              {descriptions.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* CTA BUTTON */}
            <div className="mt-0 sm:mt-1">
              <Button
                label={buttonText}
                href={buttonLink}
                variant="primary"
                color="#F26A23"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}