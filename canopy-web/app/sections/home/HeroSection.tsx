"use client";

import { ListHomeHeroSection, HeroSlide, HeroButton } from "@/Interfaces/HomeHero";
import { listHomeHeroApi } from "@/app/api/Home";
import Button from "@/app/components/ui/Button";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeroSectionProps {
  badgeText?: string;
  badgeIcon?: StaticImageData | string;
  heading?: string;
  headingHighlight?: string;
  subtext?: string;
  buttons?: HeroButton[];
  slides?: (HeroSlide | { image: StaticImageData | string; title: string; description: string; isActive?: boolean })[];
  slideInterval?: number;
  patternImage?: StaticImageData | string;
  accentColor?: string;
  bgColor?: string;
}

// ─── Skeleton ──────────────────────────────────────────────────────────────

function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-60 py-8 sm:py-12 lg:py-20">
      <div className="max-w-[1920px] mx-auto py-4 sm:py-8 md:py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 sm:gap-8 lg:gap-5 items-center">

          {/* Left: copy skeleton */}
          <div className="relative z-10 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-4 w-36 rounded bg-gray-200 animate-pulse" />
            </div>
            <div className="space-y-2 mt-3 sm:mt-4">
              <div className="h-7 sm:h-9 md:h-10 lg:h-12 w-3/4 rounded-lg bg-gray-200 animate-pulse" />
              <div className="h-7 sm:h-9 md:h-10 lg:h-12 w-1/2 rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="space-y-2 mt-3 sm:mt-4">
              <div className="h-3 sm:h-4 w-full max-w-[520px] rounded bg-gray-200 animate-pulse" />
              <div className="h-3 sm:h-4 w-5/6 max-w-[440px] rounded bg-gray-200 animate-pulse" />
              <div className="h-3 sm:h-4 w-2/3 max-w-[360px] rounded bg-gray-200 animate-pulse" />
            </div>
            <div className="mt-5 sm:mt-6 md:mt-7 flex flex-wrap gap-3 sm:gap-4">
              <div className="h-10 sm:h-11 w-28 sm:w-32 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-10 sm:h-11 w-28 sm:w-32 rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>

          {/* Right: image slider skeleton */}
          <div className="relative w-full">
            <div className="relative w-full h-[200px] sm:h-[260px] md:h-[340px] lg:h-[440px] xl:h-[500px] overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[36px] bg-gray-200 animate-pulse">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-4 sm:left-6 md:left-8 lg:left-10 z-10 space-y-2 pr-4">
                <div className="h-5 sm:h-6 md:h-8 w-40 sm:w-52 md:w-64 rounded-lg bg-gray-300/60 animate-pulse" />
                <div className="h-3 sm:h-4 w-56 sm:w-68 md:w-80 rounded bg-gray-300/60 animate-pulse" />
                <div className="h-3 sm:h-4 w-44 sm:w-56 md:w-72 rounded bg-gray-300/60 animate-pulse" />
              </div>
              <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-6 flex gap-1.5 sm:gap-2 z-10">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-2 sm:h-2.5 rounded-full bg-gray-300/60 animate-pulse ${
                      i === 0 ? "w-7 sm:w-9 md:w-10" : "w-2 sm:w-2.5"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <style jsx>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </section>
  );
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_BUTTONS: HeroButton[] = [
  { label: "Explore", href: "/services", variant: "primary" },
  { label: "Contact", href: "/contact", variant: "outline" },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function HeroSection({
  badgeText: propBadgeText = "Trusted Security Partner",
  badgeIcon: propBadgeIcon,
  heading: propHeading = "Highly Trained &\nExperienced",
  headingHighlight: propHeadingHighlight = "Security Services",
  subtext: propSubtext = "Providing professional security solutions to protect people, property, and businesses with trained and reliable security personnel.",
  buttons: propButtons = DEFAULT_BUTTONS,
  slides: propSlides = [],
  slideInterval: propSlideInterval = 3000,
  patternImage: propPatternImage,
  accentColor: propAccentColor = "#F26A23",
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<ListHomeHeroSection | null>(null);

  // ── Fetch API data ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listHomeHeroApi({});
        console.log(data, "herodata");
        setApiData(data?.[0] ?? null);
      } catch (error) {
        console.error("HeroSection API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  // ── Merge API data with prop fallbacks ────────────────────────────────────
  const badgeText        = apiData?.badgeText        ?? propBadgeText;
  const badgeIcon        = apiData?.badgeIcon         ?? propBadgeIcon;
  const heading          = apiData?.heading           ?? propHeading;
  const headingHighlight = apiData?.headingHighlight  ?? propHeadingHighlight;
  const subtext          = apiData?.subtext           ?? propSubtext;
  const buttons          = apiData?.buttons           ?? propButtons;
  const slides           = (apiData?.slides ?? propSlides).filter((s) => s.isActive !== false);
  const slideInterval    = apiData?.slideInterval     ?? propSlideInterval;
  const patternImage     = apiData?.patternImage      ?? propPatternImage;
  const accentColor      = apiData?.accentColor       ?? propAccentColor;

  // ── Slide auto-advance ────────────────────────────────────────────────────
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      slideInterval,
    );
    return () => clearInterval(id);
  }, [slides.length, slideInterval]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length]);

  const activeSlide = slides[currentSlide];

  if (loading) return <HeroSkeleton />;

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <section className="relative overflow-hidden w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-60 py-8 sm:py-12 lg:py-20">

      {/* Decorative pattern */}
      {patternImage && (
        <Image
          src={typeof patternImage === "string" ? patternImage : patternImage}
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="absolute top-0 left-0 w-[120px] sm:w-[180px] md:w-[240px] lg:w-[320px] xl:w-[420px] opacity-90 pointer-events-none select-none"
        />
      )}

      {/* Main grid */}
      <div className="max-w-[1920px] mx-auto py-4 sm:py-8 md:py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 sm:gap-8 lg:gap-5 items-center">

          {/* ── Left: copy ── */}
          <div className="relative z-10">

            {/* Badge */}
            {badgeText && (
              <div className="flex items-center gap-2">
                {badgeIcon && (
                  <Image
                    src={badgeIcon}
                    alt=""
                    aria-hidden
                    width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  />
                )}
                <p
                  className="uppercase tracking-wide text-[11px] sm:text-sm md:text-base lg:text-[18px] font-semibold"
                  style={{ color: accentColor }}
                >
                  {badgeText}
                </p>
              </div>
            )}

            {/* Heading */}
            <h1 className="mt-3 sm:mt-4 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[46px] font-semibold text-black leading-tight whitespace-pre-line">
              {heading}{" "}
              {headingHighlight && (
                <span style={{ color: accentColor }}>{headingHighlight}</span>
              )}
            </h1>

            {/* Subtext */}
            {subtext && (
              <p className="mt-3 sm:mt-4 max-w-full sm:max-w-[480px] md:max-w-[560px] lg:max-w-[620px] text-[#979797] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-6 sm:leading-7 md:leading-8 font-normal">
                {subtext}
              </p>
            )}

            {/* Buttons */}
            {buttons.length > 0 && (
              <div className="mt-5 sm:mt-6 md:mt-7 flex flex-wrap gap-3 sm:gap-4 md:gap-5">
                {buttons.map((btn) => (
                  <Button
                    key={btn.href}
                    label={btn.label}
                    href={btn.href}
                    variant={btn.variant as "primary" | "outline" | "ghost"}
                    color={accentColor}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Right: image slider ── */}
          {slides.length > 0 && (
            <div className="relative w-full mt-2 sm:mt-4 lg:mt-0">
              <div className="relative w-full h-[200px] sm:h-[260px] md:h-[340px] lg:h-[440px] xl:h-[500px] overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[36px]">

                {/* Slides */}
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    src={
                      typeof slide.image === "string"
                        ? slide.image
                        : (slide.image as StaticImageData).src
                    }
                    alt={slide.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Slide copy */}
                {activeSlide && (
                  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-4 sm:left-6 md:left-8 lg:left-10 text-white z-10 pr-4 sm:pr-6">
                    <h3 className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight line-clamp-2">
                      {activeSlide.title}
                    </h3>
                    <p className="mt-1 sm:mt-2 md:mt-3 max-w-[280px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[600px] text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-5 sm:leading-6 md:leading-7 line-clamp-2 sm:line-clamp-3">
                      {activeSlide.description}
                    </p>
                  </div>
                )}

                {/* Dot indicators */}
                <div className="absolute bottom-3 sm:bottom-5 md:bottom-6 right-3 sm:right-5 md:right-6 flex gap-1.5 sm:gap-2 z-10">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`h-1.5 sm:h-2 md:h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "w-6 sm:w-8 md:w-10 bg-white"
                          : "w-1.5 sm:w-2 md:w-3 bg-white/50"
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}