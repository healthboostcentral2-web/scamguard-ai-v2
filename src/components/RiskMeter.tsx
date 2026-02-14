import React from 'react';

interface RiskMeterProps {
  percentage: number;
}

const RiskMeter: React.FC<RiskMeterProps> = ({ percentage }) => {
  const clampedPct = Math.max(0, Math.min(100, percentage));

  const getBarColor = () => {
    if (clampedPct <= 30) return 'bg-green-500';
    if (clampedPct <= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getGlowColor = () => {
    if (clampedPct <= 30) return 'shadow-green-500/40';
    if (clampedPct <= 70) return 'shadow-yellow-500/40';
    return 'shadow-red-500/40';
  };

  const getLabel = () => {
    if (clampedPct <= 30) return 'Low Risk';
    if (clampedPct <= 70) return 'Medium Risk';
    return 'High Risk';
  };

  const getLabelColor = () => {
    if (clampedPct <= 30) return 'text-green-400';
    if (clampedPct <= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Risk Meter</h3>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${getLabelColor()}`}>{getLabel()}</span>
          <span className="text-sm font-bold text-slate-300">{clampedPct}%</span>
        </div>
      </div>
      <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor()} shadow-lg ${getGlowColor()}`}
          style={{ width: `${clampedPct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-600">
        <span>0</span>
        <span>30</span>
        <span>70</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default RiskMeter;
