//import { OrbitControls } from '@react-three/drei'
import { Html } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

import { EffectComposer, Noise, Scanline, Vignette, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Model from './Model'

export function Scene() {
    const pointLightRef = useRef<THREE.PointLight>(null!);

    const [animActive, setAnimActive] = useState('Idle');

// on fait un tableau des animations avec 2 pripriété : id et label (id sert à appeler l'animation dans le model et label sert à la nommé dans l'application elle même) pour pouvoir l'appeler avec un .map
    const animations = [
    { id : 'Idle', label : 'Idle' },
    { id : 'Dance', label : 'Danse' },
    { id : 'Flip', label : 'Salto' },
    { id : 'Kick', label : 'Coup de pied' },
    { id : 'Magic', label : 'Magie' },
    { id : 'Phone', label : 'Téléphone' }
    ];

    return (
        <>        
// l'effect composer est l'effet visiuel pour donner l'effet télé comme dans persona 4    
            <EffectComposer>
                <Scanline 
                    blendFunction={BlendFunction.OVERLAY} 
                    density={1.5} 
                    opacity={0.2} 
                />
                <Noise 
                    opacity={0.15} 
                    blendFunction={BlendFunction.SOFT_LIGHT} 
                />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.5} />
            </EffectComposer>
// on utilise le html pour faire une ui dans la scène 3d et on utilise le .map pour appeler le tableau des animations et créer les boutons avec le nom des label et le id pour appeler la bonne animation
            <Html position={[-7, 2.5, 0]}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {animations.map((anim) => (
                    <button key={anim.id}
                    className='p4-ui-element'
                    onClick={() => setAnimActive(anim.id)}>

                        {anim.label}
                    </button>
                ))}
                </div>
            </Html>
//ici on place les lumières et le model dans la scène avec le animActive qui change l'animation avec le bouton correspondant
            <Model currentAnimation={animActive} position={[0, -1, 2.8]} scale={1} />
            {/* <OrbitControls /> */}
            <ambientLight intensity={0.5} />
            <pointLight ref={pointLightRef} position={[2, 2, 2]} intensity={10} color="#ffffff" />
        </>
    )
}