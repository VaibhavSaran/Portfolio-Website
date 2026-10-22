"use client";
import { useEffect, useRef } from "react";

/** Matching opening views join a native scroll cycle in both directions. */
export default function ScrollLoop({
  children,
}: {
  children: React.ReactNode;
}) {
  const bridge = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = bridge.current;
    if (!element) return;
    element.inert = true;
    let wrapping = false,
      frame = 0,
      cycles = 0,
      intent = 0,
      intentAt = 0,
      touchY = 0,
      touchReverse = false,
      touchBoundary = 0;
    const eligible = (target: EventTarget | null) =>
      !(
        target instanceof Element &&
        target.closest(
          'input,textarea,select,[contenteditable="true"],.chat-panel',
        )
      );
    const boundary = () =>
      element.getBoundingClientRect().top +
      scrollY -
      (parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ),
      ) || 82);
    const move = (target: number, direction: "forward" | "reverse") => {
      if (wrapping) return;
      wrapping = true;
      intent = 0;
      window.scrollTo({ top: Math.max(0, target), behavior: "instant" });
      element.dataset.cycles = String(++cycles);
      element.dataset.direction = direction;
      document.documentElement.dataset.scrollLoop = direction;
      window.dispatchEvent(new Event("scroll"));
      frame = requestAnimationFrame(() => {
        wrapping = false;
      });
    };
    const onScroll = () => {
      if (wrapping) return;
      const end = boundary();
      if (end < innerHeight) return;
      if (scrollY >= end) move(scrollY - end, "forward");
      else if (scrollY <= 0 && intent < 0 && performance.now() - intentAt < 300)
        move(end - 2, "reverse");
    };
    const wheel = (event: WheelEvent) => {
      if (
        !eligible(event.target) ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      intent = Math.sign(event.deltaY);
      intentAt = performance.now();
      if (scrollY <= 1 && event.deltaY < 0 && !wrapping) {
        const pixels =
          Math.abs(event.deltaY) *
          (event.deltaMode === 1
            ? 16
            : event.deltaMode === 2
              ? innerHeight
              : 1);
        event.preventDefault();
        move(boundary() - Math.max(2, pixels), "reverse");
      }
    };
    const touchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
      touchReverse = false;
    };
    const touchMove = (event: TouchEvent) => {
      if (!eligible(event.target) || !event.touches[0]) return;
      const delta = touchY - event.touches[0].clientY;
      intent = Math.sign(delta);
      intentAt = performance.now();
      if (!touchReverse && scrollY <= 1 && delta < -6) {
        touchReverse = true;
        touchBoundary = boundary();
      }
      if (touchReverse) {
        event.preventDefault();
        if (!wrapping) move(touchBoundary + Math.min(-2, delta), "reverse");
      }
    };
    const touchEnd = () => {
      touchReverse = false;
      intent = 0;
    };
    const key = (event: KeyboardEvent) => {
      if (!eligible(event.target)) return;
      const up =
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey);
      if (!up) {
        intent = 0;
        return;
      }
      if (event.target instanceof Element && event.target.closest("button"))
        return;
      intent = -1;
      intentAt = performance.now();
      if (scrollY <= 1 && !wrapping) {
        event.preventDefault();
        move(
          boundary() - (event.key === "ArrowUp" ? 48 : innerHeight * 0.85),
          "reverse",
        );
      }
    };
    const clearIntent = () => {
      intent = 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("touchend", touchEnd, { passive: true });
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", clearIntent, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
      window.removeEventListener("keydown", key);
      window.removeEventListener("pointerdown", clearIntent);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div ref={bridge} className="hero-journey loop-bridge" aria-hidden="true">
      {children}
    </div>
  );
}
