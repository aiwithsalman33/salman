import { navItems } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-void/85 backdrop-blur-md">
      <div className="shell flex h-(--header-h) items-center justify-between gap-6">
        <a href="#top" aria-label="Salman, AI With Salman: back to top" className="rounded-sm">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-meta">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="py-2 text-steel transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:contents">
            <MagneticButton>
              <ButtonLink href="#contact" size="sm">
                Let&apos;s build something
              </ButtonLink>
            </MagneticButton>
          </span>
          <MobileMenu />
        </div>
      </div>
      {/* Scroll progress on phones and tablets; desktop shows it on the trajectory rail. */}
      <span aria-hidden="true" className="progress-bar lg:hidden" />
    </header>
  );
}
