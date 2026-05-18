// ─────────────────────────────────────────────
// app/components/events/FeaturedEventSection.tsx
// ─────────────────────────────────────────────

"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import { listEventsLandingApi } from "@/app/api/EventLanding";

interface FeaturedEvent {
  badgeText: string;
  title: string;
  date: string;
  location: string;
  description: string;
  backgroundImage: string;
  button: {
    label: string;
    link: string;
    variant: "primary" | "outline";
  };
}

const FeaturedEventSection = () => {
  const [data, setData] = useState<FeaturedEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedEvent = async () => {
      try {
        const response = await listEventsLandingApi({});
        setData(response?.[0]?.featuredEvent ?? null);
      } catch (error) {
        console.error("Featured Event API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvent();
  }, []);

  // ───────────────── Loading ─────────────────
  if (loading) {
    return (
      <section className="w-full py-14 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-[1167px] mx-auto animate-pulse">
          <div className="h-[500px] sm:h-[580px] lg:h-[656px] bg-gray-200 rounded-[28px]" />
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section
      className="
        w-full

        py-14
        md:py-20

        px-4
        sm:px-6
        md:px-10
        lg:px-16
        xl:px-24
      "
    >
      {/* Main Card */}
      <div
        className="
          relative
          w-full
          max-w-[1167px]

          h-[500px]
          sm:h-[580px]
          md:h-[620px]
          lg:h-[656px]

          mx-auto

          rounded-[28px]
          overflow-hidden
        "
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Glass Card */}
        <div
          className="
            absolute

            left-1/2
            -translate-x-1/2

            bottom-4
            sm:bottom-6
            lg:bottom-[54px]

            w-[94%]
            sm:w-[90%]
            lg:w-[970px]

            min-h-[280px]
            lg:h-[451px]

            rounded-[20px]

            border border-white/30

            bg-[#D9D9D9]/20
            

            pt-6
            sm:pt-7
            lg:pt-[28px]

            pr-5
            sm:pr-8
            lg:pr-[73px]

            pb-6
            sm:pb-7
            lg:pb-[28px]

            pl-5
            sm:pl-8
            lg:pl-[75px]

            flex
            flex-col
            justify-center

            z-20
          "
        >
          {/* Tag */}
          <p
            className="
              text-[#F26A23]

              text-[12px]
              sm:text-[14px]
              md:text-[16px]

              font-semibold
              tracking-[0.18em]
              uppercase

              mb-3
            "
          >
            ✩ {data.badgeText}
          </p>

          {/* Title */}
          <h2
            className="
              text-white

              text-[24px]
              sm:text-[34px]
              md:text-[42px]
              lg:text-[46px]

              font-semibold
              leading-[1.15]

              max-w-[760px]

              mb-4
            "
          >
            {data.title}
          </h2>

          {/* Details */}
          <p
            className="
              text-[#CFCFCF]

              text-[14px]
              sm:text-[15px]
              md:text-[16px]

              leading-[1.8]
            "
          >
            {data.date}
            <br />
            {data.location}
            <br />
            {data.description}
          </p>

          {/* Button */}
          <div className="pt-5">
            <Button
              variant={data.button.variant}
              label={data.button.label}
              href={data.button.link}
              className="
                h-[52px]
                sm:h-[54px]

                px-6
                md:px-8

                rounded-[12px]
                font-semibold
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventSection;