'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
uniform float uTime;
uniform float uSpeed;

void main() {
    vec3 p = position;
    
    // Individual particle drift logic
    // We use modulo to wrap particles back to the start individually
    // Range -100 to 100 on Z axis
    float drift = uTime * uSpeed;
    p.z = mod(p.z + drift + 100.0, 200.0) - 100.0;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    
    // Size attenuation (stars get bigger as they get closer)
    gl_PointSize = 1.5 * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
void main() {
    // Simple circular particle
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    // Pure white, slight transparency
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.7);
}
`

export default function ParticleStarfield() {
    const mesh = useRef<THREE.Points>(null!)

    // Generate star positions
    const particles = useMemo(() => {
        const count = 15000 // High density for desktop
        const positions = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            // Random distribution in a large box
            positions[i * 3] = (Math.random() - 0.5) * 200 // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200 // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200 // z
        }

        return positions
    }, [])

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uSpeed: { value: 5.0 } // Drift speed
    }), [])

    useFrame((state) => {
        if (mesh.current) {
            // Update the time uniform for the drift
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime()

            // Keep the very slow rotation for that "Massive Universe" feel
            mesh.current.rotation.y += 0.0002
        }
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <shaderMaterial
                transparent
                depthWrite={false}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </points>
    )
}