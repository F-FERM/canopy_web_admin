// components/ui/FeatureCard.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
}

const scaleIn = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.55,
            delay,
        },
    },
});

export default function FeatureCard({
    icon,
    title,
    description,
    delay = 0,
}: FeatureCardProps) {
    return (
        <motion.div
            variants={scaleIn(delay)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                y: -4,
                transition: {
                    duration: 0.2,
                },
            }}
            className="
        bg-white
        border border-[#E8E8E8]

        rounded-[20px]

        px-5
        sm:px-7
        md:px-10

        py-7
        md:py-10

        min-h-[140px]
        md:min-h-[154px]

        flex items-center

        shadow-[0_4px_18px_rgba(0,0,0,0.02)]

        transition-all
      "
        >
            <div className="flex items-start gap-4 md:gap-5">

                {/* ICON */}
                <div className="text-[#F26A23] mt-1 shrink-0">
                    {icon}
                </div>

                {/* TEXT */}
                <div>
                    <h3
                        className="
              text-[20px]
              sm:text-[24px]
              md:text-[30px]
              xl:text-[34px]

              font-semibold
              leading-[110%]

              text-[#111111]

              mb-2
              md:mb-3
            "
                    >
                        {title}
                    </h3>

                    <p
                        className="
              text-[14px]
              md:text-[16px]
              xl:text-[18px]

              text-[#5B5B5B]

              leading-[160%]
            "
                    >
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}