"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { listServiceLandingApi } from "@/app/api/ServiceLanding";
import Image from "next/image";
import BadgeIcon from "../../../public/images/home/localoffer.png"



// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroButton {
  label: string;
  link: string;
  variant: string;
}

interface SecurityHeroAPIResponse {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  descriptions: string[];
  backgroundImage: string;
  buttons: HeroButton[];
  overlay: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ─── API URL ──────────────────────────────────────────────────────────────────

const API_URL = "/api/security-hero"; // ← Replace with your actual endpoint

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function HeroSkeleton() {
  return (
    <section
      className="
        relative w-full overflow-hidden
        px-4 sm:px-6 md:px-8 lg:px-8
        py-6 md:py-8
      "
    >
      <div
        className="
          relative w-full max-w-[1760px] mx-auto
          h-[520px] sm:h-[620px] md:h-[700px] lg:h-[823px]
          rounded-[20px] overflow-hidden
          bg-gray-200 animate-pulse
        "
      >
        <div
          className="
            absolute z-10
            px-5 sm:px-8 md:px-14 lg:px-24 xl:px-[148px]
            py-10 sm:py-14 md:py-16 lg:py-[212px]
            flex flex-col gap-5 max-w-[870px]
          "
        >
          <div className="h-4 w-36 rounded bg-gray-300" />
          <div className="h-12 w-80 rounded bg-gray-300" />
          <div className="h-4 w-full max-w-[760px] rounded bg-gray-300" />
          <div className="h-4 w-3/4 rounded bg-gray-300" />
          <div className="flex gap-4 pt-2">
            <div className="h-11 w-28 rounded bg-gray-300" />
            <div className="h-11 w-28 rounded bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const SecurityHeroSection = () => {
  const [data, setData] = useState<SecurityHeroAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listServiceLandingApi({});
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

  if (loading) return <HeroSkeleton />;

  if (error || !data) {
    return (
      <p className="text-center text-sm text-red-500 py-10">
        Failed to load section{error ? `: ${error}` : ""}.
      </p>
    );
  }

  // Split heading: everything before headingHighlight stays white
  const { badgeText, heading, headingHighlight, descriptions, backgroundImage, buttons, overlay } = data;

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        px-4
        sm:px-6
        md:px-8
        lg:px-8

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

          h-[520px]
          sm:h-[620px]
          md:h-[700px]
          lg:h-[823px]

          rounded-[20px]
          overflow-hidden
        "
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Overlay */}
          {overlay && <div className="absolute inset-0 bg-black/50" />}
        </div>

        {/* Content Wrapper */}
        <div
          className="
            relative
            z-10

            flex
            items-center
            h-full

            px-5
            sm:px-8
            md:px-14
            lg:px-24
            xl:px-[148px]

            py-10
            sm:py-14
            md:py-16
            lg:py-[212px]
          "
        >
          {/* Content Box */}
          <div
            className="
              flex flex-col

              gap-4
              sm:gap-5
              md:gap-6
              lg:gap-[25px]

              w-full
              max-w-full
              lg:max-w-[870px]
            "
          >
            {/* Badge */}
            <p
              className="
                flex items-center gap-2

                text-[13px]
                sm:text-[15px]
                md:text-[16px]
                lg:text-[18px]

                font-semibold
                tracking-[0.14em]
                uppercase
                text-[#F26A23]
              "
            >
               <Image
      src={BadgeIcon}
      alt="Badge Icon"
      className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] object-contain"
    />
              <span>{badgeText}</span>
            </p>

            {/* Heading */}
            <h1
              className="
                font-semibold
                leading-[1.1]

                text-[30px]
                sm:text-[40px]
                md:text-[48px]
                lg:text-[56px]
              "
            >
              <span className="text-white">{heading}</span>{" "}
              <br />
              <span className="text-[#F26A23]">{headingHighlight}</span>
            </h1>

            {/* Description — join multiple paragraphs into one block */}
            <p
              className="
                text-[#CDCDCD]

                text-[14px]
                sm:text-[15px]
                md:text-[16px]

                font-normal
                leading-[1.8]

                max-w-full
                lg:max-w-[760px]
              "
            >
              {descriptions.join(" ")}
            </p>

            {/* Buttons */}
            <div
              className="
                flex flex-col
                sm:flex-row
                gap-4
                pt-2
                sm:pt-4
              "
            >
              {buttons.map((btn) => (
                <Button
                  key={btn.label}
                  label={btn.label}
                  href={btn.label.toLowerCase().includes("explore") ? "#services-list" : btn.link}
                  variant={btn.variant as "primary" | "outline"}
                  className={btn.variant === "outline" ? "bg-white border-none" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityHeroSection;