"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Transition, Target, TargetAndTransition, VariantLabels } from "motion/react";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2200,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const splitText = useCallback(
      (text: string): string[] => {
        if (splitBy === "characters") {
          if (typeof Intl !== "undefined" && Intl.Segmenter) {
            return Array.from(new Intl.Segmenter().segment(text), (s) => s.segment);
          }
          return Array.from(text);
        }
        if (splitBy === "words") return text.split(" ");
        if (splitBy === "lines") return text.split("\n");
        return text.split(splitBy);
      },
      [splitBy]
    );

    const elements = useMemo(() => splitText(texts[currentIndex]), [texts, currentIndex, splitText]);

    const getStaggerDelay = useCallback(
      (idx: number, total: number): number => {
        if (staggerDuration === 0) return 0;
        if (staggerFrom === "first") return idx * staggerDuration;
        if (staggerFrom === "last") return (total - 1 - idx) * staggerDuration;
        if (staggerFrom === "center") return Math.abs(idx - Math.floor(total / 2)) * staggerDuration;
        if (staggerFrom === "random") return Math.random() * staggerDuration * total;
        if (typeof staggerFrom === "number") return Math.abs(idx - staggerFrom) * staggerDuration;
        return 0;
      },
      [staggerDuration, staggerFrom]
    );

    const next = useCallback(() => {
      const ni = loop ? (currentIndex + 1) % texts.length : Math.min(currentIndex + 1, texts.length - 1);
      setCurrentIndex(ni);
      onNext?.(ni);
    }, [currentIndex, texts.length, loop, onNext]);

    const previous = useCallback(() => {
      setCurrentIndex((i) => (loop ? (i - 1 + texts.length) % texts.length : Math.max(i - 1, 0)));
    }, [texts.length, loop]);

    const jumpTo = useCallback((index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, texts.length - 1)));
    }, [texts.length]);

    const reset = useCallback(() => setCurrentIndex(0), []);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }));

    useEffect(() => {
      if (!auto) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [auto, rotationInterval, next]);

    return (
      <motion.span
        className={cn("inline-flex overflow-hidden", mainClassName)}
        {...rest}
      >
        <span className="sr-only">{texts[currentIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentIndex}
            className={cn("inline-flex", splitLevelClassName)}
            aria-hidden
          >
            {elements.map((el, i) => (
              <motion.span
                key={i}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{
                  ...transition,
                  delay: getStaggerDelay(i, elements.length),
                } as Transition}
                className={cn("inline-block", elementLevelClassName)}
              >
                {el === " " ? "\u00A0" : el}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
