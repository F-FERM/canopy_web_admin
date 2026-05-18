"use client";

import React, { useEffect, useState } from "react";
import { listUpcomingEventsApi } from "@/app/api/UpcomingEvents";

interface Benefit {
  title: string;
  description: string;
  isActive: boolean;
}

interface WhyAttendData {
  whyBadgeText: string;
  whyHeading: string;
  whyHeadingHighlight: string;
  whyAttendCards: Benefit[];
}

const WhyAttendSection = () => {
  const [data, setData] = useState<WhyAttendData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhyAttend = async () => {
      try {
        const response = await listUpcomingEventsApi({});
        setData(response?.[0] ?? null);
      } catch (error) {
        console.error("Why Attend API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyAttend();
  }, []);

  const activeCards =
    data?.whyAttendCards?.filter((card) => card.isActive) ?? [];

  // ───────────────── Loading ─────────────────
  if (loading) {
    return (
      <section
        className="
          px-5
          sm:px-8
          md:px-12
          lg:px-16
          xl:px-40
          2xl:px-60

          py-14
          md:py-20

          mx-auto
          bg-white
        "
      >
        <div className="mb-12 md:mb-16 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
          <div className="h-12 w-80 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-[180px]
                rounded-[20px]
                bg-gray-200
                animate-pulse
              "
            />
          ))}
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section
      className="
        px-5
        sm:px-8
        md:px-12
        lg:px-16
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
        {/* Badge */}
        <p
          className="
            flex items-center gap-1.5

            text-[14px]
            sm:text-[16px]
            md:text-[17px]
            lg:text-[18px]

            font-semibold
            mb-4

            tracking-[0.14em]
            uppercase
            text-[#F26A23]
          "
        >
          {data.whyBadgeText}
        </p>

        {/* Heading */}
        <h2
          className="
            text-[30px]
            sm:text-[36px]
            md:text-[40px]
            lg:text-[42px]
            xl:text-[46px]

            font-semibold
            leading-[110%]
            tracking-[0.04em]

            text-[#111111]
          "
        >
          {data.whyHeading}{" "}
          <span className="text-[#F26A23]">
            {data.whyHeadingHighlight}
          </span>
        </h2>
      </div>

      {/* Cards */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2

          gap-5
          md:gap-6
          lg:gap-7
          xl:gap-8

          justify-items-center
        "
      >
        {activeCards.map((benefit, index) => (
          <div
            key={index}
            className="
              w-full
              max-w-full
              xl:max-w-[574px]

              min-h-[163px]

              rounded-[20px]

              p-6
              sm:p-7
              lg:p-8

              xl:pt-[36px]
              xl:pr-[48px]
              xl:pb-[36px]
              xl:pl-[48px]

              flex
              flex-col
              justify-center

              gap-[10px]

              bg-gradient-to-br
              from-[#7F220E]
              to-[#7F220E]

              text-white

              transition-all
              duration-300

              hover:-translate-y-2
              hover:shadow-[0_20px_40px_rgba(127,34,14,0.25)]
            "
          >
            {/* Title */}
            <h3
              className="
                text-[22px]
                sm:text-[24px]
                md:text-[25px]
                xl:text-[28px]

                font-bold
                leading-tight
              "
            >
              {benefit.title}
            </h3>

            {/* Description */}
            <p
              className="
                text-[14px]
                md:text-[15px]
                xl:text-[16px]

                text-[#D2D2D2]
                font-normal
                leading-[1.7]
              "
            >
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyAttendSection;