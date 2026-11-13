"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export const APPLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  distance?: number;
}

export function FadeUp({
  children,
  delay = 0,
  distance = 16,
  className = "",
  ...rest
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.62, delay, ease: APPLE_EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  stagger = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: APPLE_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
