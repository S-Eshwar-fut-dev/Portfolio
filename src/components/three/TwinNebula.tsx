'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// -----------------------------------------------------------------------------
// SHADERS
// -----------------------------------------------------------------------------

const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vDisplacement;
varying float vDistCenter;

// Simplex Noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;
  vNormal = normal;
  
  // Base Position
  vec3 pos = position;
  
  // --- BIPOLAR DEFORMATION (Refined Butterfly Shape) ---
  // Sharp cones for wings. Pinch Y/Z based on X distance.
  float distX = abs(pos.x);
  
  // Power function creates the curve (trumpet shape).
  float pinch = pow(distX * 0.4, 1.2) + 0.2; 
  pos.yz *= pinch;
  
  // --- DIRECTIONAL PUSH (The "Outward" force) ---
  // Displacement Noise
  // Move noise through wings "outwards" away from center
  vec3 noisePos = pos * 0.5 - vec3(uTime * 0.5, 0.0, 0.0);
  float n = snoise(noisePos);
  
  // SHOCKWAVE ARC
  // Create a ridge of displacement at specific distance
  // This simulates the "pushed back" arc the user mentions
  float arc = smoothstep(1.5, 3.0, distX) * (1.0 - smoothstep(3.0, 4.5, distX));
  float arcDisp = arc * 1.5; // Strong push at the arc
  
  // General turbulence
  float turb = n * (0.5 + distX * 0.3); // More turbulence at edges
  
  // Apply displacement along normal
  pos += normal * (turb + arcDisp);

  vDisplacement = n;
  vDistCenter = distX; // Use X-distance for coloring logic (stripes along the wing)
  vPosition = pos;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vDisplacement;
varying float vDistCenter;

// Hash & Noise for FBM
float hash(float n) { return fract(sin(n) * 43758.5453123); }
float noise(in vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    return mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                   mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
               mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                   mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
}
float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p *= 2.02;
    f += 0.2500 * noise(p); p *= 2.03;
    f += 0.1250 * noise(p);
    return f;
}

void main() {
  // Domain Warping for Gas Texture
  // Flow outward along X
  vec3 q = vPosition * 0.5 - vec3(uTime * 0.4, 0.0, 0.0);
  float f = fbm(q);
  
  // --- COLORS (Refined) ---
  // Core: Blinding White
  // Arc: Hot Pink / Salmon Shockwave
  // Mid: Electric Blue
  // Tips: Teal / Cyan smoke
  
  vec3 cCore = vec3(2.0, 2.0, 2.0); // Super bright core
  vec3 cArc = vec3(1.0, 0.2, 0.5); // The interaction arc (Pink/Salmon)
  vec3 cWingInner = vec3(0.0, 0.5, 1.0); // Blue
  vec3 cWingOuter = vec3(0.0, 1.0, 0.8); // Teal
  
  // Use vDistCenter (distance along wing axis)
  float d = vDistCenter;
  
  // Color Mixing
  vec3 col = cCore;
  
  // The Arc Region (Distance ~2.0 - 3.0)
  float mixArc = smoothstep(1.0, 2.5, d);
  col = mix(col, cArc, mixArc);
  
  // Transition to Blue Wing (Distance ~3.0 - 5.0)
  float mixWing = smoothstep(2.5, 4.5, d);
  col = mix(col, cWingInner, mixWing);
  
  // Transition to Teal Tips (Distance > 5.0)
  float mixTips = smoothstep(4.5, 7.0, d);
  col = mix(col, cWingOuter, mixTips);
  
  // --- LIGHTING ARC / SHOCKWAVE DETAIL ---
  // Add intense brightness where the noise is high + specific distance
  // This creates those "filaments" of light
  float filaments = smoothstep(0.4, 0.8, f);
  col += vec3(0.8, 0.9, 1.0) * filaments * 0.5;
  
  // --- OPACITY ---
  // Fade center (let light shine through) and fade far edges
  float alpha = 1.0;
  
  // Fade very center to handle intersection with light
  // alpha *= smoothstep(0.0, 0.5, d); 
  
  // Fade outer tips primarily
  alpha *= 1.0 - smoothstep(5.5, 7.5, d);
  
  // Noise modulation for transparency (wispy look)
  alpha *= 0.5 + 0.5 * f;
  
  // Fresnel for volumetric feel
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDir, vNormal), 2.0);
  alpha += fresnel * 0.4;
  
  gl_FragColor = vec4(col, alpha * 0.9);
}
`

export default function TwinNebula() {
    const meshRef = useRef<THREE.Mesh>(null!)

    const material = useMemo(
        () =>
            new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    uTime: { value: 0 },
                },
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide,
                depthWrite: false,
            }),
        []
    )

    // ... imports

    useFrame((state, delta) => {
        // Throttling to ~30fps for the heavy noise calculations
        // This accumulator logic can be refined, but for now we'll just rely on the reduced geometry 
        // and efficient shader usage. To strictly throttle 30fps:
        // accumulatedTime += delta
        // if (accumulatedTime < 1/30) return
        // accumulatedTime = 0

        // However, linear interpolation looks smoother. 
        // Let's stick to full frame updates but with reduced geometry first.

        material.uniforms.uTime.value = state.clock.elapsedTime

        // Slowly rotate the whole nebula
        if (meshRef.current) {
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 6]}> {/* Diagonal tilt matching reference */}
            <mesh ref={meshRef}>
                {/* Huge sphere deformed into hourglass */}
                {/* Reduced radius to 4.5 for proper scale */}
                {/* OPTIMIZATION: Reduced segments from 192 -> 96 for mobile performance */}
                <sphereGeometry args={[4.5, 96, 96]} />
                <primitive object={material} attach="material" />
            </mesh>
// ... rest of component

            {/* Intense Core Light - Hidden sphere, just light */}
            <pointLight position={[0, 0, 0]} intensity={3.0} color="#ffffff" distance={25} decay={2.2} />

            {/* Central Star Obscuration (Bright Core) */}
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
        </group>
    )
}
