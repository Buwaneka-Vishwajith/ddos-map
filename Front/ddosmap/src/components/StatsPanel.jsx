import React from 'react';
import { ATTACK_TYPES } from '../utils/countries';

const StatsPanel = ({ stats, isConnected }) => {
  return (
    <div className="bg-slate-900/20 bg-opacity-80 border rounded-lg mt-5 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className={`w-3 h-3 animate-pulse delay-100 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-500'}`}></div>
        <h2 className="text-lg font-bold bg-gradient-to-r from-blue-300/70 to-blue-300/20 bg-clip-text text-transparent font-mono tracking-wider">THREAT MONITOR</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4 border border-red-500/50">
          <div className="text-sm text-gray-400 mb-2">Total Attacks</div>
          <div className="text-2xl font-mono text-red-400">{stats.totalAttacks}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-green-500/50">
          <div className="text-sm text-gray-400 mb-2">Active</div>
          <div className="text-2xl font-mono text-cyan-400">{stats.activeAttacks}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-slate-500/50">
          <div className="text-sm text-gray-400 mb-2">Countries</div>
          <div className="text-2xl font-mono text-slate-400">{stats.topTargets.length}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-slate-500/50">
          <div className="text-sm text-gray-400 mb-2">Vectors</div>
          <div className="text-2xl font-mono text-slate-400">{Object.keys(stats.attackTypes).length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-sm font-bold text-gray-300 mb-4 font-mono">ATTACK VECTORS</h3>
          <div className="space-y-3">
            {Object.entries(ATTACK_TYPES).map(([type, config]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: config.color }}
                  ></div>
                  <span className="text-sm text-gray-300 font-mono">{config.name}</span>
                </div>
                <span className="text-cyan-400 font-mono text-sm">
                  {stats.attackTypes[type] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-sm font-bold text-gray-300 mb-4 font-mono">TOP TARGETS</h3>
          <div className="space-y-3">
            {stats.topTargets.slice(0, 5).map((target, index) => (
              <div key={target.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-300 font-mono">{target.country}</span>
                </div>
                <span className="text-red-400 font-mono text-sm">
                  {target.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;