"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  fadeIn,
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
  slideInLeft,
  slideInRight,
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
  button: motion.button,
  form: motion.form,
  aside: motion.aside,
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

export function FadeDown({ as = "div", children, ...props }) {
  return (
    <MotionElement as={as} animation={fadeDown} {...props}>
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

export function FadeLeft({ as = "div", children, ...props }) {
  return (
    <MotionElement as={as} animation={fadeLeft} {...props}>
      {children}
    </MotionElement>
  );
}

export function FadeRight({ as = "div", children, ...props }) {
  return (
    <MotionElement as={as} animation={fadeRight} {...props}>
      {children}
    </MotionElement>
  );
}

export function ScaleIn({ as = "div", children, ...props }) {
  return (
    <MotionElement as={as} animation={scaleIn} {...props}>
      {children}
    </MotionElement>
  );
}

export function SlideIn({ as = "div", direction = "left", children, ...props }) {
  const animation = direction === "left" ? slideInLeft : slideInRight;
  return (
    <MotionElement as={as} animation={animation} {...props}>
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
      variants={staggerContainer.variants}
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
      variants={fadeUp.variants}
      transition={fadeUp.transition}
      {...(hover === "lift" ? hoverLift : hover === "scale" ? hoverScale : {})}
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
