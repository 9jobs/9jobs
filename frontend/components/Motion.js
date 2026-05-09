"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  fadeIn,
  fadeUp,
  hoverLift,
  hoverScale,
  popup,
  staggerContainer,
} from "../utils/animations";

const motionTags = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  section: motion.section,
  span: motion.span,
};

const fadeUpVariant = {
  initial: fadeUp.initial,
  whileInView: fadeUp.whileInView,
};

const staggerVariants = {
  initial: staggerContainer.initial,
  whileInView: staggerContainer.whileInView,
};

function MotionElement({ as = "div", animation, children, ...props }) {
  const Component = motionTags[as] || motion.div;
  return (
    <Component {...animation} {...props}>
      {children}
    </Component>
  );
}

export function FadeUp({ as = "div", children, ...props }) {
  return (
    <MotionElement as={as} animation={fadeUp} {...props}>
      {children}
    </MotionElement>
  );
}

export function FadeIn({ as = "div", children, ...props }) {
  return (
    <MotionElement as={as} animation={fadeIn} {...props}>
      {children}
    </MotionElement>
  );
}

export function Popup({ as = "div", children, hover = false, ...props }) {
  return (
    <MotionElement as={as} animation={popup} {...(hover ? hoverLift : {})} {...props}>
      {children}
    </MotionElement>
  );
}

export function Stagger({ as = "div", children, ...props }) {
  const Component = motionTags[as] || motion.div;
  return (
    <Component
      variants={staggerVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={staggerContainer.viewport}
      {...props}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = "div", children, hover = false, ...props }) {
  const Component = motionTags[as] || motion.div;
  return (
    <Component
      variants={fadeUpVariant}
      transition={fadeUp.transition}
      {...(hover ? hoverLift : {})}
      {...props}
    >
      {children}
    </Component>
  );
}

export function MotionButton({ children, ...props }) {
  return (
    <motion.button {...hoverScale} {...props}>
      {children}
    </motion.button>
  );
}

export { AnimatePresence, motion };
