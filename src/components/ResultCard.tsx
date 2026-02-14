import React, { useState, useEffect } from 'react';
import { ScanResult } from '../types';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';
import RiskMeter from './RiskMeter';
import RiskExplanation from './RiskExplanation';
import WhyThisResult from './WhyThisResult';
import ActionButtons from './ActionButtons';
import CommunityWarningPanel from './CommunityWarningPanel';
import { getReportCount } from '../services/scamReportsService';

interface ResultCardProps {
  result: ScanResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [communityReportCount, setCommunityReportCount] = useState(0);

  useEffect(() => {
    const report = getReportCount(result.input);
    if (report) {
      setCommunityReportCount(report.reportCount);
    } else {
      setCommunityReportCount(0);
    }
  }, [result]);

  const handleReport = (newCount: number) => {
    setCommunityReportCount(newCount);
  };

  const getTheme = () => {
    switch (result.riskLevel) {
      case 'SAFE':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/50',
          text: 'text-green-400',
          icon: ShieldCheck,
          gradient: 'from-green-500 to-emerald-500'
        };
      case 'SUSPICIOUS':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/50',
          text: 'text-yellow-400',
          icon: AlertTriangle,
          gradient: 'from-yellow-500 to-orange-500'
        };
      case 'SCAM':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/50',
          text: 'text-red-400',
          icon: ShieldAlert,
          gradient: 'from-red-500 to-rose-600'
        };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fade-in">
      <div className={`relative overflow-hidden rounded-2xl border ${theme.border} bg-slate-900 shadow-2xl`}>
        {/* Header Background */}
        <div className={`absolute top-0 w-full h-1 bg-gradient-to-r ${theme.gradient}`} />
        
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${theme.bg}`}>
                <Icon className={`w-8 h-8 ${theme.text}`} />
              </div>
              <div>
                <h2 className="text-sm font-medium text-slate-400">Risk Assessment</h2>
                <p className={`text-2xl font-bold ${theme.text}`}>{result.riskLevel}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-slate-100">{result.confidence}%</span>
              <p className="text-xs text-slate-500">Confidence</p>
            </div>
          </div>

          {/* Advice */}
          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
             <h3 className="text-sm font-semibold text-slate-300 mb-2">Recommendation</h3>
             <p className="text-slate-200">{result.advice}</p>
          </div>

          {/* Why this result? */}
          <WhyThisResult ruleMatches={result.ruleMatches} riskLevel={result.riskLevel} />

          {/* Risk Meter */}
          <RiskMeter percentage={result.confidence} />

          {/* Why this is risky - grouped explanation */}
          <RiskExplanation reasons={result.reasons} riskLevel={result.riskLevel} />

          {/* Reasons */}
          {result.reasons.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Detection Details</h3>
              <ul className="space-y-2">
                {result.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <ActionButtons result={result} onReport={handleReport} />

          {/* Community Warning Panel */}
          <CommunityWarningPanel reportCount={communityReportCount} />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;