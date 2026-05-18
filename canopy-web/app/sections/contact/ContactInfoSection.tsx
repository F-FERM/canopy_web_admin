"use client";

import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import cardBg from "../../../public/images/contact/Rectangle.png";
import { listContactLandingApi } from "@/app/api/ContactLanding";

interface ContactCard {
  title: string;
  icon: string;
  details: string[];
}

interface ContactInfoData {
  contactTitle: string;
  contactHighlight: string;
  contactCards: ContactCard[];
}

const iconMap: any = {
  Phone,
  Mail,
  MapPin,
};

const ContactInfoSection = () => {
  const [data, setData] = useState<ContactInfoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listContactLandingApi({});
        setData(response?.[0] ?? null);
      } catch (error) {
        console.error("Contact Info API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60 py-14 md:py-20 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 md:mb-20 animate-pulse">
            <div className="h-10 w-[320px] bg-gray-200 rounded mb-4" />
            <div className="h-10 w-[260px] bg-gray-200 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="relative w-full max-w-[420px] mx-auto h-[260px] rounded-[20px] bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="px-5 sm:px-8 md:px-14 lg:px-24 xl:px-40 2xl:px-60 py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-[1400px]">

        {/* Heading */}
        <div className="mb-14 md:mb-20">
          <h2 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] font-semibold leading-[1.7] tracking-[0.02em] text-[#111111]">
            <span className="text-black">{data.contactTitle}</span>
            <br />
            <span className="text-[#F26A21]">{data.contactHighlight}</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {data.contactCards?.map((contact, index) => {
            const Icon = iconMap[contact.icon] || Phone;

            return (
              <div
                key={index}
                className="relative w-full max-w-[420px] mx-auto h-[260px] min-h-[260px] bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${cardBg.src})` }}
              >

                {/* ICON */}
                <div className="absolute top-[-4px] right-[-19px] sm:top-[-6px] sm:right-[-15px] md:top-[-8px] md:right-[-18px]">
                  <div className="w-[92px] h-[92px] rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center shadow-md">
                    <div className="text-[#F26A21] scale-[1.4]">
                      <Icon size={30} strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="h-full flex flex-col justify-center px-8 sm:px-10 pt-10 pb-10">

                  {/* Title */}
                  <h3 className="text-[28px] sm:text-[32px] lg:text-[24px] font-semibold text-black mb-5">
                    {contact.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-1">

                    {contact.details?.map((detail, detailIndex) => (
                      <p
                        key={detailIndex}
                        title={detail}   // 👈 hover full text
                        className="
                          text-[14px]
                          sm:text-[15px]
                          leading-[28px]
                          text-[#4A4A4A]

                          overflow-hidden
                          text-ellipsis
                          whitespace-nowrap

                          max-w-full
                        "
                      >
                        {detail}
                      </p>
                    ))}

                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default ContactInfoSection;