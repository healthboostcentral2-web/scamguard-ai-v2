const STORAGE_KEY = 'scam_reports_db';

export interface ScamReport {
  phoneOrText: string;
  reportCount: number;
  lastReported: number;
}

function normalizeKey(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

function loadReports(): Record<string, ScamReport> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load scam reports DB', e);
  }
  return {};
}

function saveReports(reports: Record<string, ScamReport>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function reportScam(input: string): ScamReport {
  const key = normalizeKey(input);
  const reports = loadReports();

  const existing = reports[key];
  if (existing) {
    existing.reportCount += 1;
    existing.lastReported = Date.now();
  } else {
    reports[key] = {
      phoneOrText: input.trim(),
      reportCount: 1,
      lastReported: Date.now(),
    };
  }

  saveReports(reports);
  return reports[key];
}

export function getReportCount(input: string): ScamReport | null {
  const key = normalizeKey(input);
  const reports = loadReports();
  return reports[key] || null;
}

export function getCommunityRiskBoost(input: string): { boost: number; reportCount: number; label: string | null } {
  const report = getReportCount(input);
  if (!report) {
    return { boost: 0, reportCount: 0, label: null };
  }

  const count = report.reportCount;

  if (count >= 20) {
    return { boost: 100, reportCount: count, label: 'CONFIRMED SCAM by community' };
  }
  if (count >= 5) {
    return { boost: 30, reportCount: count, label: 'Frequently reported by community' };
  }
  if (count >= 1) {
    return { boost: 15, reportCount: count, label: 'Reported by community members' };
  }

  return { boost: 0, reportCount: 0, label: null };
}
