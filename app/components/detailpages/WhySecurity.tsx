"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

const pointsLeft = [
  "Monitoring surveillance systems",
  "Controlling access points",
];

const pointsRight = [
  "Responding to emergencies",
  "Preventing theft and vandalism",
];

interface SecurityWhyProps {
  title?: string;
  highlight?: string;
  description?: string;
  pointsLeft?: string[];
  pointsRight?: string[];
}

const SecurityWhy = ({
  title = "Why",
  highlight = "Security Guards",
  description = "Security guards act as the first line of defense, preventing risks before they escalate into serious threats.",
  pointsLeft = [
    "Monitoring surveillance systems",
    "Controlling access points",
  ],
  pointsRight = [
    "Responding to emergencies",
    "Preventing theft and vandalism",
  ],
}: SecurityWhyProps) => {
  return (
    <section
      className="
        w-full
        bg-[#7F220E]

        pt-[63px]
        pb-[111px]

        px-[20px]
        sm:px-[80px]
        md:px-[150px]
        lg:px-[250px]
        xl:px-[377px]

        mb-20
      "
    >
      <div className="max-w-[1166px] mx-auto">

        {/* TITLE (centered like design) */}
        <h2 className="text-center text-white text-[26px] sm:text-[34px] md:text-[46px] font-semibold leading-tight">
          {title} <span className="text-[#F26A21]">{highlight}</span>
        </h2>

        {/* DESCRIPTION (centered like design) */}
        <p className="mt-4 text-center text-[#E9E9E9] text-[13px] md:text-[16px] max-w-[700px] mx-auto">
          {description}
        </p>

        {/* POINTS GRID */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-70">

          {/* LEFT */}
          <div className="space-y-5">
            {pointsLeft.map((item, i) => (
              <div
                key={i}
                className="
                  flex items-center gap-3
                  text-[#C0C0C0]
                  text-[14px] md:text-[18px]
                "
              >
                <CheckCircle className="text-[#F26A21]" size={18} />
                {item}
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            {pointsRight.map((item, i) => (
              <div
                key={i}
                className="
                  flex items-center gap-3
                  text-[#C0C0C0]
                  text-[14px] md:text-[18px]
                "
              >
                <CheckCircle className="text-[#F26A21]" size={18} />
                {item}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default SecurityWhy;