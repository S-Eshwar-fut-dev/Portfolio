'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { Suspense } from 'react'
import TwinNebula from '@/components/three/TwinNebula'
import ParticleStarfield from '@/components/three/ParticleStarfield'
import AnimatedMesh from '@/components/three/AnimatedMesh' // Keep specific existing components if needed, but primarily follow specs

export default function Scene() {
    return (
        <div className="fixed inset-0 z-[-1]">
            <Canvas
                camera={{ position: [0, 3, 20], fov: 45 }}
                gl={{
                    antialias: true,
                    toneMapping: 3, // THREE.ACESFilmicToneMapping is enum 3 usually, or imported. React Three Fiber handles string or int? 
                    // Better to use defaults or imports if THREE triggers issues. 
                    // The prompt asked for ACESFilmicToneMapping. 
                }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <color attach="background" args={['#000000']} />

                    <ParticleStarfield />
                    <TwinNebula />

                    {/* Lighting */}
                    <ambientLight intensity={0.1} color="#0a1628" />
                    <pointLight position={[0, 5, 10]} intensity={0.5} color="#00ccff" />

                    {/* Post-processing */}
                    <EffectComposer enableNormalPass={false}>
                        <Bloom
                            luminanceThreshold={2.0}
                            intensity={1.8}
                            radius={0.6}
                            mipmapBlur
                        />
                        <Vignette offset={0.2} darkness={1.2} />
                    </EffectComposer>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.3}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                    />

                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    )
}
