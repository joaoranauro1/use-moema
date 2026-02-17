"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DISTANCES, ADDRESS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

interface LocationSectionProps {
  onInterestClick: () => void;
}

export function LocationSection({ onInterestClick }: LocationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const items = sectionRef.current.querySelectorAll(".dist-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: items[0],
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      const idh = sectionRef.current.querySelector(".idh-num");
      if (idh) {
        gsap.fromTo(
          idh,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: idh,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="localizacao" className="relative bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-20 md:py-32">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <p className="text-caption text-black/25 mb-6">Localização</p>
            <h2 className="text-h1 text-black mb-8">Moema.</h2>
            <div className="idh-num mb-8">
              <p className="text-caption text-black/25 mb-3">IDH do bairro</p>
              <div className="flex items-baseline">
                <span className="text-mega text-black leading-none">0</span>
                <span className="text-h1 text-black/15 mx-0.5">,</span>
                <span className="text-mega text-black leading-none">962</span>
              </div>
              <p className="text-xs text-black/30 mt-3">Um dos mais altos de São Paulo</p>
            </div>
            <div className="rule mb-8" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-caption text-black/25 mb-1">Entrega</p>
                <p className="text-h3 text-black font-light">Dez/2027</p>
              </div>
              <div>
                <p className="text-caption text-black/25 mb-1">Perfil</p>
                <p className="text-h3 text-black font-light">100% R2V</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-12 lg:border-l lg:border-steel-10">
            <p className="text-caption text-black/25 mb-10">Distâncias</p>
            {DISTANCES.map((d, i) => (
              <div
                key={d.label}
                className="dist-item flex items-center justify-between border-b border-steel-10 py-6 md:py-8"
              >
                <div className="flex items-center gap-4">
                  <span className="text-caption text-black/15">0{i + 1}</span>
                  <span className="text-body text-black/60">{d.label}</span>
                </div>
                <span className="text-h2 text-black font-extralight tabular-nums">{d.value}</span>
              </div>
            ))}
            <p className="text-xs text-black/25 mt-8">
              Demanda estrutural sustentada por compactos bem localizados.
            </p>
            <div className="mt-12 flex justify-center lg:justify-start">
              <button
                onClick={onInterestClick}
                className="border border-black px-10 py-3.5 text-xs font-medium tracking-[0.08em] uppercase text-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Tenho Interesse
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
