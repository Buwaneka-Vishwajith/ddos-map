import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';

const GlobeVisualization = ({ attacks }) => {
  const globeEl = useRef();
  const mountRef = useRef();
  const [allArcs, setAllArcs] = useState([]);
  const processedIds = useRef(new Set());
  const isInitialized = useRef(false);

  //globe
  useEffect(() => {
    if (!mountRef.current || isInitialized.current) return;

    // glb settings
    const globe = Globe()
      (mountRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .width(850)
      .height(600)
      .showAtmosphere(true)
      .atmosphereColor('#7F8CAA')
      .atmosphereAltitude(0.25);

    globeEl.current = globe;
    isInitialized.current = true;

    
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;
    globe.controls().enableZoom = true;

    //arcs
    globe
      .arcColor(d => d.color)
      .arcAltitude(d => d.altitude)
      .arcStroke(d => d.strokeWidth)
      .arcDashLength(0.9)
      .arcDashGap(0.1)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(() => Math.random() * 2000 + 1000)
      .arcsTransitionDuration(2000)
      .pointOfView({ lat: 0, lng: 0, altitude: 2.5 })
      .showGlobe(true)
      .showGraticules(false);

    return () => {
      if (mountRef.current && globe) {
        mountRef.current.removeChild(globe.renderer().domElement);
      }
    };
  }, []);

  //new attacks
  useEffect(() => {
    if (!attacks.length || !globeEl.current) return;

    // Find new attacks
    const newAttacks = attacks.filter(attack => !processedIds.current.has(attack.id));
    
    if (newAttacks.length === 0) return;

    // new attacks to arcs
    const newArcs = newAttacks.map((attack, index) => {
      const arcData = {
        startLat: attack.sourceLat,
        startLng: attack.sourceLng,
        endLat: attack.targetLat,
        endLng: attack.targetLng,
        color: attack.color || ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][index % 5],
        id: attack.id,
        strokeWidth: Math.random() * 0.5 + 0.3,
        altitude: Math.random() * 0.4 + 0.1,
        timestamp: Date.now()
      };
      
     
      processedIds.current.add(attack.id);
      return arcData;
    });

    // Add to existing arcs instead of replacing
    setAllArcs(prevArcs => {
      const updatedArcs = [...prevArcs, ...newArcs];
      
      //Remove old arcs after 5 secs
      const currentTime = Date.now();
      const filteredArcs = updatedArcs.filter(arc => 
        currentTime - arc.timestamp < 300000 // Keep arcs for 5 minutes
      );
      
      // Update globe
      globeEl.current.arcsData(filteredArcs);
      
      return filteredArcs;
    });
  }, [attacks]);

  return (
    <div className="relative">
      <div 
        ref={mountRef} 
        className="border  rounded-xl bg-slate-900/70 backdrop-blur-sm shadow-2xl overflow-hidden"
        // style={{
        //   boxShadow: '0 0 60px rgba(59, 130, 246, 0.4), inset 0 0 60px rgba(59, 130, 246, 0.1)'
        // }}
      />
      
      {/* Enhanced glowing corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-100/40 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-100/40 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-100/40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-100/40 animate-pulse"></div>
      
      {/* Additional glow effect overlay */}
      {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div> */}
    </div>
  );
};

export default GlobeVisualization;
