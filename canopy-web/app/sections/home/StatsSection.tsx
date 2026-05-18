"use client";

import { listHomeAboutApi } from "@/app/api/HomeAbout";
import { useEffect, useState } from "react";

interface Stat {
  value: string;
  label: string;
}

interface ListHomeAboutResponse {
  stats: Stat[];
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await listHomeAboutApi({});
        if (!data || data.length === 0) throw new Error("Failed to fetch stats");
        setStats(data[0].stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const skeletonItems = Array.from({ length: 5 });

  // ONLY change: added `lg:gap-8 xl:gap-10` as a stepping stone before 2xl:gap-[60px].
  // Your original desktop gap of 60px is preserved exactly at 2xl (≥1536px).
  const gridClass = `
    w-full
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-5
    xl:grid-cols-5
    gap-y-6
    gap-x-6
    sm:gap-y-8 sm:gap-x-8
    md:gap-y-8 md:gap-x-10
    lg:gap-8
    xl:gap-10
    2xl:gap-[60px]
    items-center
    justify-items-center
  `;

  // ONLY change: xl:px-60 → 2xl:px-60
  // The heavy outer padding now only activates at ≥1536px (your real desktop).
  // sm/md/lg values are untouched.
  const sectionClass = `
    w-full
    bg-[#7F220E]
    px-4
    sm:px-6
    md:px-12
    lg:px-20
    2xl:px-60
  `;

  // ONLY change: xl:px-[120px] → 2xl:px-[120px], added xl:px-10 as bridge.
  // lg:px-[40px] and 2xl:px-[120px] are identical to your originals.
  const innerClass = `
    max-w-[1920px]
    mx-auto
    px-4
    sm:px-6
    md:px-8
    lg:px-[40px]
    xl:px-10
    2xl:px-[120px]
    py-8
    sm:py-10
    md:py-8
    lg:py-0
    lg:h-[148px]
    flex
    items-center
    justify-center
  `;

  if (loading) {
    return (
      <section className={sectionClass}>
        <div className={innerClass}>
          <div className={gridClass}>
            {skeletonItems.map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center w-full animate-pulse"
              >
                <div className="h-[36px] sm:h-[44px] md:h-[48px] lg:h-[58px] w-16 sm:w-20 md:w-24 bg-white/20 rounded mb-2 sm:mb-2.5 md:mb-3" />
                <div className="h-3 sm:h-4 md:h-[17px] lg:h-5 w-20 sm:w-24 md:w-28 bg-white/20 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={sectionClass}>
        <div className="max-w-[1920px] mx-auto min-h-[100px] flex items-center justify-center">
          <p className="text-white/60 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClass}>
      <div className={innerClass}>
        <div className={gridClass}>
          {stats.map((item, index) => (
            <div
              key={index}
              className="
                flex
                flex-col
                items-center
                text-center
                w-full
              "
            >
              {/* NUMBER — 100% unchanged from your original */}
              <h3
                className="
                  text-[#F26A23]
                  text-[28px]
                  sm:text-[36px]
                  md:text-[42px]
                  lg:text-[52px]
                  xl:text-[58px]
                  leading-none
                  font-bold
                "
              >
                {item.value}
              </h3>

              {/* LABEL — 100% unchanged from your original */}
              <p
                className="
                  mt-1.5
                  sm:mt-2
                  md:mt-2.5
                  lg:mt-3
                  text-white
                  text-[11px]
                  sm:text-[13px]
                  md:text-[15px]
                  lg:text-[18px]
                  xl:text-[20px]
                  font-medium
                  whitespace-nowrap
                "
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}