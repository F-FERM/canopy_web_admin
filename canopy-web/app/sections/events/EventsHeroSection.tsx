// ─────────────────────────────────────────────
// app/components/events/EventsHeroSection.tsx
// ─────────────────────────────────────────────

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import { listEventsLandingApi } from "@/app/api/EventLanding";
import { IconBriefcase, IconZoomExclamation } from "@tabler/icons-react";

interface EventButton {
  label: string;
  link: string;
  variant: "primary" | "outline";
}

interface EventImage {
  image: string;
}

interface EventsHeroData {
  badgeText: string;
  heading: string;
  headingHighlight: string;
  headingEnd: string;
  description: string;
  buttons: EventButton[];
  images: EventImage[];
}

const EventsHeroSection = () => {
  const [data, setData] = useState<EventsHeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await listEventsLandingApi({});
        setData(response?.[0] ?? null);
      } catch (error) {
        console.error("Hero API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // ───────────────── Loading ─────────────────
  if (loading) {
    return (
      <section className="w-full bg-white">
        <div
          className="
            grid grid-cols-1 lg:grid-cols-[42%_1fr]
            gap-10 lg:gap-14
            items-center

            px-5 sm:px-8 md:px-14
            lg:pl-24 lg:pr-10
            xl:pl-40 xl:pr-16
            2xl:px-60

            py-14 md:py-20
            animate-pulse
          "
        >
          <div className="space-y-5">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-12 w-full max-w-[500px] bg-gray-200 rounded" />
            <div className="h-12 w-[80%] bg-gray-200 rounded" />
            <div className="h-28 w-full bg-gray-200 rounded" />

            <div className="flex gap-4">
              <div className="h-12 w-32 bg-gray-200 rounded" />
              <div className="h-12 w-32 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="h-[420px] sm:h-[600px] lg:h-[760px] bg-gray-200 rounded-[30px]" />
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="w-full overflow-hidden bg-white">
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[42%_1fr]
          items-center

          gap-10
          md:gap-12
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
        "
      >
        {/* ── Left Content ───────────────── */}
        <div className="w-full z-20 order-2 lg:order-1">
          {/* Badge */}
          
           <div className="flex items-center  gap-2 mb-4">
  <span
    aria-hidden="true"
    className="text-[#F26A23] flex items-center justify-center"
  >
    <IconBriefcase className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
  </span>

  <p
    className="
      text-[#F26A23]
      uppercase
      tracking-[0.16em]
      font-semibold

      text-[13px]
      sm:text-[15px]
      md:text-[17px]
      lg:text-[18px]

      leading-none
    "
  >
    {data.badgeText}
  </p>
</div>

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

              text-[#111111]

              mb-5
            "
          >
            <span className="text-[#F26A23]">
              {data.heading}
            </span>{" "}
            {data.headingHighlight}
            <br />
            {data.headingEnd}
          </h2>

          {/* Description */}
          <p
            className="
              text-[14px]
              sm:text-[15px]
              md:text-[16px]

              leading-[1.9]

              text-[#8B8B8B]

              max-w-[680px]
            "
          >
            {data.description}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            {data.buttons?.map((btn, index) => (
              <Button
                key={index}
                label={btn.label}
                href={btn.label.toLowerCase().includes("event") ? "#upcoming-events" : btn.link}
                variant={btn.variant}
              />
            ))}
          </div>
        </div>

        {/* ── Right Image ───────────────── */}
        <div
          className="
            relative
            w-full

            h-[420px]
            sm:h-[550px]
            md:h-[650px]
            lg:h-[760px]

            mt-2
            lg:mt-0

            rounded-[30px]
            overflow-hidden

            order-1 lg:order-2
          "
        >
          <Image
            src={data.images?.[0]?.image}
            alt="Events Hero"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default EventsHeroSection;