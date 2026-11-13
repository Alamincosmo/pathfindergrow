"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export default function BrandLogo({ size = "md", showTagline = true }: BrandLogoProps) {
  const boxSize =
    size === "sm" ? "size-9 rounded-xl" : size === "lg" ? "size-11 rounded-2xl" : "size-10 rounded-xl";

  return (
    <motion.a
      href="#"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
      className="inline-flex items-center gap-3 group focus:outline-none"
    >
      <div
        className={`relative ${boxSize} bg-[#F4FBFB] border border-slate-900/10 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.08)] overflow-hidden flex items-center justify-center shrink-0 transition-shadow duration-300 group-hover:border-[#23AB82]/40 group-hover:shadow-[0_6px_16px_-4px_rgba(35,171,130,0.22)]`}
      >
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.06, y: -1 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
        >
          <Image
            src="/logo.webp"
            alt="Pathfinder Grow Logo"
            fill
            sizes="48px"
            className="object-cover mix-blend-multiply p-1"
            priority
          />
        </motion.div>
      </div>

      <div className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-bold tracking-[-0.02em] text-[#0F172A] flex items-center gap-0.5">
          Pathfinder
          <span className="text-[#158060]">Grow</span>
        </span>
        {showTagline && (
          <span className="text-[10.5px] font-medium tracking-[0.04em] uppercase text-[#64748B] mt-1">
            Digital Growth Studio
          </span>
        )}
      </div>
    </motion.a>
  );
}
