import { useState, useRef } from 'react'

export function Music() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

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

  return (
    <div className="music-container">
      
      <div className="p4-ui-element music-info">
        MUSIQUE JOUÉE: CORNER OF MEMORY
      </div>

      {/* On ajoute dynamiquement la classe "playing" si isPlaying est true */}
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