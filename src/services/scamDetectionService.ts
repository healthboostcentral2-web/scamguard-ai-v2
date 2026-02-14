import { ScanResult, RiskLevel, RuleMatch } from '../types';
import { getCommunityRiskBoost } from './scamReportsService';

const SCAM_KEYWORDS = [
  'otp', 'verify now', 'urgent', 'lottery', 'prize', 'kyc update', 
  'bank blocked', 'upi request', 'winner', 'inherit', 'irs', 
  'refund', 'suspended', 'unusual activity', 'limited time'
];

const SUSPICIOUS_DOMAINS = [
  '.xyz', '.top', '.click', '.info', '.biz', 'bit.ly', 
  'tinyurl', 'is.gd', 't.co', 'rb.gy'
];

export const detectScam = (input: string): ScanResult => {
  const lowerInput = input.toLowerCase();
  let score = 0;
  const reasons: string[] = [];
  const ruleMatches: RuleMatch[] = [];

  // 1. Keyword Analysis
  let keywordMatches = 0;
  SCAM_KEYWORDS.forEach(keyword => {
    if (lowerInput.includes(keyword)) {
      score += 20;
      keywordMatches++;
      if (keywordMatches <= 3) {
         reasons.push(`Contains high-risk keyword: "${keyword}"`);
      }
      ruleMatches.push({ category: 'keyword', label: `Contains "${keyword}" keyword` });
    }
  });

  // 2. Domain Analysis
  SUSPICIOUS_DOMAINS.forEach(domain => {
    if (lowerInput.includes(domain)) {
      score += 30;
      reasons.push(`Uses suspicious domain extension or shortener: "${domain}"`);
      ruleMatches.push({ category: 'domain', label: `Suspicious link domain: "${domain}"` });
    }
  });

  // 3. Phone Number Analysis
  // Regex for international or suspicious lengths
  const phoneRegex = /(\+|00)[1-9][0-9 \-\(\)\.]{7,32}/;
  const indianMobileRegex = /^[6-9]\d{9}$/;

  // Extract potential numbers (simple heuristic)
  const numbers = input.match(/\d{10,}/g);

  if (numbers) {
    numbers.forEach(num => {
      if (!indianMobileRegex.test(num) && num.length > 10) {
        score += 15;
        reasons.push('Contains unusually long or international number format');
        ruleMatches.push({ category: 'phone', label: 'Unknown or international number pattern' });
      }
    });
  }

  // 4. Urgency Analysis
  if (lowerInput.includes('immediately') || lowerInput.includes('24 hours') || input.includes('!!!')) {
    score += 10;
    reasons.push('Uses urgent language to create panic');
    ruleMatches.push({ category: 'urgency', label: 'Urgent payment or action language detected' });
  }

  // 5. Community Reports Analysis
  const communityData = getCommunityRiskBoost(input);
  let communityOverride = false;
  if (communityData.boost > 0 && communityData.label) {
    if (communityData.reportCount >= 20) {
      communityOverride = true;
    }
    score += communityData.boost;
    reasons.push(`${communityData.label} (${communityData.reportCount} reports)`);
    ruleMatches.push({ category: 'community', label: `${communityData.label} (${communityData.reportCount} reports)` });
  }

  // Normalize Score
  score = Math.min(score, 100);

  // Determine Risk Level
  let riskLevel: RiskLevel = 'SAFE';
  let advice = 'No obvious threats detected. Always stay vigilant.';

  if (communityOverride) {
    riskLevel = 'SCAM';
    advice = 'CONFIRMED SCAM: This has been reported 20+ times by the community. Do not engage.';
  } else if (score > 70) {
    riskLevel = 'SCAM';
    advice = 'Do not click links or reply. Block the sender immediately.';
  } else if (score > 30) {
    riskLevel = 'SUSPICIOUS';
    advice = 'Proceed with extreme caution. Verify the source independently.';
  }

  if (input.length < 3) {
    riskLevel = 'SAFE';
    score = 0;
    reasons.length = 0;
    ruleMatches.length = 0;
    reasons.push('Input too short to analyze');
    advice = 'Please provide more context.';
  }

  return {
    id: Date.now().toString(),
    input,
    riskLevel,
    confidence: score,
    reasons,
    ruleMatches,
    advice,
    timestamp: Date.now()
  };
};