import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/publicSubmit";

const navItems = [
  { title: "Home", url: "/", exact: true },
  { title: "Endorsements", url: "/endorsements" },
  { title: "Richest People in Florida", url: "/richest-person-in-florida" },
  { title: "Press", url: "/press" },
];

interface NavPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const PanelContent = ({ onClose }: { onClose: () => void }) => {
  const { pathname } = useLocation();

  const handleClick = (title: string, url: string) => {
    trackEvent("nav_panel_click", { title, url });
    onClose();
  };

  return (
    <div className="flex flex-col h-full px-6 py-8 sm:py-10">
      <div className="flex items-center justify-between mb-10">
        <span className="font-display text-2xl sm:text-3xl text-background tracking-wide">
          MENU
        </span>
        <button
          onClick={onClose}
          className="text-background/70 hover:text-background transition-colors"
          aria-label="Close navigation panel"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.url : pathname.startsWith(item.url);
            return (
              <li key={item.url}>
                <NavLink
                  to={item.url}
                  onClick={() => handleClick(item.title, item.url)}
                  className={({ isActive }) =>
                    `block font-display text-2xl sm:text-3xl tracking-wide py-3 px-2 rounded-sm transition-colors ${
                      isActive
                        ? "text-background bg-background/15"
                        : "text-background/80 hover:text-background hover:bg-background/10"
                    }`
                  }
                  end={item.exact}
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pt-8 border-t border-background/20">
        <p className="text-background/60 text-xs uppercase tracking-widest font-bold mb-3">
          Take Action
        </p>
        <NavLink
          to="/endorsements"
          onClick={() => handleClick("Take Action", "/endorsements")}
          className="inline-flex items-center gap-2 border-2 border-background text-background font-display text-lg tracking-wider px-5 py-2.5 rounded-sm hover:bg-background hover:text-gold transition-colors"
        >
          VOTE 2026 →
        </NavLink>
      </div>
    </div>
  );
};

export const NavPanel = ({ isOpen, onClose }: NavPanelProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Desktop: right-side drawer */}
          <motion.aside
            key="desktop-nav"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block fixed top-0 right-0 h-full w-1/3 min-w-[320px] max-w-[420px] bg-gold z-50 shadow-2xl"
          >
            <PanelContent onClose={onClose} />
          </motion.aside>

          {/* Mobile: bottom sheet */}
          <motion.aside
            key="mobile-nav"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed bottom-0 left-0 right-0 h-[80vh] bg-gold z-50 shadow-2xl rounded-t-2xl"
          >
            <PanelContent onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

interface NavTriggerProps {
  onOpen: () => void;
}

export const NavTrigger = ({ onOpen }: NavTriggerProps) => {
  const handleClick = () => {
    trackEvent("nav_panel_open");
    onOpen();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Open navigation menu"
      className="fixed bottom-4 right-4 sm:bottom-auto sm:top-4 sm:left-4 sm:right-auto z-40 bg-gold text-background w-12 h-12 rounded-sm flex items-center justify-center shadow-lg shadow-gold/20 hover:brightness-110 transition-all"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
};
