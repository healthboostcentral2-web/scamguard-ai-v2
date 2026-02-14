import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScanForm from './components/ScanForm';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import { detectScam } from './services/scamDetectionService';
import { ScanResult } from './types';
import { HashRouter } from 'react-router-dom';

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<ScanResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('scamGuardHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const handleScan = (input: string) => {
    setIsScanning(true);
    setCurrentResult(null);

    // Simulate network delay for better UX
    setTimeout(() => {
      const result = detectScam(input);
      setCurrentResult(result);
      setIsScanning(false);

      setHistory(prev => {
        const newHistory = [result, ...prev].slice(0, 10);
        localStorage.setItem('scamGuardHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    }, 1500);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('scamGuardHistory');
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-900 pb-20">
        <Header />
        <main className="container mx-auto">
          <div className="py-8 text-center space-y-2 px-4">
             <h2 className="text-2xl md:text-3xl font-bold text-white">
               Check before you trust.
             </h2>
             <p className="text-slate-400 max-w-md mx-auto">
               Paste any suspicious message, link, or phone number below to analyze its risk level instantly.
             </p>
          </div>

          <ScanForm onScan={handleScan} isScanning={isScanning} />
          
          {currentResult && (
            <div id="result-section">
              <ResultCard result={currentResult} />
            </div>
          )}

          <HistoryList history={history} onClear={clearHistory} />
        </main>
      </div>
    </HashRouter>
  );
}

export default App;