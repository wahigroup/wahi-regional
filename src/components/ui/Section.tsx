import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "dark";
}

export function Section({ children, className, variant = "default" }: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 lg:py-24",
        variant === "accent" && "bg-accent",
        variant === "dark" && "bg-primary text-primary-foreground",
        className
      )}
    >
      <div className="section-container">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 lg:mb-16", centered && "text-center")}>
      <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-sans text-base lg:text-lg text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
