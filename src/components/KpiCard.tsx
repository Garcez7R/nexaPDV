type KpiCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function KpiCard({ label, value, helper }: KpiCardProps) {
  return (
    <article className="rounded-[24px] border border-brand-100 bg-brand-900 p-5 text-white shadow-soft">
      <p className="text-sm uppercase tracking-[0.2em] text-brand-100">{label}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-brand-100">{helper}</p>
    </article>
  );
}
