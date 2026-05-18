"use client";

import React, { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import { IconHelpOctagon } from "@tabler/icons-react";
import { listCareerOpeningsApi } from "@/app/api/CareerJob";
import { ApplyNow } from "./ApplyNow";
import { CircleQuestionMark } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Requirement {
  text: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: Requirement[];
  buttonText: string;
  applyLink: string;
  isActive: boolean;
}

interface JobOpeningsData {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  headingEnd: string;
  description: string;
  jobs: Job[];
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div
    className="
      w-full
      max-w-[425px]
      min-h-[477px]
      rounded-[20px]
      border border-gray-200
      bg-white
      pt-[41px]
      pr-6 sm:pr-8 lg:pr-[49px]
      pb-[41px]
      pl-6 sm:pl-8 lg:pl-[49px]
      flex flex-col
      animate-pulse
    "
  >
    <div className="h-7 bg-gray-200 rounded-lg w-3/4 mb-4" />
    <div className="space-y-2 mb-8">
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-5/6" />
      <div className="h-4 bg-gray-100 rounded w-4/6" />
    </div>
    <div className="space-y-4 mb-10 flex-1">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-gray-200 mt-2 flex-shrink-0" />
          <div className="h-4 bg-gray-100 rounded w-full" />
        </div>
      ))}
    </div>
    <div className="mt-auto">
      <div className="h-[54px] bg-gray-200 rounded-xl w-full sm:w-[220px]" />
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const JobOpeningsSection = () => {
  const [data, setData] = useState<JobOpeningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listCareerOpeningsApi({});
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

  // ── Active jobs only ────────────────────────────────────────────────────────
  const activeJobs = data?.jobs?.filter((job) => job.isActive) ?? [];

  // ── Error state ─────────────────────────────────────────────────────────────
  if (!loading && error) {
    return (
      <section className="px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60 py-14 md:py-20 mx-auto bg-white">
        <div className="text-center py-16">
          <p className="text-red-500 text-[15px] font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#F26A23] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      id="job-openings"
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
        bg-white
      "
    >
      <div className="w-full">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div
          className="
            text-center
            mb-14
            md:mb-20
            px-2
            sm:px-4
            md:px-8
            lg:px-[120px]
          "
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="flex items-center justify-center text-[#F26A23] text-[11px] font-bold leading-none">
              <CircleQuestionMark className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
            </span>

            <p
              className="
                text-[#F26A23]
                tracking-[2px]
                sm:tracking-[3px]
                text-[14px]
                sm:text-[16px]
                md:text-[18px]
                font-semibold
                uppercase
              "
            >
              {loading ? "OPENINGS" : data?.badgeText ?? "OPENINGS"}
            </p>
          </div>

          {/* Heading */}
          <h2
            className="
              text-[30px]
              sm:text-[38px]
              md:text-[46px]
              lg:text-[56px]
              font-bold
              leading-tight
              text-black
              mb-4
            "
          >
            {loading ? (
              <>
                Current <span className="text-[#F26A23]">Job</span> Openings
              </>
            ) : (
              <>
                {data?.heading ?? "Current"}{" "}
                <span className="text-[#F26A23]">
                  {data?.headingHighlight ?? "Job"}
                </span>{" "}
                {data?.headingEnd ?? "Openings"}
              </>
            )}
          </h2>

          {/* Description */}
          <p
            className="
              text-[#979797]
              text-[14px]
              sm:text-[15px]
              md:text-[16px]
              leading-relaxed
              max-w-[600px]
              mx-auto
              font-normal
            "
          >
            {loading
              ? "Explore our latest career opportunities and become part of a trusted and professional security team."
              : (data?.description ?? "")}
          </p>
        </div>

        {/* ── Job Cards Grid ──────────────────────────────────────────────────── */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-6
            lg:gap-8
            justify-items-center
          "
        >
          {/* Loading skeletons */}
          {loading &&
            [1, 2, 3].map((i) => <SkeletonCard key={i} />)}

          {/* Actual job cards */}
          {!loading &&
            activeJobs.map((job, index) => (
              <div
                key={`${job.title}-${index}`}
                className="
                  group
                  w-full
                  max-w-[425px]
                  min-h-[477px]
                  rounded-[20px]
                  border border-gray-200
                  bg-white
                  pt-[41px]
                  pr-6 sm:pr-8 lg:pr-[49px]
                  pb-[41px]
                  pl-6 sm:pl-8 lg:pl-[49px]
                  flex flex-col
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-3
                  transition-all duration-300 ease-out
                "
              >
                {/* Job Title */}
                <h3
                  className="
                    text-[22px]
                    sm:text-[24px]
                    lg:text-[28px]
                    font-bold
                    text-gray-900
                    leading-tight
                    mb-4
                  "
                >
                  {job.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    font-normal
                    text-[14px]
                    md:text-[16px]
                    leading-[1.8]
                    mb-8
                  "
                >
                  {job.description}
                </p>

                {/* Requirements */}
                <ul className="space-y-4 mb-10 flex-1">
                  {job.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="
                        flex items-start gap-3
                        text-[14px]
                        md:text-[16px]
                        text-gray-700
                        leading-[1.7]
                      "
                    >
                      <span className="text-black font-bold mt-[2px]">•</span>
                      <span>{req.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="mt-auto">
                  <ApplyNow 
                    jobTitle={job.title} 
                    jobId={job._id}
                    buttonLabel={job.buttonText ?? "Apply Now"}
                    buttonClassName="w-[218px] h-[51px] rounded-[10px]"
                  />
                </div>
              </div>
            ))}

          {/* Empty state */}
          {!loading && !error && activeJobs.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-400 text-[15px]">
                No job openings available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobOpeningsSection;