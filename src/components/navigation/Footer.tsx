import { handle, instagram, topmate, youtube } from "@/data/social-links";
import { TextLink } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const links = [instagram, topmate, ...(youtube ? [youtube] : [])];

  return (
    <footer className="relative z-1 border-t border-hairline">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Wordmark />
          <p className="telemetry text-steel">{handle}</p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-meta">
          {links.map((link) => (
            <li key={link.href}>
              <TextLink href={link.href} external>
                {link.label}
              </TextLink>
            </li>
          ))}
          <li>
            <TextLink href="#top">Back to top</TextLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}
