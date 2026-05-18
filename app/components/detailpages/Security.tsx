"use client";

import React from "react";
import Image from "next/image";

import guardImg from "../../../public/images/about/Excelence1.jpg"; // change path
import Button from "@/app/components/ui/Button";
import Link from "next/link";

interface SecurityImportanceProps {
  title?: string;
  highlight?: string;
  description?: string;
  image?: any;
}

const SecurityImportance = ({
  title = "Security Guard",
  highlight = "Importance",
  description = "How professional guards protect people, property, and businesses from modern security threats.",
  image = guardImg,
}: SecurityImportanceProps) => {
  return (
    <section className="px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60 py-14 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-[30px] sm:text-[36px] md:text-[44px] font-bold leading-tight text-black">
              {title}{" "}
              <span className="text-[#F26A23]">{highlight}</span>
            </h2>

            <p className="mt-4 text-[14px] md:text-[16px] text-[#6B6B6B] max-w-[520px]">
              {description}
            </p>

            <div className="mt-8">
              <Link href="/contact-us">
                <Button
                  label="Contact Us"
                  variant="primary"
                  className="w-[160px] h-[46px] rounded-full"
                />
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full">
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[420px] rounded-[18px] overflow-hidden bg-gray-200">
              {(image?.src || image) && (
                <Image
                  src={image?.src || image}
                  alt={title || "Security Image"}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecurityImportance;