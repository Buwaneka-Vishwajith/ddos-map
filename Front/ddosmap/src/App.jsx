import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import GlobeVisualization from "./components/Globe";
import StatsPanel from "./components/StatsPanel";
import AttackLog from "./components/AttackLog";
import { ATTACK_TYPES } from "./utils/countries";


const StarfieldBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
   
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 3 + 1,
        });
      }
      setStars(newStars);
    };

    generateStars();

  
    const addStarInterval = setInterval(() => {
      setStars((prev) => {
        const newStar = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: 0,
          twinkleSpeed: Math.random() * 3 + 1,
        };
        return [...prev.slice(-149), newStar]; // Keep max 150 stars
      });
    }, 2000);

    return () => clearInterval(addStarInterval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.twinkleSpeed}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [attacks, setAttacks] = useState([]);
  const [recentAttacks, setRecentAttacks] = useState([]);
  const [stats, setStats] = useState({
    totalAttacks: 0,
    activeAttacks: 0,
    attackTypes: {},
    topTargets: [],
  });

  useEffect(() => {
    // Connect to backend
    const newSocket = io(
      import.meta.env.VITE_SERVER_URL || "http://localhost:3001"
    );

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });

    newSocket.on("attack", (attackData) => {
      const newAttack = {
        ...attackData,
        color: ATTACK_TYPES[attackData.type]?.color || "#ffffff",
        timestamp: new Date().toLocaleTimeString(),
      };

      // Add to active attacks (for globe visualization)
      setAttacks((prev) => [...prev, newAttack].slice(-50)); // Keep only last 50

      // Add to recent attacks log
      setRecentAttacks((prev) => [newAttack, ...prev].slice(0, 20)); // Keep only last 20

      // Update stats
      setStats((prev) => ({
        totalAttacks: prev.totalAttacks + 1,
        activeAttacks: prev.activeAttacks + 1,
        attackTypes: {
          ...prev.attackTypes,
          [attackData.type]: (prev.attackTypes[attackData.type] || 0) + 1,
        },
        topTargets: updateTopTargets(prev.topTargets, attackData.targetCountry),
      }));
    });

    setSocket(newSocket);

    // Clean up attacks periodically (remove after 5 seconds)
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setAttacks((prev) =>
        prev.filter((attack) => now - attack.createdAt < 5000)
      );
      setStats((prev) => ({
        ...prev,
        activeAttacks: Math.max(0, prev.activeAttacks - 1),
      }));
    }, 1000);

    return () => {
      newSocket.close();
      clearInterval(cleanupInterval);
    };
  }, []);

  const updateTopTargets = (currentTargets, newTarget) => {
    const targetIndex = currentTargets.findIndex(
      (t) => t.country === newTarget
    );
    let updated;

    if (targetIndex >= 0) {
      updated = [...currentTargets];
      updated[targetIndex].count += 1;
    } else {
      updated = [...currentTargets, { country: newTarget, count: 1 }];
    }

    return updated.sort((a, b) => b.count - a.count).slice(0, 10);
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#0b0d0e" }}>
      <StarfieldBackground />
      <div className="container mx-auto max-w-7xl relative z-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-200 via-slate-500 to-cyan-200 bg-clip-text text-transparent mb-2 font-mono tracking-wider">
            C Y B E R &nbsp; T H R E A T &nbsp; M A P
          </h1>

          <p className="text-slate-300/50 text-md font-mono">
            Real time DDoS & Cyber Attack Visualization
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-slate-600 to-slate-900 mx-auto mt-4 rounded-full"></div>
        </header>

        {/* Globe and Attack Log - Side by side */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Globe - Takes up 2/3 of space */}
          <div className="xl:col-span-2">
            <GlobeVisualization attacks={attacks} />
          </div>

          {/* Attack Log - Takes up 1/3 of space */}
          <div className="xl:col-span-1">
            <AttackLog recentAttacks={recentAttacks} />
          </div>
        </div>
        {/* Stats Panel - Full width at top */}
        <div className="mb-6">
          <StatsPanel stats={stats} isConnected={isConnected} />
        </div>
      </div>
    </div>
  );
};

export default App;
