

import ImageCard from "@/app/components/detailpages/ImageCard";
import WhyCCTVOperators from "@/app/components/detailpages/WhyService";

import GetInTouchSection from "@/app/sections/contact/GetInTouchSection";
import Image from "next/image";
import React from "react";
import Point from "../../../public/images/Point.png"


// ─── 1. Core Responsibilities ──────────────────────────────────────────────

const responsibilities = [
    {
        title: "Live Monitoring",
        desc: "Monitor CCTV cameras 24/7 to ensure continuous surveillance of premises.",
    },
    {
        title: "Incident Detection",
        desc: "Identify suspicious activities, policy violations, and security breaches in real-time.",
    },
    {
        title: "Alarm Verification",
        desc: "Verify alarms and alerts through CCTV feeds and assess the situation accurately.",
    },
    {
        title: "Reporting & Escalation",
        desc: "Report incidents, maintain logs, and escalate critical issues to the security team or authorities.",
    },
];

export function CoreResponsibilities() {
    return (
        <section className="w-full bg-white py-16 px-6">
            <h2 className="text-center text-4xl font-bold text-gray-900 mb-12 tracking-tight">
                Core{" "}
                <span className="text-[#7F220E]">Responsibilities</span>
            </h2>

            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                {responsibilities.map((item) => (
                    <div
                        key={item.title}
                        className="bg-[#7F220E] rounded-2xl px-7 py-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <h3 className="text-white font-semibold text-lg mb-2 tracking-wide">
                            {item.title}
                        </h3>
                        <p className="text-[#AEAEAE] text-[16px] leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ─── 2. Industries We Serve ────────────────────────────────────────────────

const industries = [
    {
        title: "Office Buildings",
        desc: "Monitor premises, staff, and assets for a safe work environment.",
    },
    {
        title: "Residential Towers",
        desc: "Ensure safety of residents, visitors, and property with 24/7 surveillance.",
    },
    {
        title: "Hotels & Hospitality",
        desc: "Monitor guest areas, entrances, and facilities for enhanced security.",
    },
    {
        title: "Hospitals & Clinics",
        desc: "Ensure patient safety, monitor sensitive areas, and prevent incidents.",
    },
    {
        title: "Commercial Properties",
        desc: "Protect malls, showrooms, warehouses, and business centers.",
    },
];

// Simple shield-check icon SVG
function ShieldCheck() {
    return (
        <svg
            className="w-5 h-5 text-[#7F220E] flex-shrink-0 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    );
}

export function IndustriesWeServe() {
    return (
        <section className="w-full bg-white py-16 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Left column */}
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                        <span className="text-[#7F220E]">Industries</span> We Serve
                    </h2>
                    <p className="text-[#979797] text-[16px] leading-relaxed">
                        At Canopy Security Services, we combine professional expertise,
                        trained security personnel, and reliable service standards to
                        deliver complete protection for your business, property, and people.
                        Our team is committed to maintaining safety, discipline, and
                        excellent customer service while providing customized security
                        solutions tailored to your exact operational needs across Dubai and
                        the UAE.
                    </p>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-5">
                    {industries.map((item) => (
                        <div key={item.title} className="flex items-start gap-3 group">
                           <Image src={Point} width={30} height={30} alt="Point"/>
                            <div>
                                <h4 className="font-bold text-gray-900 text-[20px] group-hover:text-[#7F220E] transition-colors duration-200">
                                    {item.title}
                                </h4>
                                <p className="text-[#737373] text-[16px] mt-0.5 leading-snug">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Combined Page Preview ─────────────────────────────────────────────────

export default function SecurityPage() {
    return (
        <main className="">
            <ImageCard />
            <WhyCCTVOperators />
            <CoreResponsibilities />
            <IndustriesWeServe />
        </main>
    );
}