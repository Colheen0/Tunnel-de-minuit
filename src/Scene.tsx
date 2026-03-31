//import { OrbitControls } from '@react-three/drei'
import { Html } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

import { EffectComposer, Noise, Scanline, Vignette, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Model from './Model'

export function Scene() {
    const pointLightRef = useRef<THREE.PointLight>(null!);

    const [animActive, setAnimActive] = useState('idle');

    const animations = [
    { id : 'idle', label : 'Idle' },
    { id : 'Dance', label : 'Danse' },
    { id : 'Flip', label : 'Salto' },
    { id : 'Kick', label : 'Coup de pied' },
    { id : 'Magic', label : 'Magie' },
    { id : 'Phone', label : 'Téléphone' }
    ];

    return (
        <>            
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

            <Model currentAnimation={animActive} position={[0, -1, 2.8]} scale={1} />
            {/* <OrbitControls /> */}
            <ambientLight intensity={0.5} />
            <pointLight ref={pointLightRef} position={[2, 2, 2]} intensity={10} color="#ffffff" />
        </>
    )
}