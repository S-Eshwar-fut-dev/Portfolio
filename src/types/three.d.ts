import { Object3DNode } from '@react-three/fiber'
import * as THREE from 'three'

declare module '@react-three/fiber' {
    interface ThreeElements {
        mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>
        instancedMesh: Object3DNode<THREE.InstancedMesh, typeof THREE.InstancedMesh>
        shaderMaterial: Object3DNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial> & {
            uniforms?: { [key: string]: { value: any } }
        }
    }
}
