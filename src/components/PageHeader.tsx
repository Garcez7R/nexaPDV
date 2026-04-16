type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-brand-900">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p>
    </div>
  );
}
