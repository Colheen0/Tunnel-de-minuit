import { useState, useRef } from 'react'

export function Music() {

//on fait 2 variables d'état pour controler le style du bouton pour changer son aspect
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

//ici on fait un if qui change le style du bonton grace au variable d'avant
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

//ici on créer directement le bouton en htlm avec les noms différents en fonctions de son état ainsi que la musique utiliser qui est importer dans le html 
  return (
    <div className="music-container">
      
      <div className="p4-ui-element music-info">
        MUSIQUE JOUÉE: CORNER OF MEMORY
      </div>

      <button 
        onClick={togglePlay}
        className={`p4-ui-element music-btn ${isPlaying ? 'playing' : ''}`}
      >
        {isPlaying ? '■ STOP' : '► PLAY'}
      </button>

      <audio 
        ref={audioRef} 
        src="/music/corner-of-memories.mp3" 
        loop 
      />
      
    </div>
  )
}