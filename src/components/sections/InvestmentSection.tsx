"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { Counter } from "@/components/ui/Counter";

gsap.registerPlugin(ScrollTrigger);

const PAYMENT_FLOW = [
  { label: "Sinal", value: "7%", detail: "1 parcela" },
  { label: "Complemento", value: "4,5%", detail: "3 parcelas" },
  { label: "Mensal", value: "2,9%", detail: "19 parcelas" },
  { label: "Intermediárias", value: "6%", detail: "4 parcelas" },
];

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

      const rows = sectionRef.current.querySelectorAll(".pay-row");
      gsap.fromTo(
        rows,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.07,
          duration: 0.6,
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

        <div className="grid md:grid-cols-2 gap-0 mb-24 md:mb-32">
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

        <motion.div
          className="text-center mb-24 md:mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-caption text-white/40 mb-6">TIR Estimada</p>
          <p className="text-h1 text-white tracking-tighter">
            32 <span className="text-white/40">a</span> 44<span className="text-h3 text-white/50 ml-2">% a.a.</span>
          </p>
          <div className="rule-dark mt-8 mx-auto max-w-xs" />
          <p className="text-xs text-white/30 mt-6 max-w-md mx-auto">
            Estimativa por cenário. Resultados passados não garantem performance futura.
          </p>
        </motion.div>

        <div>
          <p className="text-caption text-white/20 mb-10">Fluxo de pagamento</p>
          {PAYMENT_FLOW.map((item) => (
            <div
              key={item.label}
              className="pay-row flex items-center justify-between border-t border-white/6 py-5 md:py-6"
            >
              <span className="text-sm font-light text-white/60">{item.label}</span>
              <div className="flex items-center gap-8">
                <span className="text-caption text-white/20 hidden md:block">{item.detail}</span>
                <span className="text-h2 text-white font-extralight w-20 text-right tabular-nums">{item.value}</span>
              </div>
            </div>
          ))}
          <div className="border-t border-white/6" />
        </div>
      </div>
    </section>
  );
}
