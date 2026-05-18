"use client";

import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { isValidElement } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ButtonProps {
  label: string;
  href?: string;
  variant?: string;
  color?: string;
  showArrow?: boolean;
  icon?: LucideIcon;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Button({
  label,
  href,
  variant = "primary",
  color = "#F26A23",
  showArrow,
  icon: Icon,
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";
  const isGhost = variant === "ghost";

  const displayArrow = showArrow ?? (isPrimary || isGhost);

  // ── Shared base classes ──────────────────────────────────────────────────
  const base = `
    inline-flex items-center justify-center gap-[10px]
    w-[218px] h-[51px] px-[45px] py-[16px] rounded-[10px]
    text-[18px] font-medium
    transition-all duration-300 cursor-pointer
    select-none whitespace-nowrap
    disabled:opacity-50 disabled:pointer-events-none
    hover:-translate-y-1
  `;

  // ── Variant-specific inline styles & classes ─────────────────────────────
  const variantClass = isOutline
    ? "border border-black bg-transparent text-black hover:bg-black hover:text-white"
    : isGhost
      ? "text-white hover:shadow-lg bg-transparent border border-white rounded"
      : "text-white hover:shadow-lg";

  const inlineStyle =
    isPrimary && !disabled ? { backgroundColor: color } : undefined;

  // ── Inner content ────────────────────────────────────────────────────────
  const content = (
    <>
      {Icon && (
        isValidElement(Icon) ? Icon : <Icon size={20} className="shrink-0" />
      )}
      {label}
      {displayArrow && !Icon && <ArrowRight size={20} className="shrink-0" />}
    </>
  );

  const allClasses = `${base} ${variantClass} ${className}`.replace(/\s+/g, " ").trim();

  // ── Render as Link or button ─────────────────────────────────────────────
  if (href && !disabled) {
    return (
      <Link href={href} className={allClasses} style={inlineStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={allClasses}
      style={inlineStyle}
    >
      {content}
    </button>
  );
}