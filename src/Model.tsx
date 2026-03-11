import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef, type JSX } from 'react'
import * as THREE from 'three'

export default function Model(props: JSX.IntrinsicElements['group']) {

const groupRef = useRef<THREE.Group>(null!)

const { scene, animations } = useGLTF('public/models/yu_narukami_p5r.glb')

const { actions } = useAnimations(animations, groupRef)

useEffect(() => {
  if (actions ['Take 001']) {
    actions['Take 001'].play()
  }
}, [actions])

  return (
    <group ref={groupRef} {...props}>
        <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('public/models/yu_narukami_p5r.glb')