"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Staggered line reveals with clip
      const lines = sectionRef.current.querySelectorAll(".m-line");
      gsap.fromTo(
        lines,
        { yPercent: 120, opacity: 0, rotateX: 40 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // The accent line grows
      const accent = sectionRef.current.querySelector(".m-accent");
      if (accent) {
        gsap.fromTo(
          accent,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            delay: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Body text fades in
      const body = sectionRef.current.querySelector(".m-body");
      if (body) {
        gsap.fromTo(
          body,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
    >
      {/* Subtle diagonal line accent */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-steel-20 to-transparent" />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-32 md:px-12 md:py-0">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left — Large statement */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden perspective-[800px]">
              <h2 className="m-line text-h1 text-black">O futuro é compacto.</h2>
            </div>
            <div className="overflow-hidden perspective-[800px] mt-2">
              <h2 className="m-line text-h1 text-black/30">
                Mas compacto não precisa
              </h2>
            </div>
            <div className="overflow-hidden perspective-[800px] mt-2">
              <h2 className="m-line text-h1 text-black">significar aperto.</h2>
            </div>

            {/* Accent line */}
            <div className="m-accent mt-10 h-px w-24 bg-black origin-left" />

            {/* Body */}
            <p className="m-body mt-8 text-body text-black/50 max-w-md leading-relaxed">
              Projetado por quem já morou em compacto. Cada decisão — ventilação,
              insolação, layout — nasce de experiência real, não de suposição.
            </p>
          </div>

          {/* Right — Vertical stat accent */}
          <div className="lg:col-span-4 lg:border-l lg:border-steel-10 lg:pl-12">
            <div className="space-y-12">
              <div>
                <p className="text-caption text-black/30 mb-3">Prédio boutique</p>
                <p className="text-mega text-black">53</p>
                <p className="text-caption text-black/40 mt-2">unidades</p>
              </div>
              <div className="rule" />
              <div>
                <p className="text-caption text-black/30 mb-3">Entrega</p>
                <p className="text-h1 text-black font-extralight tracking-tight">
                  Dez 2027
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
