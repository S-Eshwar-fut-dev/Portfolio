import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { starfieldVertexShader, starfieldFragmentShader } from '@/lib/shaders/starfield'

export default function ParticleStarfield() {
    const meshRef = useRef<THREE.InstancedMesh>(null!)
    const count = 15000 // Maintaining high density

    const { offsets, speeds, sizes } = useMemo(() => {
        const offsets = new Float32Array(count * 3)
        const speeds = new Float32Array(count)
        const sizes = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            offsets[i * 3] = (Math.random() - 0.5) * 200 // x
            offsets[i * 3 + 1] = (Math.random() - 0.5) * 200 // y
            offsets[i * 3 + 2] = (Math.random() - 0.5) * 200 // z

            speeds[i] = 2.0 + Math.random() * 3.0 // Random drift speeds
            sizes[i] = 0.2 + Math.random() * 0.8 // Varied star sizes
        }

        return { offsets, speeds, sizes }
    }, [])

    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), [])

    useFrame((state) => {
        const material = meshRef.current?.material as THREE.ShaderMaterial
        if (material && material.uniforms) {
            material.uniforms.uTime.value = state.clock.getElapsedTime()
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
            <planeGeometry args={[1, 1]}>
                <instancedBufferAttribute attach="attributes-aOffset" args={[offsets, 3]} />
                <instancedBufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
                <instancedBufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
            </planeGeometry>
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={starfieldVertexShader}
                fragmentShader={starfieldFragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    )
}
