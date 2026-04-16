import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type SectionCardProps = PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
}>;

export function SectionCard({ title, description, className, children }: SectionCardProps) {
  return (
    <section className={cn("rounded-[28px] border border-brand-100 bg-white/90 p-5 shadow-soft", className)}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-brand-900">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
