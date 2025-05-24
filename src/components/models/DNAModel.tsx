import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// DNA Helix component
const DNAHelix = () => {
  const group = useRef<THREE.Group>(null);
  
  // Parameters for the DNA helix - REDUCED complexity
  const radius = 4;
  const helixHeight = 20;
  const numPairs = 10; // Reduced from 15 to 10
  const strandRadius = 0.3;
  const nucleotideRadius = 0.4;
  
  // Colors
  const strand1Color = new THREE.Color('#0078c7');
  const strand2Color = new THREE.Color('#2e9ea7');
  const baseColors = [
    new THREE.Color('#ef6c1e'),
    new THREE.Color('#f28c44'),
  ];

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002; // Reduced rotation speed
    }
  });

  // Use useMemo to avoid recreating geometries on each render
  const strandGeometry = useMemo(() => new THREE.CylinderGeometry(
    strandRadius, 
    strandRadius, 
    helixHeight / numPairs + 0.1, 
    6 // Reduced segment count from 8 to 6
  ), [strandRadius, helixHeight, numPairs]);
  
  const nucleotideGeometry = useMemo(() => new THREE.SphereGeometry(
    nucleotideRadius, 
    8, 8 // Reduced from 16,16 to 8,8
  ), [nucleotideRadius]);

  // Create and memoize materials
  const strand1Material = useMemo(() => new THREE.MeshStandardMaterial({ color: strand1Color }), []);
  const strand2Material = useMemo(() => new THREE.MeshStandardMaterial({ color: strand2Color }), []);
  const baseMaterials = useMemo(() => baseColors.map(
    color => new THREE.MeshStandardMaterial({ color })
  ), []);

  // Pre-calculate and memoize DNA structure
  const dnaStructure = useMemo(() => {
    return Array.from({ length: numPairs }).map((_, pairIndex) => {
      const t = pairIndex / numPairs;
      const angle1 = t * Math.PI * 4; // 2 full turns
      const angle2 = angle1 + Math.PI; // Opposite side
      const y = helixHeight * (t - 0.5);
      
      // Position of first strand
      const x1 = radius * Math.cos(angle1);
      const z1 = radius * Math.sin(angle1);
      
      // Position of second strand
      const x2 = radius * Math.cos(angle2);
      const z2 = radius * Math.sin(angle2);

      return { pairIndex, t, angle1, angle2, y, x1, z1, x2, z2 };
    });
  }, [numPairs, radius, helixHeight]);

  return (
    <group ref={group}>
      {dnaStructure.map(({ pairIndex, angle1, angle2, y, x1, z1, x2, z2 }) => (
        <group key={pairIndex}>
          {/* First strand segment */}
          {pairIndex < numPairs - 1 && (
            <mesh 
              position={[x1, y, z1]}
              rotation={[Math.PI / 2, 0, angle1 + Math.PI / 2]}
              geometry={strandGeometry}
              material={strand1Material}
            />
          )}
          
          {/* Second strand segment */}
          {pairIndex < numPairs - 1 && (
            <mesh 
              position={[x2, y, z2]}
              rotation={[Math.PI / 2, 0, angle2 + Math.PI / 2]}
              geometry={strandGeometry}
              material={strand2Material}
            />
          )}
          
          {/* Nucleotide on first strand */}
          <mesh 
            position={[x1, y, z1]}
            geometry={nucleotideGeometry}
            material={strand1Material}
          />
          
          {/* Nucleotide on second strand */}
          <mesh 
            position={[x2, y, z2]}
            geometry={nucleotideGeometry}
            material={strand2Material}
          />
          
          {/* Base pair connection */}
          <mesh
            position={[(x1 + x2) / 2, y, (z1 + z2) / 2]}
            rotation={[Math.PI / 2, 0, Math.atan2(z2 - z1, x2 - x1)]}
          >
            <cylinderGeometry 
              args={[
                strandRadius * 0.6, 
                strandRadius * 0.6, 
                Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2), 
                6 // Reduced from 8 to 6
              ]} 
            />
            <meshStandardMaterial color={baseColors[pairIndex % baseColors.length]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const DNAModel = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 20], fov: 50 }}
      dpr={[1, 1.5]} // Cap pixel ratio for performance
      frameloop="demand" // Only render when needed
      performance={{ min: 0.5 }} // Allow ThreeJS to reduce quality for performance
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <DNAHelix />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate 
        autoRotateSpeed={0.3} // Reduced from 0.5 to 0.3
      />
    </Canvas>
  );
};

export default DNAModel;