"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { listUpcomingEventsApi } from "@/app/api/UpcomingEvents";

interface EventButton {
  label: string;
  link: string;
}

interface EventCard {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  button: EventButton;
  isActive: boolean;
}

interface UpcomingEventsData {
  upcomingHeading: string;
  upcomingHeadingHighlight: string;
  events: EventCard[];
}

const UpcomingEventsSection = () => {
  const [data, setData] = useState<UpcomingEventsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await listUpcomingEventsApi({});
        setData(response?.[0] ?? null);
      } catch (error) {
        console.error("Upcoming Events API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const activeEvents =
    data?.events?.filter((event) => event.isActive) ?? [];

  if (loading) {
    return (
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-40 2xl:px-60 py-14 md:py-20 mx-auto bg-white">
        <div className="text-center mb-12 md:mb-16 animate-pulse">
          <div className="h-12 w-72 bg-gray-200 rounded mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="w-full h-[270px] rounded-[20px] bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section
      id="upcoming-events"
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
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-[30px] sm:text-[36px] md:text-[40px] lg:text-[42px] xl:text-[46px] font-semibold leading-[110%] tracking-[0.04em]">
          <span className="text-[#111111]">
            {data.upcomingHeading}
          </span>{" "}
          <span className="text-[#F26A23]">
            {data.upcomingHeadingHighlight}
          </span>
        </h2>
      </div>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-2
          2xl:grid-cols-2

          gap-5 lg:gap-6 xl:gap-8
          items-stretch
        "
      >
        {activeEvents.map((event, index) => (
          <div
            key={index}
            className="
              w-full
              max-w-full
              xl:max-w-[722px]

              min-h-[269px]

              rounded-[20px]
              border border-[#D9D9D9]
              bg-white

              p-4
              sm:p-5
              lg:p-4

              xl:pt-[10px]
              xl:pr-[33px]
              xl:pb-[10px]
              xl:pl-[15px]

              flex
              flex-col
              sm:flex-row
              sm:items-center

              gap-5

              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            {/* IMAGE (FIXED FOR TABLET + MACBOOK AIR) */}
            <div
              className="
                relative
                w-full

                sm:w-[220px]
                md:w-[200px]
                lg:w-[210px]
                xl:w-[250px]

                h-[220px]
                md:h-[190px]
                lg:h-[200px]
                xl:h-[243px]

                rounded-[20px]
                overflow-hidden
                flex-shrink-0
              "
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 250px"
              />
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[22px] sm:text-[24px] md:text-[26px] xl:text-[30px] font-bold text-black mb-3">
                {event.title}
              </h3>

              <p className="text-[#666666] text-[14px] sm:text-[15px] md:text-[16px] xl:text-[18px] leading-[1.5] mb-3">
                {event.date} • {event.location}
              </p>

              <p className="text-[#5C5C5C] text-[14px] md:text-[15px] xl:text-[16px] leading-[1.7] mb-5">
                {event.description}
              </p>

              <Link
                href={event.button?.link}
                className="
                  w-fit
                  h-[46px]
                  xl:h-[48px]
                  px-5
                  xl:px-6
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-[12px]
                  bg-[#F26A23]
                  text-white
                  text-[15px]
                  xl:text-[16px]
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-[#dd5d18]
                "
              >
                {event.button?.label}
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEventsSection;