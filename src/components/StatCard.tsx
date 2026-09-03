import React from 'react';

interface StatCardProps {
  id?: string;
  label: string;
  value: string | number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  label,
  value,
  subtitle,
  icon: Icon,
  trend,
  highlight = false,
}) => {
  return (
    <div
      id={id}
      className={`p-5 rounded-2xl border transition-all shadow-xs flex flex-col justify-between ${
        highlight
          ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20'
          : 'bg-white border-neutral-200/90 hover:border-neutral-300'
      }`}
    >
      <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold mb-2">
        <span className="uppercase tracking-wider text-[11px] font-bold text-neutral-400">
          {label}
        </span>
        <div
          className={`p-2 rounded-xl ${
            highlight ? 'bg-emerald-200 text-emerald-900' : 'bg-neutral-100 text-neutral-700'
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            highlight ? 'text-emerald-900' : 'text-neutral-900'
          }`}
        >
          {value}
        </div>
        <div className="text-xs text-neutral-500 font-medium mt-1">{subtitle}</div>
      </div>

      {trend && (
        <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
          <span
            className={`font-bold ${
              trend.isPositive ? 'text-emerald-700' : 'text-amber-700'
            }`}
          >
            {trend.value}
          </span>
          <span className="text-neutral-400 font-medium">vs Target</span>
        </div>
      )}
    </div>
  );
};
