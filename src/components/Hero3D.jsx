import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

export default function Hero3D() {
  return (
    <div className="pointer-events-none absolute -right-16 top-8 hidden h-72 w-72 md:block lg:h-96 lg:w-96">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1.3} color="#ffffff" />
        <directionalLight position={[-3, -2, -3]} intensity={0.5} color="#7eaa36" />
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.4}>
            <Sphere args={[1.35, 64, 64]}>
              <MeshDistortMaterial
                color="#98c64c"
                attach="material"
                distort={0.42}
                speed={1.6}
                roughness={0.15}
                metalness={0.15}
              />
            </Sphere>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
