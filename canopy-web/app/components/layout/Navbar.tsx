"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../public/images/logo.png";

const navItems = [
  "Home",
  "About Us",
  "Services",
  "Career",
  "Blog",
  "Events",
  "Contact Us",
];

function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  // Active menu sync
  useEffect(() => {
    const currentPath =
      pathname === "/" ? "Home" : pathname.slice(1).replace(/-/g, " ");

    const matchedItem = navItems.find(
      (item) => item.toLowerCase() === currentPath.toLowerCase()
    );

    if (matchedItem) {
      setActiveItem(matchedItem);
    } else if (pathname === "/") {
      setActiveItem("Home");
    }
  }, [pathname]);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on large desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 w-full bg-white border-b border-gray-200
        transition-shadow duration-300
        ${scrolled ? "shadow-md" : ""}
      `}
    >
      <div
        className="
          max-w-[1920px]
          mx-auto
          h-[80px] sm:h-[100px] lg:h-[120px]
          px-4 sm:px-6 lg:px-[100px]
          flex items-center justify-between
        "
      >
        {/* LOGO */}
        <div className="shrink-0 flex items-center">
          <div className="h-[56px] sm:h-[75px] lg:h-[95px] flex items-center">
            <Image
              src={logo}
              alt="Canopy Security Services"
              priority
              className="h-full w-auto object-contain"
            />
          </div>
        </div>

        {/* LARGE DESKTOP NAV ONLY */}
        <nav
          className="
            hidden 2xl:flex
            flex-1
            max-w-[977px]
            h-[55px]
            bg-[#7F220E]
            rounded-[40px]
            items-center justify-between
            px-[24px]
          "
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(/\s+/g, "-")}`
              }
              onClick={() => setActiveItem(item)}
              className={`
                text-white
                text-[16px]
                2xl:text-[18px]
                font-medium
                px-4 2xl:px-6
                py-2
                rounded-full
                whitespace-nowrap
                transition-all duration-300
                ${
                  activeItem === item
                    ? "bg-secondary text-black"
                    : "hover:bg-secondary hover:text-black"
                }
              `}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* LARGE DESKTOP CTA */}
        <div className="hidden 2xl:flex shrink-0 ml-4">
          <button
            className="
              w-[160px]
              h-[55px]
              rounded-[40px]
              bg-secondary
              text-white
              text-[18px]
              font-semibold
              transition-all duration-300
              hover:scale-105
              hover:shadow-lg
              hover:bg-[#d55a1d]
              active:scale-95
              whitespace-nowrap
            "
          >
            Get A Quote
          </button>
        </div>

        {/* MOBILE + TABLET + MACBOOK */}
        <div className="flex 2xl:hidden items-center">
          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            className="
              bg-[#7F220E]
              text-white
              w-[44px]
              h-[44px]
              rounded-xl
              flex flex-col items-center justify-center
              gap-[5px]
              transition-all duration-300
              hover:bg-[#6b1d0c]
              active:scale-95
            "
          >
            <span
              className={`
                block w-[22px] h-[2px]
                bg-white rounded-full
                transition-all duration-300
                ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}
              `}
            />

            <span
              className={`
                block w-[22px] h-[2px]
                bg-white rounded-full
                transition-all duration-300
                ${menuOpen ? "opacity-0" : ""}
              `}
            />

            <span
              className={`
                block w-[22px] h-[2px]
                bg-white rounded-full
                transition-all duration-300
                ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}
              `}
            />
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET / MACBOOK MENU */}
      <div
        className={`
          2xl:hidden
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${
            menuOpen
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <nav
          className="
            bg-[#7F220E]
            px-4
            pt-2
            pb-4
            flex flex-col gap-1
          "
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(/\s+/g, "-")}`
              }
              onClick={() => {
                setActiveItem(item);
                setMenuOpen(false);
              }}
              className={`
                text-white
                text-[16px]
                font-medium
                px-5 py-3
                rounded-xl
                transition-all duration-200
                ${
                  activeItem === item
                    ? "bg-secondary text-black"
                    : "hover:bg-white/10"
                }
              `}
            >
              {item}
            </Link>
          ))}

          {/* CTA BUTTON */}
          <button
            className="
              mt-3
              w-full
              h-[48px]
              rounded-xl
              bg-secondary
              text-white
              text-[16px]
              font-semibold
              transition-all duration-300
              hover:bg-[#d55a1d]
              active:scale-95
            "
          >
            Get A Quote
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;