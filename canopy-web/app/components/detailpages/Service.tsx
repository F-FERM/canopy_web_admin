// SecurityComponents.jsx
// Two components: CoreResponsibilities + IndustriesWeServe
// Tailwind CSS (Next.js compatible)

import React from "react";

// ─── 1. Core Responsibilities ──────────────────────────────────────────────

// ─── 1. Core Responsibilities ──────────────────────────────────────────────

interface ResponsibilityItem {
  title: string;
  desc: string;
}

interface CoreResponsibilitiesProps {
  title?: string;
  highlight?: string;
  items?: ResponsibilityItem[];
}

const defaultResponsibilities = [
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

export function CoreResponsibilities({
  title = "Core",
  highlight = "Responsibilities",
  items = defaultResponsibilities,
}: CoreResponsibilitiesProps) {
  return (
    <section className="w-full bg-white py-16 px-6">
      <h2 className="text-center text-4xl font-bold text-gray-900 mb-12 tracking-tight">
        {title}{" "}
        <span className="text-[#7F220E]">{highlight}</span>
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-[#7F220E] rounded-2xl px-7 py-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-white font-semibold text-lg mb-2 tracking-wide">
              {item.title}
            </h3>
            <p className="text-[#E8C5B8] text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 2. Industries We Serve ────────────────────────────────────────────────

interface IndustryItem {
  title: string;
  desc: string;
}

interface IndustriesWeServeProps {
  title?: string;
  highlight?: string;
  description?: string | string[];
  items?: IndustryItem[];
}

const defaultIndustries = [
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

const defaultDescription = [
  "At Canopy Security Services, we combine professional expertise, trained security personnel, and reliable service standards to deliver complete protection for your business, property, and people.",
  "Our team is committed to maintaining safety, discipline, and excellent customer service while providing customized security solutions tailored to your exact operational needs across Dubai and the UAE."
];

// Simple shield-check icon SVG
function ShieldCheck() {
  return (
    <svg
      className="w-5 h-5 text-[#B04020] flex-shrink-0 mt-0.5"
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

export function IndustriesWeServe({
  title = "We Serve",
  highlight = "Industries",
  description = defaultDescription,
  items = defaultIndustries,
}: IndustriesWeServeProps) {
  const descriptions = Array.isArray(description) ? description : [description];

  return (
    <section className="w-full bg-white py-16">
      <div className="px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left column */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
              <span className="text-[#F26A23]">{highlight}</span> {title}
            </h2>
            <div className="flex flex-col gap-4">
              {descriptions.map((desc, index) => (
                <p key={index} className="text-gray-500 text-[16px] leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {items.map((item) => (
              <div key={item.title} className="flex items-start gap-3 group">
                <ShieldCheck />
                <div>
                  <h4 className="font-bold text-gray-900 text-base group-hover:text-[#B04020] transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Combined Page Preview ─────────────────────────────────────────────────

export default function SecurityPage() {
  return (
    <main className="font-sans">
      <CoreResponsibilities />
      <IndustriesWeServe />
    </main>
  );
}