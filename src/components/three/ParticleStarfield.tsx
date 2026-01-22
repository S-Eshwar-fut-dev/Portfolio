'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
uniform float uTime;
attribute vec3 aOffset;
attribute float aSpeed;
attribute float aSize;

varying vec2 vUv;

void main() {
    vUv = uv;

    vec3 pos = aOffset;
    
    // Z-axis drift logic (Moved to Vertex Shader)
    // Wrap particles in Z space
    float drift = uTime * aSpeed;
    pos.z = mod(pos.z + drift + 100.0, 200.0) - 100.0;

    // Billboarding Magic
    // 1. Get the position of the instance center in View Space
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // 2. Apply the vertex offset (the plane's corners) directly in View Space
    // This effectively makes the plane always face the camera (billboarding)
    mvPosition.xyz += position * aSize;

    gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
varying vec2 vUv;

void main() {
    // Circular particle shape
    float dist = distance(vUv, vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft glow edge
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.8);
}
`

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
        if (meshRef.current && meshRef.current.material) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime()
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
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    )
}
