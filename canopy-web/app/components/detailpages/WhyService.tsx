"use client";

import Image from "next/image";
import Button from "@/app/components/ui/Button";
import { Phone } from "lucide-react";
import HeroImage from "../../../public/images/about/Excelence1.jpg";
import Link from "next/link";
// 👆 Replace with the correct image import for your CCTV operators photo

// ─── Content ─────────────────────────────────────────────────────────────────
const content = {
    headingLine1Word1: "Why",
    headingLine1Accent: "CCTV",
    headingLine2Accent: "Operators",
    headingLine2Suffix: "Matters",
    paragraphs: [
        "CCTV monitoring is one of the most effective ways to prevent incidents and ensure quick response when needed.",
        "Our trained CCTV operators monitor live feeds 24/7, identify suspicious activities, verify alarms, and coordinate with security personnel for immediate action.",
        "Their vigilance and quick decision-making help reduce risks, protect assets, and ensure a safe environment for everyone.",
    ],
    cta: {
        label: "Contact Us",
    },
    image: {
        src: HeroImage,
        alt: "CCTV security operators at reception desk",
    },
};
// ─────────────────────────────────────────────────────────────────────────────

interface WhyServiceProps {
    headingLine1Word1?: string;
    headingLine1Accent?: string;
    headingLine2Accent?: string;
    headingLine2Suffix?: string;
    paragraphs?: string[];
    ctaLabel?: string;
    image?: any;
    imageAlt?: string;
}

export default function WhyCCTVOperators({
    headingLine1Word1,
    headingLine1Accent,
    headingLine2Accent,
    headingLine2Suffix,
    paragraphs = [],
    ctaLabel = "Contact Us",
    image,
    imageAlt = "Service image",
}: WhyServiceProps) {
    return (
        <section className="w-full overflow-x-hidden bg-white">
            <div
                className="
          grid
          grid-cols-1
          lg:grid-cols-2

          items-center

          gap-10
          lg:gap-16

          px-5
          sm:px-8
          md:px-14
          lg:px-24
          xl:px-40
          2xl:px-60

          py-14
          md:py-20

          mx-auto
        "
            >
                {/* ── Left: Text Column ─────────────────────────────────────── */}
                <div className="flex flex-col gap-5 lg:gap-6">

                    {/* Heading */}
                    <h2
                        className="
              font-bold
              leading-[1.70]
              tracking-[-0.01em]
              text-[36px]
              sm:text-[44px]
              md:text-[50px]
              lg:text-[52px]
              text-[#111111]
            "
                    >
                        {/* Line 1: "Why CCTV" */}
                        <span>{headingLine1Word1} </span>
                        <span className="text-[#F26A23]">{headingLine1Accent}</span>{" "}

                        {/* Line 2: "Operators Matters" */}
                        <span className="text-[#F26A23]">{headingLine2Accent}</span>
                        <span> {headingLine2Suffix}</span>
                    </h2>

                    {/* Paragraphs */}
                    <div className="flex flex-col gap-4">
                        {paragraphs.map((para, i) => (
                            <p
                                key={i}
                                className="
                  text-[14px]
                  sm:text-[15px]
                  md:text-[15px]
                  text-[#555555]
                  leading-[1.8]
                  max-w-[580px]
                "
                            >
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                        <Link href="/contact-us">
                        <Button
                            icon={Phone}
                            label={ctaLabel}
                            variant="primary"
                            className="rounded-full"
                            showArrow={false}
                        />
                        </Link>
                        
                    </div>
                </div>

                {/* ── Right: Image Column ───────────────────────────────────── */}
                <div
                    className="
            relative
            w-full
            rounded-[20px]
            overflow-hidden
            bg-gray-200

            aspect-[4/3]
            lg:aspect-[16/11]
          "
                >
                    {(image?.src || image) && (
                        <Image
                            src={image?.src || image}
                            alt={imageAlt}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
