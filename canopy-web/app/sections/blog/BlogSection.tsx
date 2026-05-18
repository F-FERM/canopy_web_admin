"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { listBlogSectionApi } from "@/app/api/HomeBlog";
import Image from "next/image";

interface Blog {
  title: string;
  shortDescription: string;
  content: string;
  image: string;
  buttonText: string;
  slug: string;
  isActive: boolean;
  publishedAt: string;
}

interface BlogSectionData {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  description: string;
  blogs: Blog[];
}

const BlogSection = () => {
  const [data, setData] = useState<BlogSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await listBlogSectionApi({});
        setData(data?.[0] ?? null);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const blogs = data?.blogs.filter((blog) => blog.isActive) ?? [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-orange-500 font-semibold text-sm md:text-xs tracking-widest mb-2 uppercase">
            {data?.badgeText ?? "BLOG"}
          </p>
          <h2 className="text-4xl md:text-3xl font-bold mb-4">
            <span className="text-gray-900">{data?.heading ?? "Latest"}</span>{" "}
            <span className="text-orange-500">{data?.headingHighlight ?? "Security Insights"}</span>
          </h2>
          <p className="text-gray-600 text-base md:text-xs max-w-2xl mx-auto">
            {data?.description ?? "Stay informed with the latest updates, security tips, and industry news from our experts."}
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post, index) => (
            <Link
              href={`/security-detail/${post.slug}`}
              key={index}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl md:text-lg font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-xs mb-6 leading-relaxed line-clamp-3">
                  {post.shortDescription}
                </p>

                {/* Read More Link */}
                <div
                  className="inline-flex items-center text-orange-500 font-semibold group-hover:text-orange-600 transition-colors"
                >
                  {post.buttonText || "Read More"} <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
