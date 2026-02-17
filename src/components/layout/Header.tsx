"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="relative h-6 w-[120px] block"
          >
            <Image
              src={scrolled ? "/logos/use-moema-preto.svg" : "/logos/use-moema-branco.svg"}
              alt="use.moema"
              fill
              className="object-contain object-left"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`hover-underline text-xs font-medium tracking-[0.08em] uppercase transition-colors duration-300 cursor-pointer ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick("#contato")}
              className={`hidden text-xs font-medium tracking-[0.08em] uppercase transition-colors duration-300 cursor-pointer lg:block ${
                scrolled
                  ? "border border-black px-6 py-2.5 text-black hover:bg-black hover:text-white"
                  : "border border-white/40 px-6 py-2.5 text-white hover:bg-white hover:text-black"
              }`}
            >
              Tenho interesse
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-60 flex h-6 w-6 flex-col items-center justify-center gap-1.5 lg:hidden cursor-pointer"
              aria-label="Menu"
            >
              <span
                className={`block h-[1px] w-5 transition-all duration-300 ${
                  menuOpen
                    ? "translate-y-[3.5px] rotate-45 bg-white"
                    : scrolled
                      ? "bg-black"
                      : "bg-white"
                }`}
              />
              <span
                className={`block h-[1px] w-5 transition-all duration-300 ${
                  menuOpen
                    ? "-translate-y-[3.5px] -rotate-45 bg-white"
                    : scrolled
                      ? "bg-black"
                      : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavClick={handleNavClick}
      />
    </>
  );
}
