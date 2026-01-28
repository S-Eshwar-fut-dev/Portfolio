import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface UseCustomShaderProps {
    vertexShader: string
    fragmentShader: string
    uniforms?: Record<string, any>
    transparent?: boolean
    depthWrite?: boolean
    blending?: THREE.Blending
    side?: THREE.Side
}

export const useCustomShader = ({
    vertexShader,
    fragmentShader,
    uniforms = {},
    transparent = true,
    depthWrite = false,
    blending = THREE.AdditiveBlending,
    side = THREE.FrontSide,
}: UseCustomShaderProps) => {
    const material = useMemo(
        () =>
            new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms,
                transparent,
                depthWrite,
                blending,
                side,
            }),
        [vertexShader, fragmentShader, uniforms, transparent, depthWrite, blending, side]
    )

    useFrame((state) => {
        if (material.uniforms.uTime) {
            material.uniforms.uTime.value = state.clock.getElapsedTime()
        }
    })

    return material
}
