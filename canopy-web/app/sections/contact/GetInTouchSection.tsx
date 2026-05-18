"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";

import {
  Phone,
  ArrowRight,
} from "lucide-react";
import { listContactLandingApi } from "@/app/api/ContactLanding";
import { ListContactLandingResponse } from "@/Interfaces/ContactLanding";
import { IconPhoneCall } from "@tabler/icons-react";

const iconMap: any = {
  Phone,
  ArrowRight,
};

const GetInTouchSection = () => {
  const [data, setData] =
    useState<ListContactLandingResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listContactLandingApi({});
        setData(response?.[0] ?? null);
      } catch (error) {
        console.error("Contact Landing API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ───────────────── Loading ─────────────────
  if (loading) {
    return (
      <section className="px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div
          className="
            w-full
            max-w-[1760px]
            mx-auto

            h-[420px]
            sm:h-[520px]
            md:h-[620px]
            lg:h-[720px]

            rounded-[20px]
            bg-gray-200
            animate-pulse
          "
        />
      </section>
    );
  }

  if (!data) return null;

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        px-4
        sm:px-6
        md:px-8
        lg:px-6
        xl:px-8

        py-6
        md:py-8
      "
    >
      {/* Main Container */}
      <div
        className="
          relative
          w-full
          max-w-[1760px]
          mx-auto

          h-[420px]
          sm:h-[520px]
          md:h-[620px]
          lg:h-[680px]
          xl:h-[720px]

          rounded-[20px]
          overflow-hidden
        "
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${data.backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Content */}
        <div
          className="
            relative
            z-10

            flex
            items-center
            justify-center

            text-center

            h-full

            px-5
            sm:px-8
            md:px-12
            lg:px-16
            xl:px-[148px]

            py-10
            sm:py-14
            md:py-16
          "
        >
          <div
            className="
              flex
              flex-col
              items-center

              gap-4
              sm:gap-5
              md:gap-6
              lg:gap-5
              xl:gap-[25px]

              w-full
              max-w-[900px]
            "
          >
            {/* Badge */}
            <p
              className="
                flex items-center gap-2

                text-[13px]
                sm:text-[15px]
                md:text-[16px]
                lg:text-[17px]
                xl:text-[18px]

                font-semibold
                tracking-[0.14em]
                uppercase
                text-[#F26A23]
              "
            >
               <span className="flex items-center justify-center w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]  border-[#F26A23] text-[#F26A23] text-[10px] sm:text-[11px] font-bold leading-none">
                  <IconPhoneCall />
                </span>

              <span>{data.badgeText}</span>
            </p>

            {/* Heading */}
            <h2
              className="
                font-semibold
                leading-[1.1]

                text-[30px]
                sm:text-[40px]
                md:text-[48px]
                lg:text-[50px]
                xl:text-[56px]
              "
            >
              <span className="text-white">
                {data.heading}
              </span>

              <br />

              <span className="text-[#F26A23]">
                {data.headingHighlight}
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                text-[#CDCDCD]

                text-[14px]
                sm:text-[15px]
                md:text-[16px]

                font-normal
                leading-[1.8]

                max-w-[720px]
              "
            >
              {data.description}
            </p>

            {/* Buttons */}
            <div
              className="
                flex
                flex-col
                sm:flex-row

                items-center
                justify-center

                gap-4

                pt-2
                sm:pt-4
              "
            >
              {data.buttons?.map((btn, index) => {
                const Icon =
                  iconMap[btn.icon as keyof typeof iconMap];

                return (
                  <Button
                    key={index}
                    icon={Icon}
                    label={btn.label}
                    href={btn.link}
                    variant={btn.variant}
                    showArrow={false}
                    className={`
                      rounded-full

                      ${btn.variant === "outline"
                        ? "bg-transparent text-white border-white"
                        : ""
                      }
                    `}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;