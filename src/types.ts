export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'SCAM';

export interface RuleMatch {
  category: 'keyword' | 'domain' | 'phone' | 'urgency' | 'community';
  label: string;
}

export interface ScanResult {
  id: string;
  input: string;
  riskLevel: RiskLevel;
  confidence: number;
  reasons: string[];
  ruleMatches: RuleMatch[];
  advice: string;
  timestamp: number;
}

export interface HeuristicRule {
  pattern: RegExp;
  weight: number;
  reason: string;
}
