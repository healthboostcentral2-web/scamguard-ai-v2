export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'SCAM';

export interface ScanResult {
  id: string;
  input: string;
  riskLevel: RiskLevel;
  confidence: number;
  reasons: string[];
  advice: string;
  timestamp: number;
}

export interface HeuristicRule {
  pattern: RegExp;
  weight: number;
  reason: string;
}
