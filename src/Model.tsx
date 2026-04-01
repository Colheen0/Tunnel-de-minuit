import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef, type JSX } from 'react'
import * as THREE from 'three'

type ModelProps = JSX.IntrinsicElements['group'] & {
  currentAnimation: string;
};

export default function Model( {currentAnimation, ...props}: ModelProps) {

const groupRef = useRef<THREE.Group>(null!)

//appel du model dans le dossier models 
const { scene, animations: baseAnimations } = useGLTF('public/models/bot.glb')

//appel des animation dans le dossier animations 
const { animations : idleAnimations } = useGLTF('public/animations/idle.glb')
const { animations : danceAnimations } = useGLTF('public/animations/dance.glb')
const { animations : kickAnimations } = useGLTF('public/animations/kick.glb')
const { animations : flipAnimations } = useGLTF('public/animations/flip.glb')
const { animations : magicAnimations } = useGLTF('public/animations/magic.glb')
const { animations : phoneAnimations } = useGLTF('public/animations/phone.glb')

//on clone les animation pour pouvoir les renommer et les utiliser
const cloneIdle = idleAnimations.length ? [idleAnimations[0].clone()] : []
const cloneDance = danceAnimations.length ? [danceAnimations[0].clone()] : []
const cloneKick = kickAnimations.length ? [kickAnimations[0].clone()] : []
const cloneFlip = flipAnimations.length ? [flipAnimations[0].clone()] : []
const cloneMagic = magicAnimations.length ? [magicAnimations[0].clone()] : []
const clonePhone = phoneAnimations.length ? [phoneAnimations[0].clone()] : []


//on renomme les animations pour pouvoir les appeler facilement dans la scène
if (cloneIdle.length) cloneIdle[0].name = 'Idle'
if (cloneDance.length) cloneDance[0].name = 'Dance'
if (cloneKick.length) cloneKick[0].name = 'Kick'
if (cloneFlip.length) cloneFlip[0].name = 'Flip'
if (cloneMagic.length) cloneMagic[0].name = 'Magic'
if (clonePhone.length) clonePhone[0].name = 'Phone'

const allAnimations = [...baseAnimations, ...cloneIdle, ...cloneDance, ...cloneKick, ...cloneFlip, ...cloneMagic, ...clonePhone]

const { actions } = useAnimations(allAnimations, groupRef)

//on utilise useEffect pour jouer l'animation sélectionnée et arrêter les autres
useEffect(() => {
  if (actions[currentAnimation]) {
    actions[currentAnimation].reset().fadeIn(0.5).play()

    return () => {
        actions[currentAnimation]?.fadeOut(0.5)
    }
  }
}, [actions, currentAnimation])

  return (
    <group ref={groupRef} {...props}>
        <primitive object={scene} />
    </group>
  )
}

//on récharge les modèles et les animations pour plus de fluidité
useGLTF.preload('public/models/bot.glb')
useGLTF.preload('public/animations/idle.glb')
useGLTF.preload('public/animations/dance.glb')
useGLTF.preload('public/animations/kick.glb')
useGLTF.preload('public/animations/flip.glb')
useGLTF.preload('public/animations/magic.glb')
useGLTF.preload('public/animations/phone.glb')