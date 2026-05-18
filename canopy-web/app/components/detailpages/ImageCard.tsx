"use client";

import Button from "@/app/components/ui/Button";
import HeroBg from "../../../public/images/blog/Blog1.png";
import Link from "next/link";

interface ImageCardProps {
  tag?: string;
  title?: string;
  highlight?: string;
  description?: string;
  backgroundImage?: any;
  buttonLabel?: string;
}

const ImageCard = ({
  tag = "A PROFESSIONAL SECURITY SERVICES",
  title = "Get In Touch With Our",
  highlight = "Security Experts",
  description = "Have questions? Let's build the right protection solution for your business, property, and people with our trusted security professionals.",
  backgroundImage = HeroBg,
  buttonLabel = "Get In Touch",
}: ImageCardProps) => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        px-4
        sm:px-6
        md:px-8
        lg:px-8

        py-6
        md:py-8
      "
    >
      {/* Main Container */}
      <div
        className="
          relative
          w-full
          max-w-[1760px]
          mx-auto

          h-[420px]
          sm:h-[520px]
          md:h-[620px]
          lg:h-[720px]

          rounded-[20px]
          overflow-hidden
        "
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-gray-800"
          style={
            (backgroundImage?.src || backgroundImage) 
              ? { backgroundImage: `url(${backgroundImage?.src || backgroundImage})` } 
              : undefined
          }
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Content Wrapper */}
        <div
          className="
            relative
            z-10

            flex
            items-center
            justify-center

            text-center

            h-full

            px-5
            sm:px-8
            md:px-14
            lg:px-24
            xl:px-[148px]

            py-10
            sm:py-14
            md:py-16
          "
        >
          {/* Content Box */}
          <div
            className="
              flex
              flex-col
              items-center

              gap-4
              sm:gap-5
              md:gap-6
              lg:gap-[22px]

              w-full
              max-w-[860px]
            "
          >
            {/* Tag */}
            <p
              className="
                flex items-center gap-2

                text-[13px]
                sm:text-[14px]
                md:text-[16px]

                font-semibold
                tracking-[0.14em]
                uppercase
                text-[#F26A23]
              "
            >
              {/* Person/profile icon — matches the ᴿ icon in the screenshot */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>

              <span>{tag}</span>
            </p>

            {/* Heading — line 1: orange word + white text, line 2: white */}
            <h2
              className="
                font-semibold
                leading-[1.15]

                text-[28px]
                sm:text-[38px]
                md:text-[48px]
                lg:text-[56px]
              "
            >
              {/* Line 1 */}
              <span className="text-[#F26A23]">{title} </span>
              <span className="text-white">{highlight}</span>
            </h2>

            {/* Description */}
            <p
              className="
                text-[#CDCDCD]

                text-[13px]
                sm:text-[14px]
                md:text-[16px]

                font-normal
                leading-[1.8]

                max-w-[680px]
              "
            >
              {description}
            </p>

            {/* Single centered CTA button — matches screenshot style */}
            <div className="pt-1 sm:pt-2">
              <Link href="/contact-us">
               <Button
                label={buttonLabel}
                variant="primary"
                className="rounded-full px-8"
                showArrow={true}
              />
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCard;