"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { listFooterApi } from "@/app/api/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialLink {
  platform: string;
  icon: string;
  link: string;
}

interface NavLink {
  label: string;
  link: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface FooterData {
  logo: string;
  companyName: string;
  description: string;
  socialLinks: SocialLink[];
  companyLinks: NavLink[];
  serviceLinks: NavLink[];
  contactInfo: ContactInfo;
  bottomLinks: NavLink[];
  copyrightText: string;
}

// ─── Social Icon Map ──────────────────────────────────────────────────────────

const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  Facebook: IconBrandFacebook,
  Twitter: IconBrandTwitter,
  Instagram: IconBrandInstagram,
  Linkedin: IconBrandLinkedin,
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function FooterSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 pb-14">
      <div>
        <div className="w-48 h-14 bg-white/10 rounded mb-8" />
        <div className="space-y-3">
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-5/6" />
          <div className="h-4 bg-white/10 rounded w-4/6" />
        </div>
        <div className="flex gap-4 mt-10">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-7 h-7 rounded-full bg-white/10" />
          ))}
        </div>
      </div>
      <div>
        <div className="h-6 bg-white/10 rounded w-24 mb-8" />
        <div className="space-y-5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-white/10 rounded w-3/4" />
          ))}
        </div>
      </div>
      <div>
        <div className="h-6 bg-white/10 rounded w-24 mb-8" />
        <div className="space-y-5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-white/10 rounded w-5/6" />
          ))}
        </div>
      </div>
      <div className="space-y-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-5">
            <div className="w-[52px] h-[52px] rounded-xl bg-white/10 shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 bg-white/10 rounded w-16" />
              <div className="h-4 bg-white/10 rounded w-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Footer() {
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await listFooterApi({});
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

  return (
    <footer className="w-full bg-[#1A0004] text-white overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-[70px] pt-16 pb-6">

        {loading && <FooterSkeleton />}

        {!loading && error && (
          <p className="text-red-400 text-sm pb-14">{error}</p>
        )}

        {!loading && data && (
          <>
            {/* TOP GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr] gap-14 pb-14">

              {/* LOGO + DESCRIPTION */}
              <div>
                <div className="mb-8">
                  <Image
                    src={data.logo}
                    alt={data.companyName}
                    width={320}
                    height={80}
                    className="w-[320px] h-auto object-contain"
                    priority
                  />
                </div>

                <p className="text-[#C8B8B8] text-[16px] leading-[32px] max-w-[420px]">
                  {data.description}
                </p>

                {/* SOCIAL LINKS */}
                <div className="flex items-center gap-5 mt-10">
                  {data.socialLinks.map((social) => {
                    const Icon = SOCIAL_ICON_MAP[social.icon];
                    if (!Icon) return null;
                    return (
                      <Link
                        key={social.platform}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="text-[#F26A23] hover:text-white transition-all duration-300"
                      >
                        <Icon stroke={1.7} className="w-[26px] h-[26px]" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* COMPANY LINKS */}
              <div>
                <h3 className="text-white text-[22px] font-semibold mb-8">
                  Company
                </h3>
                <ul className="space-y-5">
                  {data.companyLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.link}
                        className="text-[#C8B8B8] text-[18px] hover:text-[#F26A23] transition-all duration-300 flex items-center gap-3 hover:translate-x-1.5"
                      >
                        <span className="text-white text-[10px]">•</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SERVICE LINKS */}
              <div>
                <h3 className="text-white text-[22px] font-semibold mb-8">
                  Services
                </h3>
                <ul className="space-y-5">
                  {data.serviceLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.link}
                        className="text-[#C8B8B8] text-[18px] hover:text-[#F26A23] transition-colors duration-300 flex items-center gap-3"
                      >
                        <span className="text-white text-[10px]">•</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CONTACT */}
              <div className="space-y-8">
                {/* PHONE */}
                <div className="flex items-start gap-5">
                  <div className="w-[52px] h-[52px] rounded-xl border border-[#7F220E] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#F26A23]" />
                  </div>
                  <div>
                    <p className="text-[#B9A7A7] text-[15px] mb-1">Phone</p>
                    <a
                      href={`tel:${data.contactInfo.phone.replace(/\s/g, "")}`}
                      className="text-white text-[18px] leading-relaxed hover:text-[#F26A23] transition-colors"
                    >
                      {data.contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-5">
                  <div className="w-[52px] h-[52px] rounded-xl border border-[#7F220E] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#F26A23]" />
                  </div>
                  <div>
                    <p className="text-[#B9A7A7] text-[15px] mb-1">Email</p>
                    <a
                      href={`mailto:${data.contactInfo.email}`}
                      className="text-white text-[18px] leading-relaxed hover:text-[#F26A23] transition-colors"
                    >
                      {data.contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="flex items-start gap-5">
                  <div className="w-[52px] h-[52px] rounded-xl border border-[#7F220E] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#F26A23]" />
                  </div>
                  <div>
                    <p className="text-[#B9A7A7] text-[15px] mb-1">Address</p>
                    <p className="text-white text-[18px] leading-[34px] max-w-[300px]">
                      {data.contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-[#6A4A4A] pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                <p className="text-[#C8B8B8] text-[15px]">
                  {data.copyrightText}
                </p>
                <div className="flex items-center gap-8">
                  {data.bottomLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.link}
                      className="text-[#C8B8B8] text-[15px] hover:text-[#F26A23] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </footer>
  );
}