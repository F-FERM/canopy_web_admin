"use client";

import { listProcessSectionApi } from "@/app/api/ServiceProcess";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BadgeIcon from "../../../public/images/home/Group.png"
interface Process {
  title: string;
  description: string;
  isActive: boolean;
}

interface ProcessData {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  processes: Process[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const API_URL = "/api/process-section"; // Replace with your actual API endpoint

const ProcessSection = () => {
  const [data, setData] = useState<ProcessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listProcessSectionApi({});
        console.log(data, "herodata");
        setData(data?.[0] ?? null);
      } catch (error) {
        console.error("HeroSection API error:", error);
        setError("Failed to load about section data");
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  // Split headingHighlight into two parts for line break
  const headingHighlightParts = data?.headingHighlight?.split(" ") ?? [];
  const firstWord = headingHighlightParts[0] ?? "";
  const restWords = headingHighlightParts.slice(1).join(" ");

  // Filter only active processes
  const activeProcesses = data?.processes?.filter((p) => p.isActive) ?? [];

  // ─── Loading Skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <section
        className="
          px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60
          py-14 md:py-20
          mx-auto bg-white
        "
      >
        {/* Header skeleton */}
        <div className="mb-12 md:mb-16 animate-pulse">
          <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
          <div className="h-10 w-64 bg-gray-200 rounded mb-2" />
          <div className="h-10 w-48 bg-gray-200 rounded" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 justify-items-center">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
                w-full max-w-[574px] min-h-[163px] rounded-[20px]
                pt-7 sm:pt-8 lg:pt-9 pr-6 sm:pr-8 lg:pr-12
                pb-7 sm:pb-8 lg:pb-9 pl-6 sm:pl-8 lg:pl-12
                animate-pulse bg-gray-200
              "
            />
          ))}
        </div>
      </section>
    );
  }

  // ─── Error State ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <section
        className="
          px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60
          py-14 md:py-20 mx-auto bg-white
        "
      >
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center gap-3">
          <p className="text-red-500 font-semibold text-base md:text-lg">
            Failed to load process section
          </p>
          <p className="text-gray-400 text-sm md:text-base">{error}</p>
        </div>
      </section>
    );
  }

  // ─── No Data ─────────────────────────────────────────────────────────────────
  if (!data) return null;

  // ─── Main Render ─────────────────────────────────────────────────────────────
  return (
    <>
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
          bg-white
        "
      >
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p
            className="
              flex items-center gap-1.5

              text-[15px]
              sm:text-[16px]
              md:text-[18px]

              font-semibold
              mb-4

              tracking-[0.14em]
              uppercase
              text-[#F26A23]
            "
          >
            <span className="text-[#F26A23] "><Image
      src={BadgeIcon}
      alt="Badge Icon"
      className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] object-contain "
    /></span>
         

            <span className="text-orange-500 font-semibold text-sm md:text-base tracking-widest">
              {data.badgeText}
            </span>
          </p>

          <h2
            className="
              text-[32px]
              sm:text-[38px]
              md:text-[42px]
              lg:text-[46px]

              font-semibold
              leading-[110%]
              tracking-[0.04em]

              mb-2
              text-[#111111]
            "
          >
            <span className="text-gray-900">{data.heading}</span>{" "}
            <span className="text-orange-500">{firstWord}</span>
            <br />
            <span className="text-orange-500">{restWords}</span>
          </h2>
        </div>

        {/* Process Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2

            gap-5
            md:gap-6
            lg:gap-8

            justify-items-center
          "
        >
          {activeProcesses.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="
                w-full
                max-w-[574px]

                min-h-[163px]

                rounded-[20px]

                pt-[28px]
                sm:pt-[32px]
                lg:pt-[36px]

                pr-[24px]
                sm:pr-[32px]
                lg:pr-[48px]

                pb-[28px]
                sm:pb-[32px]
                lg:pb-[36px]

                pl-[24px]
                sm:pl-[32px]
                lg:pl-[48px]

                flex flex-col
                justify-center

                gap-[10px]

                bg-gradient-to-br
                from-[#7F220E]
                to-[#7F220E]

                text-white

                hover:shadow-xl
                transition-all duration-300
              "
            >
              {/* Title */}
              <h3
                className="
                  text-[22px]
                  sm:text-[24px]
                  md:text-[26px]
                  lg:text-[28px]

                  font-bold
                  leading-tight
                "
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="
                  text-[14px]
                  md:text-[16px]

                  text-[#AEAEAE]
                  font-normal
                  leading-[1.7]
                "
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProcessSection;