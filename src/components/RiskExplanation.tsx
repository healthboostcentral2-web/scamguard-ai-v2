import React from 'react';
import { AlertCircle, Link, Phone, Zap, FileWarning, Users } from 'lucide-react';

interface RiskExplanationProps {
  reasons: string[];
  riskLevel: string;
}

type CategoryKey = 'keywords' | 'links' | 'urgency' | 'phone' | 'community' | 'other';

interface Category {
  label: string;
  icon: React.FC<{ className?: string }>;
  color: string;
}

const CATEGORIES: Record<CategoryKey, Category> = {
  keywords: { label: 'Suspicious Keywords', icon: AlertCircle, color: 'text-orange-400' },
  links: { label: 'Suspicious Links/Domains', icon: Link, color: 'text-blue-400' },
  urgency: { label: 'Urgency Tactics', icon: Zap, color: 'text-yellow-400' },
  phone: { label: 'Suspicious Phone Numbers', icon: Phone, color: 'text-purple-400' },
  community: { label: 'Community Reports', icon: Users, color: 'text-rose-400' },
  other: { label: 'Other Indicators', icon: FileWarning, color: 'text-slate-400' },
};

function categorizeReason(reason: string): CategoryKey {
  const lower = reason.toLowerCase();
  if (lower.includes('keyword')) return 'keywords';
  if (lower.includes('domain') || lower.includes('shortener') || lower.includes('link')) return 'links';
  if (lower.includes('urgent') || lower.includes('panic')) return 'urgency';
  if (lower.includes('number') || lower.includes('phone') || lower.includes('international')) return 'phone';
  if (lower.includes('community') || lower.includes('reported')) return 'community';
  return 'other';
}

const RiskExplanation: React.FC<RiskExplanationProps> = ({ reasons, riskLevel }) => {
  if (reasons.length === 0 || riskLevel === 'SAFE') return null;

  const grouped: Partial<Record<CategoryKey, string[]>> = {};
  reasons.forEach(reason => {
    const cat = categorizeReason(reason);
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat]!.push(reason);
  });

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
        Why this is risky
      </h3>
      <div className="space-y-2">
        {(Object.keys(grouped) as CategoryKey[]).map(catKey => {
          const cat = CATEGORIES[catKey];
          const Icon = cat.icon;
          const items = grouped[catKey]!;

          return (
            <div key={catKey} className="bg-slate-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${cat.color}`} />
                <span className={`text-sm font-medium ${cat.color}`}>{cat.label}</span>
              </div>
              <ul className="space-y-1 ml-6">
                {items.map((reason, idx) => (
                  <li key={idx} className="text-sm text-slate-300 list-disc">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskExplanation;
