"use client";

import { listEmployeeServiceApi } from "@/app/api/AboutEmployee";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmployeeAPI {
  name: string;
  month: string;
  image: string;
  designation: string;
  description: string;
  isActive: boolean;
}

interface ExcellenceAPIResponse {
  _id: string;
  heading: string;
  headingHighlight: string;
  description: string;
  employees: EmployeeAPI[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay },
  },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay },
  },
});

// ─── Employee Card ────────────────────────────────────────────────────────────

function EmployeeCard({
  employee,
  delay,
}: {
  employee: EmployeeAPI;
  delay: number;
}) {
  const { name, month, image } = employee;

  return (
    <motion.div
      variants={scaleIn(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="
        group relative overflow-hidden rounded-[30px]
        w-full
        max-w-full
        sm:max-w-[448px]

        h-[300px]
        sm:h-[320px]
        md:h-[340px]
        lg:h-[363px]

        cursor-pointer
        shadow-[0_10px_40px_rgba(0,0,0,0.12)]
      "
    >
      <Image
        src={image}
        alt={`${name} – Employee of the Month`}
        fill
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(180,180,180,0.10) 0%, rgba(60,60,60,0.25) 55%, rgba(10,10,10,0.72) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-[36px] pb-6 md:pb-[31px]">
        <p className="text-[22px] sm:text-[24px] md:text-[26px] font-medium leading-tight text-white drop-shadow-sm">
          {name}
        </p>

        <p className="mt-0.5 text-[14px] md:text-[15px] font-medium text-white/70">
          {month}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      className="
        relative overflow-hidden rounded-[30px]
        w-full
        h-[300px]
        sm:h-[320px]
        md:h-[340px]
        lg:h-[363px]
        bg-gray-200
        animate-pulse
      "
    >
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-[36px] space-y-2">
        <div className="h-5 w-32 rounded bg-gray-300" />
        <div className="h-3 w-20 rounded bg-gray-300" />
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const API_URL = "/about/employee-recognition"; // ← Replace with your actual endpoint

export default function ExcellenceSection() {
  const [data, setData] = useState<ExcellenceAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ── Fetch API data ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listEmployeeServiceApi({});
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

  // Active employees only
  const activeEmployees =
    data?.employees.filter((e) => e.isActive) ?? [];

  return (
    <section
      className="
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
      aria-label="Excellence in Service – Employee of the Month"
    >
      {/* ── Section heading ── */}
      <div className="mb-14 md:mb-20 lg:mb-28 flex flex-col items-center text-center">
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            text-center
            text-[32px]
            sm:text-[38px]
            md:text-[42px]
            lg:text-[46px]

            font-semibold
            leading-[110%]
            tracking-[0.04em]
            mb-2
            text-[#111111]
          "
        >
          {loading ? (
            <span className="inline-block w-64 h-10 rounded bg-gray-200 animate-pulse" />
          ) : (
            <>
              {data?.heading ?? "Excellence in"}{" "}
              <span className="text-[#F26A23]">
                {data?.headingHighlight ?? "Service"}
              </span>
            </>
          )}
        </motion.h2>

        <motion.p
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mt-4 md:mt-5
            text-[14px]
            md:text-[16px]
            text-[#979797]
            font-normal
          "
        >
          {loading ? (
            <span className="inline-block w-48 h-4 rounded bg-gray-200 animate-pulse" />
          ) : (
            data?.description ?? "Employee of the Month Recognition"
          )}
        </motion.p>

        {/* ── Error state ── */}
        {error && !loading && (
          <p className="mt-4 text-sm text-red-500">
            Failed to load data: {error}
          </p>
        )}
      </div>

      {/* ── Cards grid ── */}
      <div
        className="
          mx-auto
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          items-end
          gap-5
        "
      >
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : activeEmployees.map((emp, i) => (
              <EmployeeCard
                key={`${emp.name}-${i}`}
                employee={emp}
                delay={0.1 + i * 0.12}
              />
            ))}
      </div>
    </section>
  );
}