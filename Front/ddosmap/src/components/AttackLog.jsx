import React from 'react';

const AttackLog = ({ recentAttacks }) => {
  return (
    <div className="h-full">
<div 
  className="bg-slate-900/20 border border-purple-500/30 rounded-xl p-4 shadow-2xl flex flex-col h-[600px] relative" 
  style={{ 
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.15), inset 0 0 20px rgba(168, 85, 247, 0.05)' 
  }} 
>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-300/70 to-blue-300/20 bg-clip-text text-transparent font-mono tracking-wider">
            LIVE ATTACK LOG
          </h3>
          {/* <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
          </div> */}
        </div>

        {/* Scrollable Logs container */}
        <div 
          className="flex-1 overflow-y-auto space-y-2"
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>
          
          {recentAttacks.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-500 font-mono">
              <div className="text-center">
                <div className="animate-spin w-6 h-6 border-2 border-slate-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className='text-sm'>Monitoring for threats...</p>
              </div>
            </div>
          ) : (
            recentAttacks.map((attack, index) => (
              <div 
                key={attack.id} 
                className="flex items-center space-x-3 text-xs font-mono p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-200 animate-fadeInUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-slate-400 w-16 flex-shrink-0">{attack.timestamp}</span>
                <span 
                  className="px-2 py-1 rounded-md text-black font-bold text-xs flex-shrink-0 shadow-lg"
                  style={{ 
                    backgroundColor: attack.color,
                    boxShadow: `0 0 10px ${attack.color}50`
                  }}
                >
                  {attack.type}
                </span>
                <span className="text-slate-300 flex-1 truncate">
                  <span className="text-cyan-400">{attack.sourceCountry}</span>
                  <span className="text-slate-500 mx-1">→</span>
                  <span className="text-pink-400">{attack.targetCountry}</span>
                </span>
                <span className="text-red-400 font-bold flex-shrink-0">#{attack.intensity}</span>
              </div>
            ))
          )}
        </div>

        {/* Glowing corners for attack log */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400/50 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-400 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-400 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-400 rounded-br-xl"></div>
      </div>
    </div>
  );
};

export default AttackLog;