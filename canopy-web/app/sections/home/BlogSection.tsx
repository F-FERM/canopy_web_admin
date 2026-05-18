"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { listBlogSectionApi } from "@/app/api/HomeBlog";
import BadgeIcon from "../../../public/images/home/Vector (1).png";
// ── API types ──────────────────────────────────────────────────────────────
interface BlogDetailPage {
  heroSection: {
    heading: string;
    headingHighlight: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
  };
  importanceSection: {
    heading: string;
    headingHighlight: string;
    description: string;
    leftFeatures: { text: string }[];
    rightFeatures: { text: string }[];
  };
}

interface Blog {
  title: string;
  shortDescription: string;
  content: string;
  image: string;
  buttonText: string;
  slug: string;
  isActive: boolean;
  publishedAt: string;
  detailPage?: BlogDetailPage;
}

interface BlogSectionData {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  description: string;
  blogs: Blog[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ── Skeleton card ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-gray-100 border border-gray-200 max-w-[500px] mx-auto md:max-w-none md:mx-0 animate-pulse">
      <div className="h-[200px] sm:h-[220px] md:h-[230px] lg:h-[240px] w-full bg-gray-300" />
      <div className="p-6 sm:p-7 md:p-8 lg:p-10 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="h-4 bg-gray-300 rounded w-1/3 mt-6" />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function BlogSection() {
  const [data, setData] = useState<BlogSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch API data ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listBlogSectionApi({});
        console.log(data, "herodata");
        setData(data?.[0] ?? null);
      } catch (error) {
        console.error("HeroSection API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  // Only active blogs
  const blogs = data?.blogs.filter((blog) => blog.isActive) ?? [];

  return (
    <section
      id="blog-posts"
      className="relative overflow-hidden pt-10 sm:pt-14 md:pt-16 lg:pt-20 xl:pt-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-40 pb-10 sm:pb-14 md:pb-16 lg:pb-20 xl:pb-20"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto">
        {/* ── SECTION HEADER ────────────────────────────────────────────── */}
        <div className="text-center mb-8 sm:mb-12 md:mb-14 lg:mb-18 xl:mb-20 px-0 sm:px-2 md:px-6 lg:px-16 xl:px-[120px]">
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-3 md:mb-4 xl:mb-4">
            <span className="flex items-center justify-center w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[21px] md:h-[21px] xl:w-[22px] xl:h-[22px]  text-[#F26A23] text-[9px] sm:text-[10px] md:text-[10.5px] xl:text-[11px] font-bold leading-none">
              <Image
                src={BadgeIcon}
                alt="Badge Icon"
                className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] object-contain"
              />
            </span>
            <p className="text-[#F26A23] uppercase tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] xl:tracking-[3px] text-[11px] sm:text-[12px] md:text-[13px] xl:text-sm font-semibold">
              {loading ? (
                <span className="inline-block w-16 sm:w-20 h-3 bg-orange-300/30 rounded animate-pulse" />
              ) : (
                (data?.badgeText ?? "BLOG")
              )}
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] font-bold leading-tight text-black mb-2 sm:mb-3 md:mb-3 xl:mb-4">
            {loading ? (
              <span className="inline-block w-48 sm:w-64 h-8 sm:h-10 bg-gray-200 rounded animate-pulse" />
            ) : (
              <>
                {data?.heading ?? "Latest"}{" "}
                <span className="text-[#F26A23]">
                  {data?.headingHighlight ?? "Security Insights"}
                </span>
              </>
            )}
          </h2>

          {/* Description */}
          <p className="text-[#979797] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[15.5px] xl:text-[16px] leading-relaxed max-w-[100%] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[580px] xl:max-w-[600px] mx-auto px-2 sm:px-4">
            {loading ? (
              <span className="inline-block w-72 sm:w-80 h-4 sm:h-5 bg-[#D4D4D4] rounded animate-pulse" />
            ) : (
              (data?.description ??
              "Stay informed with the latest updates, security tips, and industry news from our experts.")
            )}
          </p>

          {error && <p className="mt-3 text-sm text-red-500">⚠ {error}</p>}
        </div>

        {/* ── BLOG CARDS GRID ───────────────────────────────────────────── */}
        <div className="px-0 sm:px-2 md:px-6 lg:px-16 xl:px-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 w-full">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : blogs.map((blog, index) => (
                  <Link
                    key={index}
                    href={`/security-detail/${blog.slug}`}
                    className="
                      group
                      flex
                      flex-col
                      overflow-hidden
                      rounded-xl
                      bg-white
                      border
                      border-gray-200
                      transition-all
                      duration-300
                      hover:shadow-xl
                      cursor-pointer
                      max-w-[500px]
                      mx-auto
                      md:max-w-none
                      md:mx-0
                    "
                  >
                    {/* IMAGE CONTAINER */}
                    <div className="relative h-[180px] sm:h-[200px] md:h-[220px] lg:h-[230px] xl:h-[240px] w-full overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-7 lg:p-9 xl:p-10 gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4">
                      {/* TITLE */}
                      <h3 className="text-[17px] sm:text-[18px] md:text-[19px] lg:text-[19.5px] xl:text-[20px] font-semibold text-black leading-tight transition-colors duration-300">
                        {blog.title}
                      </h3>

                      {/* EXCERPT */}
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[15.5px] xl:text-[20px] leading-[1.5] sm:leading-[1.53] md:leading-[1.56] lg:leading-[1.58] xl:leading-[1.6] text-[#D4D4D4] flex-1 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8">
                        {blog.shortDescription}
                      </p>

                      {/* READ MORE LINK */}
                      <div className="flex items-center gap-2 text-[#F26A23] font-semibold text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] group-hover:gap-3 transition-all duration-300">
                        <span>{blog.buttonText || "Read More"}</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
