'use client';

interface MetricCardProps {
    label: string;
    value: string | number;
    valueClassName?: string;
}

export const MetricCard = ({ label, value, valueClassName = "text-zinc-900 dark:text-white" }: MetricCardProps) => {
    return (
        <div className="p-6 bg-card dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800 shadow-sm transition-all hover:border-accent group">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <h3 className={`text-2xl font-heading font-bold mt-1 ${valueClassName}`}>{value}</h3>
        </div>
    );
};
