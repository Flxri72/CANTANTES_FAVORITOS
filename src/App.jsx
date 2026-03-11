import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const artists = [
  {
    id: 1,
    name: "Álvaro Díaz",
    image: "Alvarodiaz.png",
    description: "Artista puertorriqueño reconocido por su estilo alternativo dentro del rap y la música urbana.",
    album: "Felicilandia",
    color: "#8B5CF6"
  },
  {
    id: 2,
    name: "Bad Bunny",
    image: "Badbunny.png",
    description: "Uno de los artistas más influyentes del reggaeton y la música urbana moderna.",
    album: "Un Verano Sin Ti",
    color: "#F59E0B"
  },
  {
    id: 3,
    name: "Guns N' Roses",
    image: "Guns.png",
    description: "Banda estadounidense de hard rock formada en 1985 y conocida por su energía y estilo rebelde.",
    album: "Appetite for Destruction",
    color: "#EF4444"
  },
  {
    id: 4,
    name: "Latin Mafia",
    image: "Latin.png",
    description: "Grupo musical que mezcla sonidos alternativos, indie y urbanos con una estética moderna.",
    album: "Todos los días todo el día",
    color: "#10B981"
  },
  {
    id: 5,
    name: "Queen",
    image: "queen.png",
    description: "Una de las bandas de rock más influyentes de la historia, con un estilo único liderado por Freddie Mercury.",
    album: "A Night at the Opera",
    color: "#6366F1"
  },
  {
    id: 6,
    name: "NSQK",
    image: "NSQK.png",
    description: "Artista innovador en la escena musical actual, conocido por su estilo único y su creatividad dentro de la música urbana.",
    album: "Proyecto NSQK",
    color: "#EC4899"
  }
]

const musicSymbols = ['♪', '♫', '♬', '♩', '🎵', '🎶']

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [notes, setNotes] = useState([])
  const noteIdRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      const newNote = {
        id: noteIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        symbol: musicSymbols[Math.floor(Math.random() * musicSymbols.length)],
        createdAt: Date.now()
      }
      
      setNotes(prev => [...prev.slice(-30), newNote])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setNotes(prev => prev.filter(note => Date.now() - note.createdAt < 3000))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="cursor-notes">
        {notes.map(note => (
          <motion.span
            key={note.id}
            className="cursor-note"
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ 
              opacity: 0, 
              scale: 1.5,
              y: -50,
              x: (Math.random() - 0.5) * 100
            }}
            transition={{ duration: 3, ease: "easeOut" }}
            style={{ 
              left: note.x, 
              top: note.y,
              position: 'fixed',
              pointerEvents: 'none',
              fontSize: '1.5rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            {note.symbol}
          </motion.span>
        ))}
      </div>

      <header className="header">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="logo-icon">🎵</span>
          <span className="logo-text">MusicHub</span>
        </motion.div>
        <nav className="nav">
          <motion.a 
            href="#" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >Inicio</motion.a>
          <motion.a 
            href="#" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >Artistas</motion.a>
          <motion.a 
            href="#" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >Géneros</motion.a>
        </nav>
      </header>

      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-title">
            Mis <span className="gradient-text">Músicos</span> Favoritos
          </h1>
          <p className="hero-subtitle">
            Descubre los artistas que han definido mi experiencia musical. 
            Desde el urbano hasta el rock clásico.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{artists.length}</span>
              <span className="stat-label">Artistas</span>
            </div>
            <div className="stat">
              <span className="stat-number">6</span>
              <span className="stat-label">Álbumes</span>
            </div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Pasión</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="artists-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Galería de Artistas</h2>
          <p className="section-subtitle">Explora la colección de mis favoritos</p>
        </motion.div>

        <div className="artists-grid">
          {artists.map((artist, index) => (
            <ArtistCard key={artist.id} artist={artist} index={index} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>🎶 Hecho con pasión por la música</p>
      </footer>
    </div>
  )
}

function ArtistCard({ artist, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="artist-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--accent-color': artist.color }}
    >
      <div className="card-glow" style={{ background: artist.color }}></div>
      <div className="card-image-container">
        <motion.img 
          src={artist.image} 
          alt={artist.name}
          className="card-image"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="card-overlay"></div>
      </div>
      <div className="card-content">
        <motion.h3 
          className="card-title"
          animate={{ color: isHovered ? artist.color : '#fff' }}
        >
          {artist.name}
        </motion.h3>
        <p className="card-description">{artist.description}</p>
        <div className="card-album">
          <span className="album-label">Álbum representativo</span>
          <span className="album-name">{artist.album}</span>
        </div>
      </div>
      <motion.div 
        className="card-border"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
      />
    </motion.div>
  )
}

export default App

