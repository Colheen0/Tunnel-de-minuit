import './App.css'
import { Scene } from './Scene'
import { Music } from './music'
import { Tunnel } from './tunnel'
import { Canvas } from '@react-three/fiber'

function App() {
//on place nos différents éléments ainsi l'effet fog sur la scène
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Music /> 
      <Canvas camera={{ position: [0, 0, 5] }}>
        <fog attach="fog" args={['#111', 5, 15]} />
        <Tunnel />
        <Scene />
      </Canvas>
    </div>
  )
}

export default App
