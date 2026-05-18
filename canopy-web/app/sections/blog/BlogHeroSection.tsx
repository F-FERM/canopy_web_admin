"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import { listBlogLandingApi } from "@/app/api/BlogLanding";
import { IconZoomExclamation } from "@tabler/icons-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroButton {
  label: string;
  link: string;
  variant: "primary" | "outline";
}

interface BlogHeroData {
  badgeText: string;
  heading: string;
  headingHighlight: string;
  description: string;
  backgroundImage: string;
  buttons: HeroButton[];
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function BlogHeroSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center px-5 sm:px-8 md:px-14 lg:px-24 xl:px-[148px]">
      <div className="animate-pulse flex flex-col gap-5 w-full max-w-[870px]">
        <div className="h-4 w-36 bg-white/20 rounded" />
        <div className="h-10 w-3/4 bg-white/20 rounded" />
        <div className="h-10 w-1/2 bg-white/20 rounded" />
        <div className="h-4 w-full bg-white/20 rounded" />
        <div className="h-4 w-5/6 bg-white/20 rounded" />
        <div className="flex gap-4 pt-2">
          <div className="h-12 w-36 bg-white/20 rounded-full" />
          <div className="h-12 w-36 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const BlogHeroSection = () => {
  const [data, setData] = useState<BlogHeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listBlogLandingApi({});
        console.log(data, "herodata");
        setData((data?.[0] as unknown as BlogHeroData) ?? null);
      } catch (error) {
        console.error("HeroSection API error:", error);
        setError("Failed to load about section data");
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const bgImage = data?.backgroundImage ?? "";

  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-8 py-6 md:py-8">
      {/* Main Container */}
      <div
        className="
          relative w-full max-w-[1760px] mx-auto
          h-[520px] sm:h-[620px] md:h-[700px] lg:h-[823px]
          rounded-[20px] overflow-hidden
        "
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Loading */}
        {loading && <BlogHeroSkeleton />}

        {/* Error */}
        {!loading && error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Content */}
        {!loading && data && (
          <div
            className="
              relative z-10 flex items-center h-full
              px-5 sm:px-8 md:px-14 lg:px-24 xl:px-[148px]
              py-10 sm:py-14 md:py-16 lg:py-[212px]
            "
          >
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[25px] w-full max-w-full lg:max-w-[870px]">

              {/* Badge */}
              <p className="flex items-center gap-2 text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-semibold tracking-[0.14em] uppercase text-[#F26A23]">
                <span aria-hidden="true" className="text-[14px] sm:text-[16px] md:text-[18px] leading-none">
                  <IconZoomExclamation/>
                </span>
                <span>{data.badgeText}</span>
              </p>

              {/* Heading */}
              <h1 className="font-semibold leading-[1.1] text-[30px] sm:text-[40px] md:text-[48px] lg:text-[56px]">
                <span className="text-white">{data.heading}</span>
                <br />
                <span className="text-[#F26A23]">{data.headingHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-[#CDCDCD] text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.8] max-w-full lg:max-w-[760px]">
                {data.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4">
                {data.buttons.map((btn) => (
                  <Button
                    key={btn.label}
                    label={btn.label}
                    variant={btn.variant}
                    href={btn.label.toLowerCase().includes("blog") ? "#blog-posts" : btn.link}
                    className={btn.variant === "outline" ? "bg-white border-none" : ""}
                  />
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogHeroSection;