"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "lines" | "words";
}

export function RevealText({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  splitBy = "lines",
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll(".reveal-item");
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const parts =
    splitBy === "lines" ? children.split("\n") : children.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {parts.map((part, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="reveal-item inline-block">
              {part}
              {splitBy === "words" && i < parts.length - 1 ? "\u00A0" : ""}
            </span>
            {splitBy === "lines" && i < parts.length - 1 ? <br /> : null}
          </span>
        ))}
      </Tag>
    </div>
  );
}
