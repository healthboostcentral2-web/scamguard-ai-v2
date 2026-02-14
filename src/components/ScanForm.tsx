import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface ScanFormProps {
  onScan: (input: string) => void;
  isScanning: boolean;
}

const ScanForm: React.FC<ScanFormProps> = ({ onScan, isScanning }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onScan(input.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste suspicious message, link, or phone number here..."
              className="w-full h-32 p-4 bg-slate-950 text-slate-100 border border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-slate-500"
            />
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!input.trim() || isScanning}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold text-white shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Scan Now
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ScanForm;