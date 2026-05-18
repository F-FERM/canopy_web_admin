"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Zap,
  Users,
  Target,
  BadgeDollarSign,
} from "lucide-react";

import Button from "@/app/components/ui/Button";
import FeatureCard from "./FeatureCard";

import {
  listContactLandingApi,
  createContactFormApi,
} from "@/app/api/ContactLanding";

// ─────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
    },
  },
});

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface FeatureCardItem {
  title: string;
  description: string;
  icon: string;
}

interface ContactData {
  featureCards: FeatureCardItem[];
}

// ─────────────────────────────────────────────────────────────
// Icon Map
// ─────────────────────────────────────────────────────────────

const iconMap: any = {
  Zap: <Zap size={22} strokeWidth={2.2} />,
  Users: <Users size={22} strokeWidth={2.2} />,
  Target: <Target size={22} strokeWidth={2.2} />,
  BadgeDollarSign: (
    <BadgeDollarSign size={22} strokeWidth={2.2} />
  ),
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function ContactFormSection() {
  const [data, setData] =
    useState<ContactData | null>(null);

  const [loading, setLoading] = useState(true);

  // ───────────────── FORM STATES ─────────────────

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] =
    useState(false);

  // ───────────────── FETCH API ─────────────────

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await listContactLandingApi({});

        setData(response?.[0] ?? null);
      } catch (error) {
        console.error(
          "Contact Form Feature API Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ───────────────── HANDLE INPUT ─────────────────

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ───────────────── HANDLE SUBMIT ─────────────────

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      console.log("Payload:", payload);

      // API CALL
      await createContactFormApi(payload);

      alert("Message sent successfully!");

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact Form Error:", error);

      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // ───────────────── Loading ─────────────────

  if (loading) {
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
        "
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="h-[700px] rounded-[14px] bg-gray-200 animate-pulse" />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[170px] rounded-[20px] bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        px-5
        sm:px-8
        md:px-14
        lg:px-20
        xl:px-40
        2xl:px-60

        py-14
        md:py-20

        mx-auto
      "
    >
      <div className="mx-auto max-w-[1400px]">
        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2

            gap-6
            lg:gap-8
          "
        >
          {/* ───────────────── LEFT FORM CARD ───────────────── */}

          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
              bg-white
              border border-[#E8E8E8]
              rounded-[14px]

              shadow-[0_4px_20px_rgba(0,0,0,0.03)]

              w-full

              px-5
              sm:px-7
              md:px-10
              lg:px-[42px]
              xl:px-[64px]

              py-8
              md:py-10
              xl:pt-[43px]
              xl:pb-[61px]

              min-h-auto
              xl:min-h-[728px]
            "
          >
            {/* TITLE */}

            <h2
              className="
                text-[26px]
                sm:text-[32px]
                md:text-[38px]
                xl:text-[42px]

                font-semibold
                leading-[110%]

                tracking-[-0.02em]

                text-[#111111]

                mb-8
                md:mb-10
              "
            >
              Send Message
            </h2>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 md:space-y-7"
            >
              {/* NAME */}

              <div>
                <label
                  className="
                    block
                    text-[16px]
                    md:text-[18px]

                    font-medium
                    text-[#111111]

                    mb-2
                    md:mb-3
                  "
                >
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name..."
                  required
                  className="
                    w-full

                    h-[56px]
                    md:h-[62px]

                    rounded-[10px]
                    border border-[#E3E3E3]

                    px-4
                    md:px-6

                    bg-white
                    outline-none

                    text-[15px]
                    md:text-[16px]

                    text-[#111111]

                    placeholder:text-[#C6C6C6]

                    focus:border-[#F26A23]

                    transition-all
                  "
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  className="
                    block
                    text-[16px]
                    md:text-[18px]

                    font-medium
                    text-[#111111]

                    mb-2
                    md:mb-3
                  "
                >
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                  className="
                    w-full

                    h-[56px]
                    md:h-[62px]

                    rounded-[10px]
                    border border-[#E3E3E3]

                    px-4
                    md:px-6

                    bg-white
                    outline-none

                    text-[15px]
                    md:text-[16px]

                    text-[#111111]

                    placeholder:text-[#C6C6C6]

                    focus:border-[#F26A23]

                    transition-all
                  "
                />
              </div>

              {/* SUBJECT */}

              <div>
                <label
                  className="
                    block
                    text-[16px]
                    md:text-[18px]

                    font-medium
                    text-[#111111]

                    mb-2
                    md:mb-3
                  "
                >
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Title..."
                  required
                  className="
                    w-full

                    h-[56px]
                    md:h-[62px]

                    rounded-[10px]
                    border border-[#E3E3E3]

                    px-4
                    md:px-6

                    bg-white
                    outline-none

                    text-[15px]
                    md:text-[16px]

                    text-[#111111]

                    placeholder:text-[#C6C6C6]

                    focus:border-[#F26A23]

                    transition-all
                  "
                />
              </div>

              {/* MESSAGE */}

              <div>
                <label
                  className="
                    block
                    text-[16px]
                    md:text-[18px]

                    font-medium
                    text-[#111111]

                    mb-2
                    md:mb-3
                  "
                >
                  Message
                </label>

                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type Here..."
                  required
                  className="
                    w-full

                    h-[140px]
                    md:h-[160px]

                    rounded-[10px]
                    border border-[#E3E3E3]

                    p-4
                    md:p-6

                    bg-white
                    outline-none
                    resize-none

                    text-[15px]
                    md:text-[16px]

                    text-[#111111]

                    placeholder:text-[#C6C6C6]

                    focus:border-[#F26A23]

                    transition-all
                  "
                />
              </div>

              {/* BUTTON */}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  label={
                    submitting
                      ? "Sending..."
                      : "Send Now"
                  }
                  variant="primary"
                  className="
                    w-full
                    sm:w-[220px]
                    md:w-[250px]

                    h-[56px]
                    md:h-[64px]

                    rounded-[10px]

                    bg-[#F26A23]
                    hover:bg-[#df5f1d]

                    text-white

                    text-[16px]
                    md:text-[18px]

                    font-semibold

                    transition-all
                    duration-300
                  "
                />
              </div>
            </form>
          </motion.div>

          {/* ───────────────── RIGHT FEATURE CARDS ───────────────── */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-1

              gap-5
              md:gap-7
            "
          >
            {data?.featureCards?.map((item, i) => (
              <FeatureCard
                key={i}
                icon={iconMap[item.icon]}
                title={item.title}
                description={item.description}
                delay={0.1 + i * 0.12}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}