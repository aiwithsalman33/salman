"use client";

import { useRef } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/site";
import { workCategories } from "@/data/work";
import { buttonClass } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline-strong px-4 text-meta lg:hidden"
      >
        <Menu aria-hidden="true" className="size-4" strokeWidth={1.75} />
        Menu
      </button>

      {/* Native modal dialog: traps focus, closes on Escape, restores focus on close. */}
      <dialog ref={dialogRef} aria-label="Menu" className="menu-sheet lg:hidden">
        <div className="shell flex min-h-full flex-col">
          <div className="flex h-(--header-h) items-center justify-between border-b border-hairline">
            <Wordmark compact />
            <button
              type="button"
              onClick={close}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline-strong px-4 text-meta"
            >
              <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 py-6">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id} className="border-b border-hairline">
                  <a href={`#${item.id}`} onClick={close} className="block py-3.5 text-h3 font-semibold">
                    {item.label}
                  </a>
                  {item.id === "work" && (
                    <ul className="flex flex-col pb-3 pl-4">
                      {workCategories.map((category) => (
                        <li key={category.id}>
                          <a href={`#${category.id}`} onClick={close} className="flex items-baseline gap-3 py-2 font-medium text-steel">
                            <span className="telemetry" style={{ color: `var(--color-${category.accent})` }}>
                              {category.number}
                            </span>
                            {category.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="pb-10">
            <a href="#contact" onClick={close} className={buttonClass("go", "md", "w-full")}>
              Let&apos;s build something
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
