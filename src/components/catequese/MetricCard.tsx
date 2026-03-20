"use client";

interface MetricCardProps {
  label: string;
  value: string | number;
  valueClassName?: string;
}

export const MetricCard = ({
  label,
  value,
  valueClassName = "text-foreground",
}: MetricCardProps) => {
  return (
    <div className="p-6 bg-white rounded-2xl border border-border shadow-sm transition-all hover:border-accent group">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <h3 className={`text-2xl font-heading font-bold mt-1 text-zinc-900 ${valueClassName}`}>
        {value}
      </h3>
    </div>
  );
};
