import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Create a deformed sphere to represent the irregular shape of cancer cells
const CancerCell = () => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/cancer.glb');

  // Memoize a red material so it’s only created once
  const redMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ff0000'),
        roughness: 0.4,
        metalness: 0.1,
      }),
    []
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Shadows
        child.castShadow = true;
        child.receiveShadow = true;
        // Apply our red material
        child.material = redMaterial;
        // Optimize geometry
        const geom = child.geometry.clone();
        geom.deleteAttribute('uv');
        geom.deleteAttribute('normal');
        geom.computeVertexNormals();
        child.geometry = geom;
      }
    });
  }, [scene, redMaterial]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  // Increased the scale from 2 to 4 for a larger cell
  return (
    <group ref={group}>
      <primitive object={scene} scale={4} />
    </group>
  );
};

const CancerCellModel = () => {
  const bgColor = useMemo(() => new THREE.Color('#ffffff'), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 50 }}
      shadows
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
        depth: true,
        outputEncoding: THREE.sRGBEncoding,
      }}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <CancerCell />
      <OrbitControls
        enableZoom={false}
        minDistance={8}
        maxDistance={20}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

// Preload and cache the model
useGLTF.preload('/cancer.glb');

export default CancerCellModel;
