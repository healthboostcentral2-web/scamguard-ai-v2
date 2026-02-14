import React from 'react';
import { RuleMatch, RiskLevel } from '../types';
import { HelpCircle, Tag, Link, Phone, Zap, Users } from 'lucide-react';

interface WhyThisResultProps {
  ruleMatches: RuleMatch[];
  riskLevel: RiskLevel;
}

const CATEGORY_ICONS: Record<RuleMatch['category'], React.FC<{ className?: string }>> = {
  keyword: Tag,
  domain: Link,
  phone: Phone,
  urgency: Zap,
  community: Users,
};

const CATEGORY_COLORS: Record<RuleMatch['category'], string> = {
  keyword: 'text-orange-400',
  domain: 'text-blue-400',
  phone: 'text-purple-400',
  urgency: 'text-yellow-400',
  community: 'text-rose-400',
};

const WhyThisResult: React.FC<WhyThisResultProps> = ({ ruleMatches, riskLevel }) => {
  if (!ruleMatches || ruleMatches.length === 0 || riskLevel === 'SAFE') return null;

  return (
    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-300">Why this result?</h3>
      </div>
      <ul className="space-y-2">
        {ruleMatches.map((match, idx) => {
          const Icon = CATEGORY_ICONS[match.category];
          const color = CATEGORY_COLORS[match.category];
          return (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
              <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${color}`} />
              <span>{match.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WhyThisResult;
