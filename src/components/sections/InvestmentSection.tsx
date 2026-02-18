"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Counter } from "@/components/ui/Counter";

gsap.registerPlugin(ScrollTrigger);

export function InvestmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prices = sectionRef.current.querySelectorAll(".price-block");
      gsap.fromTo(
        prices,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: prices[0],
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="investimento"
      className="relative bg-black text-white overflow-hidden noise-strong"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(188,191,204,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(188,191,204,0.05)_0%,_transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-40">
        <div className="grid lg:grid-cols-12 gap-8 mb-20 md:mb-32">
          <div className="lg:col-span-7">
            <p className="text-caption text-white/25 mb-6">Investimento</p>
            <h2 className="text-h1 text-white">
              Investidor ganha
              <br />
              <span className="text-white/30">na compra.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <p className="text-body text-white/35 max-w-sm">
              Quando o preço de entrada é inteligente, o investimento já nasce
              saudável. Sem depender de promessas de valorização.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="price-block border border-white/8 p-10 md:p-16">
            <p className="text-caption text-white/30 mb-8">use.moema</p>
            <div className="flex items-end gap-2">
              <span className="text-caption text-white/40 self-start mt-3">R$</span>
              <Counter end={14600} separator="." className="text-mega text-white" />
            </div>
            <p className="text-caption text-white/20 mt-4">por m²</p>
          </div>
          <div className="price-block border border-white/8 border-l-0 md:border-l-0 border-t-0 md:border-t p-10 md:p-16 bg-white/[0.02]">
            <p className="text-caption text-white/20 mb-8">Média de mercado</p>
            <div className="flex items-end gap-2">
              <span className="text-caption text-white/15 self-start mt-3">R$</span>
              <Counter end={20400} separator="." className="text-mega text-white/15" />
            </div>
            <p className="text-caption text-white/10 mt-4">por m²</p>
          </div>
        </div>
      </div>
    </section>
  );
}
