"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, Transition } from "framer-motion";
import Button from "@/app/components/ui/Button";
import { Phone, ArrowRight, LucideIcon } from "lucide-react";
import { listContactCTAApi } from "@/app/api/CtaSection";
import { IconPhoneCall } from "@tabler/icons-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "ghost" | "outline";

interface CTAButton {
  label: string;
  link: string;
  variant: ButtonVariant;
  icon: string;
}

interface CTAData {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  description: string;
  buttons: CTAButton[];
  backgroundColor: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Phone,
  ArrowRight,
};

const fadeLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const makeTransition = (delay = 0): Transition => ({
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  delay,
});

// Alternate buttons between left/right animations
const buttonVariants = [fadeLeft, fadeRight];

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CTASkeleton() {
  return (
    <div className="text-center animate-pulse">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-white/20" />
        <div className="h-4 w-28 rounded bg-white/20" />
      </div>
      <div className="h-10 w-3/4 mx-auto rounded bg-white/20 mb-4" />
      <div className="h-4 w-2/4 mx-auto rounded bg-white/20 mb-2" />
      <div className="h-4 w-1/3 mx-auto rounded bg-white/20 mb-16" />
      <div className="flex justify-center gap-6">
        <div className="h-12 w-36 rounded-full bg-white/20" />
        <div className="h-12 w-36 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [data, setData] = useState<CTAData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // ── Fetch API data ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listContactCTAApi({});
        console.log(data, "herodata");
        setData((data?.[0] as unknown as CTAData) ?? null);
      } catch (error) {
        console.error("HeroSection API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  // Resolve background color from API or fall back to brand default
  const bgColor = data?.backgroundColor ?? "#7F220E";

  return (
    <section
      className="relative overflow-hidden py-8 sm:py-9 md:py-10 px-4 sm:px-6 md:px-8"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 md:px-8 lg:px-[120px]">
        <div ref={ref} className="text-center">

          {/* ── Loading ── */}
          {loading && <CTASkeleton />}

          {/* ── Error ── */}
          {error && !loading && (
            <p className="text-red-300 text-sm">
              Failed to load CTA content: {error}
            </p>
          )}

          {/* ── Content ── */}
          {data && !loading && (
            <>
              {/* BADGE */}
              <motion.div
                className="flex items-center justify-center gap-2 mb-3 sm:mb-4"
                variants={fadeLeft}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={makeTransition(0)}
              >
                <span className="flex items-center justify-center w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]  border-[#F26A23] text-[#F26A23] text-[10px] sm:text-[11px] font-bold leading-none">
                  <IconPhoneCall />
                </span>
                <p className="text-[#F26A23] uppercase tracking-[2px] sm:tracking-[3px] text-[13px] sm:text-sm font-semibold">
                  {data.badgeText}
                </p>
              </motion.div>

              {/* HEADING */}
              <motion.h2
                className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[56px] font-bold leading-tight text-white mb-3 sm:mb-4 px-4"
                variants={fadeRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={makeTransition(0.15)}
              >
                {data.heading}{" "}
                <span className="text-[#F26A23]">{data.headingHighlight}</span>
              </motion.h2>

              {/* DESCRIPTION */}
              <motion.p
                className="text-gray-300 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed max-w-[600px] mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4"
                variants={fadeLeft}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={makeTransition(0.3)}
              >
                {data.description}
              </motion.p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4">
                {data.buttons.map((btn, i) => {
                  const ResolvedIcon = ICON_MAP[btn.icon];
                  // Normalise "outline" → "ghost" so Button's variant union stays clean
                  const resolvedVariant: "primary" | "ghost" =
                    btn.variant === "primary" ? "primary" : "ghost";

                  return (
                    <motion.div
                      key={btn.label}
                      variants={buttonVariants[i % 2]}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={makeTransition(0.45)}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        icon={ResolvedIcon}
                        label={btn.label}
                        variant={resolvedVariant}
                        showArrow={false}
                        href={btn.link}
                        className={`w-full sm:w-auto sm:min-w-[160px] md:min-w-[170px] lg:min-w-[184px] h-[48px] sm:h-[52px] md:h-[56px] rounded-[30px] px-5 sm:px-6 py-3 sm:py-[16px] gap-2 sm:gap-[10px] text-[14px] sm:text-[15px] md:text-[16px] ${resolvedVariant === "ghost"
                          ? "border-white text-white"
                          : ""
                          }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}