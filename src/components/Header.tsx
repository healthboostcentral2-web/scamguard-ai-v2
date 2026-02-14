import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 p-4 shadow-lg">
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-2">
        <ShieldAlert className="w-8 h-8 text-blue-500" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          ScamGuard AI
        </h1>
      </div>
    </header>
  );
};

export default Header;