"use client";

import Image from "next/image";
import CardShape from "../../../public/images/about/Rectangle 22.png";
import { useEffect, useState } from "react";
import {
  HelpCircle,
  Star,
  Diamond,
  Shield,
  Target,
  Users,
  LucideIcon,
} from "lucide-react";
import { listAboutCardsApi } from "@/app/api/AboutValues";

const ICON_MAP: Record<string, LucideIcon> = {
  HelpCircle,
  Star,
  Diamond,
  Shield,
  Target,
  Users,
};

interface CardAPI {
  number: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

/* ---------------- CARD ---------------- */

function WhatWeDoCard({ card }: { card: CardAPI }) {
  const numberPrefix = card.number.slice(0, -1);
  const numberSuffix = card.number.slice(-1);
  const IconComponent = ICON_MAP[card.icon] ?? HelpCircle;

  return (
    <div
      className="
        relative w-full
        max-w-[520px] lg:max-w-[540px]
        h-[420px] md:h-[460px] lg:h-[560px]
      "
    >
      {/* ================= NUMBER (DESKTOP STYLE POSITION) ================= */}
      <div
        className="
          absolute z-20 flex items-end leading-none
          top-6 left-6
          lg:top-10 lg:left-20
        "
      >
        <span className="text-[55px] lg:text-[80px] font-semibold text-[#D9D9D9]">
          {numberPrefix}
        </span>
        <span className="text-[75px] lg:text-[110px] font-semibold text-[#F4A176]">
          {numberSuffix}
        </span>
      </div>

      {/* ================= DESKTOP DESIGN (UNCHANGED) ================= */}
      <div className="hidden lg:block">
        <div
          className="
            absolute top-[45px] left-[70px]
            w-[430px] h-[455px]
          "
        >
          <Image
            src={CardShape}
            alt="shape card"
            fill
            className="object-contain"
            priority
          />

          <div className="absolute inset-0 flex flex-col justify-end px-[34px] pt-[141px] pb-9">
            <div className="absolute top-[28px] right-[34px] w-[92px] h-[82px] bg-[#F2F2F2] rounded-[14px] flex items-center justify-center">
              <IconComponent className="w-[50px] h-[50px] text-[#8B2E12]" />
            </div>

            <h2 className="text-[20px] font-semibold text-black">
              {card.title}
            </h2>

            <p className="text-[#979797] text-[16px] mt-5 leading-[1.7] max-w-[320px]">
              {card.description}
            </p>
          </div>
        </div>
      </div>

      {/* ================= MOBILE + TABLET SIMPLE CARD ================= */}
      <div
        className="
          lg:hidden
          h-full w-full
          flex items-center justify-center
          px-4
        "
      >
        <div
          className="
            w-full max-w-[420px]
            bg-white
            border border-gray-200
            rounded-2xl
            shadow-sm
            p-5
          "
        >
          {/* NUMBER + ICON */}
          <div className="flex justify-between items-start">
            {/* CLEAN NUMBER (FIXED SPLIT) */}
            {/* <div className="flex items-end leading-none">
              <span className="text-3xl font-semibold text-gray-300">
                {numberPrefix}
              </span>
              <span className="text-4xl font-bold text-[#F4A176]">
                {numberSuffix}
              </span>
            </div> */}

            {/* ICON */}
            <div className="bg-gray-100 rounded-xl w-12 h-12 flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-[#8B2E12]" />
            </div>
          </div>

          {/* TITLE */}
          <h2 className="mt-4 text-lg font-semibold text-black">
            {card.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN ---------------- */

export default function WhatWeDoCards() {
  const [cards, setCards] = useState<CardAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listAboutCardsApi({});
        setCards(data?.[0]?.cards ?? []);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section
      className="
        w-full mx-auto
        px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60
        py-14 md:py-20
      "
    >
      {error && !loading && (
        <p className="text-center text-sm text-red-500 mb-6">
          {error}
        </p>
      )}

      {/* ================= GRID ================= */}
      <div
        className="
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-2
          2xl:grid-cols-3

          gap-10 lg:gap-12
          items-start
          justify-items-center
        "
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="
                  w-full max-w-[520px]
                  h-[420px] md:h-[460px] lg:h-[560px]
                  bg-gray-200 rounded-2xl animate-pulse
                "
              />
            ))
          : cards.map((card) => (
              <WhatWeDoCard key={card.number} card={card} />
            ))}
      </div>
    </section>
  );
}