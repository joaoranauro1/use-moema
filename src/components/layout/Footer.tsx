import Image from "next/image";
import { NAV_ITEMS, LEGAL_TEXT, ADDRESS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative bg-black text-white noise-strong overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,_rgba(188,191,204,0.04)_0%,_transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        {/* Top row — brand + nav */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <div className="relative h-5 w-[110px]">
              <Image
                src="/logos/use-moema-branco.svg"
                alt="use.moema"
                fill
                className="object-contain object-left opacity-80"
              />
            </div>
            <p className="text-xs font-light text-white/25 mt-4 max-w-xs leading-relaxed">
              {ADDRESS}
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="text-caption text-white/20 mb-6">Navegação</p>
            <nav className="grid grid-cols-2 gap-y-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs text-white/35 transition-colors hover:text-white/70"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <p className="text-caption text-white/20 mb-6">Contato</p>
            <p className="text-xs text-white/35">contato@usemoema.com.br</p>
          </div>
        </div>

        {/* Divider */}
        <div className="rule-dark mb-10" />

        {/* Legal */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end">
          <p className="max-w-2xl text-[10px] font-light text-white/15 leading-relaxed">
            {LEGAL_TEXT}
          </p>
          <p className="text-[10px] text-white/15 flex-shrink-0">
            &copy; {new Date().getFullYear()} use.moema
          </p>
        </div>
      </div>
    </footer>
  );
}
