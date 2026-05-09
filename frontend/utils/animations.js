/**
 * Premium Animation System Utility
 * Centralized spring-based motion variants for consistent UI/UX.
 */

export const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for premium feel
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 1, ease: "easeOut" },
  viewport: { once: true, margin: "-100px" },
};

export const fadeUp = {
  variants: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
  },
  initial: "initial",
  whileInView: "whileInView",
  transition: { ...spring, damping: 24 },
  viewport: { once: true, margin: "-50px" },
};

export const fadeDown = {
  initial: { opacity: 0, y: -40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { ...spring, damping: 24 },
  viewport: { once: true },
};

export const fadeLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  transition: { ...spring, damping: 24 },
  viewport: { once: true },
};

export const fadeRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  transition: { ...spring, damping: 24 },
  viewport: { once: true },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { ...spring, stiffness: 300, damping: 20 },
  viewport: { once: true },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { ...spring, damping: 26 },
  viewport: { once: true },
};

export const slideInRight = {
  initial: { opacity: 0, x: 80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { ...spring, damping: 26 },
  viewport: { once: true },
};

export const popup = {
  initial: { opacity: 0, scale: 0.5 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { ...spring, stiffness: 500, damping: 15 },
  viewport: { once: true },
};

export const hoverLift = {
  whileHover: { y: -8, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 14 },
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 14 },
};

export const staggerContainer = {
  variants: {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  },
  initial: "initial",
  whileInView: "whileInView",
  viewport: { once: true, margin: "-20px" },
};
