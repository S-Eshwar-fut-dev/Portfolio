'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Sine wave displacement
    float elevation = sin(pos.x * 0.1 + uTime * 0.5) * sin(pos.y * 0.1 + uTime * 0.5) * 2.0;
    pos.z += elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  
  void main() {
    // Gradient colors based on UV and Time
    vec3 color1 = vec3(0.04, 0.09, 0.2); // Dark Blue
    vec3 color2 = vec3(0.12, 0.23, 0.5); // Lighter Blue
    
    float mixRatio = sin(vUv.x * 3.0 + uTime) * 0.5 + 0.5;
    vec3 finalColor = mix(color1, color2, mixRatio);
    
    gl_FragColor = vec4(finalColor, 0.2); // 20% opacity
  }
`

export default function AnimatedMesh() {
  const mesh = useRef<THREE.Mesh>(null!)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), [])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime()
  })

  return (
    <mesh
      ref={mesh}
      rotation={[-Math.PI / 4, 0, Math.PI / 4]}
      position={[0, -10, -20]}
      scale={2}
    >
      <planeGeometry args={[100, 100, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
        wireframe={true} // Stylish addition
        wireframeLinewidth={0.05}
      />
    </mesh>
  )
}
