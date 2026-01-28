export const starfieldVertexShader = `
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

export const starfieldFragmentShader = `
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
