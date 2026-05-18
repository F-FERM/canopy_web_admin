"use client";

import { IconHelpOctagon } from "@tabler/icons-react";
import {
  Users,
  Clock,
  CheckCircle,
  Zap,
  DollarSign,
  Shield,
  LucideIcon,
  CircleQuestionMark,
} from "lucide-react";
import Image from "next/image";
import Pattern from "../../../public/images/home/HomePattern1.png";
import { useEffect, useState } from "react";
import { listWhyChooseUsApi } from "@/app/api/HomeChooseUs";

export interface ListWhyChooseUsResponse {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  description: string;
  features: Feature[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Shield, Clock, CheckCircle, Zap, DollarSign, Users,
};

function resolveIcon(iconName: string) {
  const Icon = ICON_MAP[iconName] ?? Shield;
  return <Icon className="w-8 h-8" />;
}

// ── Number Badge ───────────────────────────────────────────────────────────
// Small card: always 140×68, unchanged on all sizes.
// Wide card breakpoints:
//   < lg  (< 1024px) → 140×68  (stacked full-width, mobile badge)
//   lg→xl (1024–1279px) → 180×68
//   xl→2xl(1280–1535px) → 210×72
//   ≥2xl  (≥1536px)  → 270×78  ← original, unchanged
function NumberBadge({ number, isSmallCard }: { number: string; isSmallCard: boolean }) {
  const a = number.charAt(0);
  const b = number.charAt(1);

  if (isSmallCard) {
    return (
      <div
        className="absolute border flex items-center justify-center border-gray-300 group-hover:border-[#F26A23] transition-all duration-300 z-20 top-[20px] right-[2px]"
        style={{ width: 140, height: 68, borderRadius: 17, padding: "10px 28px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}
      >
        <div className="flex items-center leading-none tracking-[0.04em] font-bold">
          <span style={{ fontSize: 30 }} className="text-[#D9D9D9]">{a}</span>
          <span style={{ fontSize: 40 }} className="text-[#D97354] -ml-[2px]">{b}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* < lg: same 140×68 as mobile — card is full-width stacked, badge fits */}
      <div
        className="absolute border flex items-center justify-center border-gray-300 group-hover:border-[#F26A23] transition-all duration-300 z-20 top-[20px] right-[2px] lg:hidden"
        style={{ width: 140, height: 68, borderRadius: 17, padding: "10px 28px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}
      >
        <div className="flex items-center leading-none tracking-[0.04em] font-bold">
          <span style={{ fontSize: 30 }} className="text-[#D9D9D9]">{a}</span>
          <span style={{ fontSize: 40 }} className="text-[#D97354] -ml-[2px]">{b}</span>
        </div>
      </div>

      {/* lg → xl: 180×68 */}
      <div
        className="absolute border items-center justify-center border-gray-300 group-hover:border-[#F26A23] transition-all duration-300 z-20 top-[12px] right-[20px] hidden lg:flex xl:hidden"
        style={{ width: 180, height: 68, borderRadius: 17, padding: "10px 24px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}
      >
        <div className="flex items-center leading-none tracking-[0.04em] font-bold">
          <span style={{ fontSize: 34 }} className="text-[#D9D9D9]">{a}</span>
          <span style={{ fontSize: 44 }} className="text-[#D97354] -ml-[2px]">{b}</span>
        </div>
      </div>

      {/* xl → 2xl: 210×72 */}
      <div
        className="absolute border items-center justify-center border-gray-300 group-hover:border-[#F26A23] transition-all duration-300 z-20 top-[12px] right-[20px] hidden xl:flex 2xl:hidden"
        style={{ width: 210, height: 72, borderRadius: 18, padding: "10px 26px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}
      >
        <div className="flex items-center leading-none tracking-[0.04em] font-bold">
          <span style={{ fontSize: 38 }} className="text-[#D9D9D9]">{a}</span>
          <span style={{ fontSize: 50 }} className="text-[#D97354] -ml-[2px]">{b}</span>
        </div>
      </div>

      {/* ≥2xl: original 270×78 — unchanged */}
      <div
        className="absolute border items-center justify-center border-gray-300 group-hover:border-[#F26A23] transition-all duration-300 z-20 top-[12px] right-[20px] hidden 2xl:flex"
        style={{ width: 270, height: 78, borderRadius: 20, padding: "10px 28px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}
      >
        <div className="flex items-center leading-none tracking-[0.04em] font-bold">
          <span style={{ fontSize: 46 }} className="text-[#D9D9D9]">{a}</span>
          <span style={{ fontSize: 60 }} className="text-[#D97354] -ml-[2px]">{b}</span>
        </div>
      </div>
    </>
  );
}

function SkeletonCard({ wide }: { wide: boolean }) {
  return (
    <div
      className={`relative w-full col-span-12 ${
        wide ? "lg:col-span-8" : "lg:col-span-4"
      } min-h-[300px] rounded-[10px] bg-gray-100 animate-pulse`}
    />
  );
}

const SKELETON_PATTERN = [false, true, true, false, false, true];

export default function WhyChooseUsSection() {
  const [data, setData] = useState<ListWhyChooseUsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listWhyChooseUsApi({});
        setData(res?.[0] ?? null);
      } catch (err) {
        console.error("WhyChooseUs API error:", err);
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = data?.features ?? [];

  // CHANGE: was md:col-span-4/8 — grid activated at 768px where cards are too
  // narrow for the badge + content. Moved to lg:col-span-4/8 so the 2-column
  // layout only kicks in at ≥1024px where there's enough room.
  // Below lg, all cards are full-width (col-span-12) — cleaner on 770–1023px.
  const getColSpan = (index: number) => {
    const pattern = [
      "lg:col-span-4",
      "lg:col-span-8",
      "lg:col-span-8",
      "lg:col-span-4",
      "lg:col-span-4",
      "lg:col-span-8",
    ];
    return pattern[index % pattern.length];
  };

  return (
    <section className="relative overflow-hidden py-28">
      <div
        className="
          relative z-10 max-w-[1920px] mx-auto
          px-5 sm:px-8 md:px-14 lg:px-24
          xl:px-32
          2xl:px-60
        "
      >
        {/* HEADER — unchanged */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="flex items-center justify-center text-[#F26A23] text-[11px] font-bold leading-none">
  <CircleQuestionMark className="w-5 h-5" />            </span>
            <p className="text-[#F26A23] tracking-[3px] text-[18px] font-semibold uppercase">
              {loading ? (
                <span className="inline-block w-28 h-4 bg-orange-100 rounded animate-pulse" />
              ) : (
                data?.badgeText ?? "Why Canopy"
              )}
            </p>
          </div>

          <h2 className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[56px] font-bold leading-tight text-black mb-4">
            {loading ? (
              <span className="inline-block w-56 h-10 bg-gray-200 rounded animate-pulse" />
            ) : (
              <>
                {data?.heading ?? "Why"}{" "}
                <span className="text-[#F26A23]">{data?.headingHighlight ?? "Choose Us"}</span>
              </>
            )}
          </h2>

          <p className="text-[#979797] text-[16px] leading-relaxed max-w-[600px] mx-auto font-normal">
            {loading ? (
              <span className="inline-block w-80 h-5 bg-gray-100 rounded animate-pulse" />
            ) : (
              data?.description ??
              "We are committed to delivering the highest standard of security services with professionalism, integrity, and reliability."
            )}
          </p>

          {error && <p className="mt-3 text-sm text-red-500">⚠ {error}</p>}
        </div>

        {/* DECORATIVE PATTERNS — unchanged */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <Image src={Pattern} alt="Pattern" width={400} height={400} className="opacity-20" />
        </div>
        <div className="absolute right-[9px] top-[190px] z-0 pointer-events-none">
          <Image src={Pattern} alt="Pattern Right" width={350} height={350} className="opacity-20" />
        </div>

        {/* GRID */}
        <div className="py-16">
          <div className="grid grid-cols-12 gap-5 sm:gap-6 md:gap-8">
            {loading
              ? SKELETON_PATTERN.map((wide, i) => <SkeletonCard key={i} wide={wide} />)
              : features.map((feature, index) => {
                  const lgColSpan = getColSpan(index);
                  const colSpan = `col-span-12 ${lgColSpan}`;
                  const isSmallCard = lgColSpan === "lg:col-span-4";

                  return (
                    <div
                      key={feature.number + index}
                      className={`
                        relative w-full ${colSpan}
                        min-h-[300px]
                        overflow-hidden
                        rounded-[10px]
                        transition-all duration-300 group hover:shadow-xl
                      `}
                      style={{
                        backgroundImage: `url(${
                          isSmallCard
                            ? "/images/home/Subtract.png"
                            : "/images/home/Subtract1.png"
                        })`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                      }}
                    >
                      {/* HOVER LINE — unchanged */}
                      <div className="absolute bottom-0 left-0 h-[4px] w-0 bg-[#F26A23] transition-all duration-500 group-hover:w-full rounded-b-[10px] z-30" />

                      <NumberBadge number={feature.number} isSmallCard={isSmallCard} />

                      {/*
                        CONTENT PADDING:
                        p-6 (sm/md, full-width stacked)
                        lg:p-8  (two-col kicks in, cards narrower)
                        xl:p-10
                        2xl:p-12 ← original, unchanged
                      */}
                      <div className="relative z-10 flex flex-col h-full justify-center p-6 lg:p-8 xl:p-10 2xl:p-12">

                        {/* ICON — unchanged */}
                        <div className="w-[73px] h-[73px] p-[23px] mb-6 flex items-center justify-center bg-white border border-[#E5E7EB] rounded-[10px] text-[#D97354] shadow-xl transition-all duration-300 group-hover:bg-[#D97354] group-hover:text-white">
                          {resolveIcon(feature.icon)}
                        </div>

                        {/* TITLE — unchanged */}
                        <h3
                          className={`font-bold text-black mb-4 ${
                            isSmallCard
                              ? "text-[20px] sm:text-[24px] lg:text-[28px] max-w-full"
                              : "text-[20px] sm:text-[24px] lg:text-[28px] max-w-full lg:max-w-[70%]"
                          }`}
                        >
                          {feature.title}
                        </h3>

                        {/* DESCRIPTION — unchanged */}
                        <p
                          className={`text-[14px] sm:text-[15px] lg:text-[16px] leading-[24px] lg:leading-[28px] text-[#555] ${
                            isSmallCard ? "max-w-full" : "max-w-full lg:max-w-[75%]"
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
}