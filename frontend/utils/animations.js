export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const popup = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: "easeOut" }
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08
    }
  },
  viewport: { once: true, margin: "-80px" }
};

export const hoverScale = {
  whileHover: { scale: 1.02, y: -4 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const hoverLift = {
  whileHover: { y: -8, scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const magneticHover = {
  whileHover: { y: -2, x: 2 },
  transition: { type: "spring", stiffness: 400, damping: 10 }
};

export const floating = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
