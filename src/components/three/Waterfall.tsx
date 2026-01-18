'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

// --- SHADER CHUNKS ---

// Smooth FBM Noise
const fbmNoiseChunk = `
// Simplex 3D Noise 
// (Standard implementation)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 4; ++i) { // 4 Octaves for smoothness
        v += a * snoise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}
`

// Vertex Shader Injection (Flow + Displacement)
const vertexShaderReplace = `
uniform float uTime;
uniform vec2 uMouse;

${fbmNoiseChunk}

void main() {
    // Standard UV
    vec2 vUv = uv;
    
    // --- FLOW MAPPING ---
    // Animate UVs downward for the texture lookup
    // We modify the vUv passed to the fragment shader implicitly via the texture coordinate, 
    // but here we primarily care about displacement flow.
    
    // We want the displacement to "flow" down.
    vec2 flowUv = uv;
    flowUv.y -= uTime * 0.15; // Speed of flow

    // --- SMOOTH DISPLACEMENT ---
    // Use FBM on the flowing coordinates
    float displacement = fbm(vec3(flowUv * 3.0, uTime * 0.05));
    
    // Mouse Interaction (Lorenz Attractor-ish influence)
    // Simple push logic for now to avoid complexity in this pass
    float mouseDist = distance(uv, uMouse * 0.5 + 0.5); // Approx
    float mouseInfluence = smoothstep(0.3, 0.0, mouseDist) * 0.5;
    
    // Apply Displacement
    // Only displace along Normal
    vec3 newPos = position + normal * (displacement * 0.8 + mouseInfluence);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    
    // Pass varying if needed, but MeshPhysicalMaterial handles most
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
    vViewPosition = -mvPosition.xyz;
}
`

const Mist = () => {
  // Simple particle system for mist at the bottom
  const count = 500
  const mesh = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = -8 + Math.random() * 4 // Bottom of waterfall
      const z = (Math.random() - 0.5) * 5
      temp[i * 3] = x
      temp[i * 3 + 1] = y
      temp[i * 3 + 2] = z
    }
    return temp
  }, [])

  useFrame((state) => {
    const { clock } = state
    const time = clock.getElapsedTime()
    // animate particles roughly
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.05
      // Wiggle
      mesh.current.position.y = Math.sin(time) * 0.2
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
          args={[particles, 3]} // Fixed: Explicit args
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#a78bfa" // Light violet mist
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}


export default function Waterfall() {
  const texture = useTexture('/textures/waterfall.jpg')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  // Using any to avoid strict definition mismatches since we are patching shaders
  const materialRef = useRef<any>(null!)
  const { size } = useThree()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), [])

  useFrame((state) => {
    const { clock, mouse } = state
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uMouse.value.lerp(mouse, 0.05)

  })

  const onBeforeCompile = (shader: any) => { // Fixed: using any for shader type
    shader.uniforms.uTime = uniforms.uTime
    shader.uniforms.uMouse = uniforms.uMouse

    // Inject custom logic into Vertex Shader
    // Replaces the standard #include <begin_vertex> with our logic + the original
    // But since we want to OVERRIDE the position output substantially, we replace main logic carefully.

    // Easier approach: Inject functions at top, and modify 'begin_vertex' chunk
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
            #include <common>
            uniform float uTime;
            uniform vec2 uMouse;
            ${fbmNoiseChunk}
            `
    )

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
            // --- CUSTOM DISPLACEMENT LOGIC ---
            vec2 flowUv = uv;
            flowUv.y -= uTime * 0.2; // Flow speed
            
            float d = fbm(vec3(flowUv * 4.0, uTime * 0.1));
            
            // Masking: Taper edges so it blends
            float mask = smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x);
            
            // Mouse Influence
            vec2 aspect = vec2(1.0, 1.0); // Simplified
            float mouseDist = distance(uv, uMouse * 0.5 + 0.5);
            float influence = smoothstep(0.2, 0.0, mouseDist);

            vec3 transformed = vec3( position );
            
            // Apply straight displacement
            float totalDisplacement = (d * 0.5 + influence * 0.3) * mask;
            
            // Push out along normal
            transformed += objectNormal * totalDisplacement;
            `
    )
  }

  return (
    <group position={[0, 0, -4]} rotation={[-0.1, 0, 0]}>
      <mesh>
        {/* Visual Geometry: High Poly for Smoothness */}
        <planeGeometry args={[18, 18, 512, 512]} />

        {/* MeshTransmissionMaterial handles the juicy glass/water look + chromatic aberration */}
        <MeshTransmissionMaterial
          ref={materialRef}
          map={texture}
          color="#ffffff"
          emissive="#1a202c"
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.1}
          transmission={1.0}
          thickness={1.5}
          ior={1.33}
          chromaticAberration={0.02}
          anisotropy={0.5} // Extra water-like effect
          distortion={0.5} // Water refraction distortion
          distortionScale={0.5}
          temporalDistortion={0.2}
          onBeforeCompile={onBeforeCompile}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmospheric Mist at the base */}
      <Mist />
    </group>
  )
}
