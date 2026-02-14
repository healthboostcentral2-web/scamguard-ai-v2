import React from 'react';
import { Users, AlertTriangle, ShieldAlert } from 'lucide-react';

interface CommunityWarningPanelProps {
  reportCount: number;
}

const CommunityWarningPanel: React.FC<CommunityWarningPanelProps> = ({ reportCount }) => {
  if (reportCount === 0) return null;

  const getWarningLevel = () => {
    if (reportCount >= 20) {
      return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/50',
        text: 'text-red-400',
        badgeBg: 'bg-red-500/20',
        icon: ShieldAlert,
        title: 'Confirmed Community Scam',
        description: 'This content has been widely reported as a scam by the community. Do not engage with it under any circumstances.',
      };
    }
    if (reportCount >= 5) {
      return {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/50',
        text: 'text-orange-400',
        badgeBg: 'bg-orange-500/20',
        icon: AlertTriangle,
        title: 'Frequently Reported',
        description: 'Multiple community members have flagged this content. Exercise extreme caution.',
      };
    }
    return {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/50',
      text: 'text-yellow-400',
      badgeBg: 'bg-yellow-500/20',
      icon: Users,
      title: 'Community Reports',
      description: 'This content has been reported by community members. Proceed carefully.',
    };
  };

  const level = getWarningLevel();
  const Icon = level.icon;

  return (
    <div className={`rounded-xl border ${level.border} ${level.bg} p-4`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${level.badgeBg}`}>
          <Icon className={`w-5 h-5 ${level.text}`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-sm font-semibold ${level.text}`}>{level.title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">Community Scam Intelligence</p>
        </div>
        <div className={`px-3 py-1 rounded-full ${level.badgeBg} ${level.text} text-sm font-bold`}>
          {reportCount} {reportCount === 1 ? 'report' : 'reports'}
        </div>
      </div>
      <p className="text-sm text-slate-300">{level.description}</p>
      <div className="mt-3 flex items-center gap-2">
        <Users className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs text-slate-500">
          Reported {reportCount} {reportCount === 1 ? 'time' : 'times'} by community
        </span>
      </div>
    </div>
  );
};

export default CommunityWarningPanel;
