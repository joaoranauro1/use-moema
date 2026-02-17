"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const TYPOLOGIES = [
  { type: "Studio", area: "20", unit: "m²" },
  { type: "Studio Plus", area: "28", unit: "m²" },
  { type: "Compacto", area: "38", unit: "m²" },
  { type: "Compacto Plus", area: "56", unit: "m²" },
];

export function ResidencesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Image clip reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(15% 15% 15% 15%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      }

      // Typology rows stagger
      const rows = sectionRef.current.querySelectorAll(".typo-row");
      gsap.fromTo(
        rows,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rows[0],
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="residencias" className="relative bg-white">
      {/* Full-bleed image with clip-path reveal */}
      <div
        ref={imageRef}
        className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden"
      >
        <Image
          src="/images/residences/fachada.webp"
          alt="Interior residência use.moema"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left — Statement */}
          <div className="lg:col-span-5">
            <p className="text-caption text-black/30 mb-6">Residências</p>
            <h2 className="text-h1 text-black">
              De 20 a 56 m².
              <br />
              <span className="text-black/25">Cada um com propósito.</span>
            </h2>
            <p className="text-body text-black/45 mt-8 max-w-sm">
              Quatro tipologias pensadas para quem vive de verdade em espaços
              compactos. Sem desperdício, sem concessão.
            </p>
            <p className="text-caption text-black/20 mt-8">
              100% R2V — Perfil exclusivamente residencial
            </p>
          </div>

          {/* Right — Typology list, editorial style */}
          <div className="lg:col-span-7 lg:pt-4">
            {TYPOLOGIES.map((t, i) => (
              <motion.div
                key={t.type}
                className="typo-row group flex items-baseline justify-between border-t border-steel-10 py-6 md:py-8 cursor-default"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-caption text-black/20 w-6">
                    0{i + 1}
                  </span>
                  <h3 className="text-h3 text-black font-normal">{t.type}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-h1 text-black font-extralight">
                    {t.area}
                  </span>
                  <span className="text-caption text-black/30">{t.unit}</span>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-steel-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
