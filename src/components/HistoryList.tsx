import React from 'react';
import { ScanResult } from '../types';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryListProps {
  history: ScanResult[];
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
          <Clock className="w-5 h-5" /> Recent Scans
        </h3>
        <button 
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors"
        >
          <Trash2 className="w-3 h-3" /> Clear History
        </button>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 flex items-center justify-between">
            <div className="overflow-hidden">
               <div className="flex items-center gap-2 mb-1">
                 <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                   item.riskLevel === 'SAFE' ? 'bg-green-500/20 text-green-400' :
                   item.riskLevel === 'SUSPICIOUS' ? 'bg-yellow-500/20 text-yellow-400' :
                   'bg-red-500/20 text-red-400'
                 }`}>
                   {item.riskLevel}
                 </span>
                 <span className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleDateString()}</span>
               </div>
               <p className="text-sm text-slate-300 truncate">{item.input}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;