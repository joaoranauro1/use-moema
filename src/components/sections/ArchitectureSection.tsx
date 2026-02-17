"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { num: "01", title: "Ventilação cruzada", desc: "Circulação natural otimizada" },
  { num: "02", title: "Insolação planejada", desc: "Luz natural em cada unidade" },
  { num: "03", title: "Layout funcional", desc: "Zero desperdício de área" },
  { num: "04", title: "Eficiência estrutural", desc: "Engenharia a serviço do uso" },
];

const GRID_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80",
    alt: "Detalhe arquitetônico",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80",
    alt: "Interior luminoso",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=700&q=80",
    alt: "Fachada moderna",
  },
];

interface ArchitectureSectionProps {
  onInterestClick: () => void;
}

export function ArchitectureSection({ onInterestClick }: ArchitectureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const images = sectionRef.current.querySelectorAll(".arch-img");
      images.forEach((img, i) => {
        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.4,
            delay: i * 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const items = sectionRef.current.querySelectorAll(".feat-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: items[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-6">
            <p className="text-caption text-black/25 mb-6">Arquitetura</p>
            <h2 className="text-h1 text-black">
              Cada detalhe
              <br />
              <span className="text-black/25">importa.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end lg:justify-end">
            <p className="text-body text-black/40 max-w-sm text-right">
              Projetado por quem já viveu em compacto — decisões reais
              para qualidade de vida real.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 md:gap-4">
          <div className="arch-img col-span-12 md:col-span-8 relative aspect-[16/10] overflow-hidden group">
            <Image
              src={GRID_IMAGES[0].src}
              alt={GRID_IMAGES[0].alt}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          <div className="arch-img col-span-6 md:col-span-4 relative aspect-[3/4] overflow-hidden md:-mt-16 group">
            <Image
              src={GRID_IMAGES[1].src}
              alt={GRID_IMAGES[1].alt}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="arch-img col-span-6 md:col-start-4 md:col-span-6 relative aspect-[16/9] overflow-hidden md:-mt-24 group">
            <Image
              src={GRID_IMAGES[2].src}
              alt={GRID_IMAGES[2].alt}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 50vw"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-steel-10 mt-20 md:mt-28">
          {FEATURES.map((f) => (
            <div key={f.num} className="feat-item bg-white p-6 md:p-8">
              <span className="text-caption text-black/15 block mb-4">{f.num}</span>
              <h3 className="text-sm font-medium text-black mb-2">{f.title}</h3>
              <p className="text-xs text-black/35 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 flex justify-center">
          <button
            onClick={onInterestClick}
            className="border border-black px-10 py-3.5 text-xs font-medium tracking-[0.08em] uppercase text-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            Tenho Interesse
          </button>
        </div>
      </div>
    </section>
  );
}
