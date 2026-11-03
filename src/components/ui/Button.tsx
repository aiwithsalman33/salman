import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "go" | "outline";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors";

const variants: Record<Variant, string> = {
  // The only filled button style on the page: the "GO" action.
  go: "bg-go text-void hover:bg-[#d6f88f]",
  outline: "border border-hairline-strong text-fg hover:border-signal hover:text-signal",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-body",
  sm: "min-h-10 px-4 text-meta",
};

export function buttonClass(variant: Variant = "go", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: Variant; size?: Size; external?: boolean };

export function ButtonLink({ variant, size, external, className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {external && <ExternalMark />}
    </a>
  );
}

type TextLinkProps = ComponentProps<"a"> & { external?: boolean; children: ReactNode };

export function TextLink({ external, className = "", children, ...props }: TextLinkProps) {
  return (
    <a
      className={`inline-flex items-center gap-1.5 font-medium underline decoration-hairline-strong underline-offset-[6px] transition-colors hover:text-signal hover:decoration-signal ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {external && <ExternalMark />}
    </a>
  );
}

function ExternalMark() {
  return (
    <>
      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
      <span className="sr-only">(opens in a new tab)</span>
    </>
  );
}
