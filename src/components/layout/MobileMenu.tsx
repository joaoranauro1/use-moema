"use client";

import { motion, AnimatePresence } from "motion/react";
import { NAV_ITEMS } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavClick: (href: string) => void;
}

export function MobileMenu({ open, onClose, onNavClick }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <nav className="flex flex-col items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => onNavClick(item.href)}
                className="text-h3 font-light text-white tracking-wide cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => onNavClick("#contato")}
              className="mt-4 border border-white/30 px-8 py-3 text-xs font-medium tracking-[0.08em] uppercase text-white cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + NAV_ITEMS.length * 0.05,
                duration: 0.5,
              }}
            >
              Tenho interesse
            </motion.button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
