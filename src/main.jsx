import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, Clock, FlowerLotus, InstagramLogo, MapPin, Plus, Sparkle, WhatsappLogo, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import lumenLogo from './assets/lumen-logo.svg'
import lumenLogoLight from './assets/lumen-logo-light.svg'
import lumenMark from './assets/lumen-mark.svg'
import './styles/index.css'

const images = {
  hero: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1500&q=88',
  detail: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=88',
  editorial: 'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1100&q=88',
  interior: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=88',
  texture: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1100&q=88',
  hands: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=88',
}

const services = [
  { title: 'Corte de cabello', detail: 'Corte, lavado y peinado', price: 'Desde ₡38.000' },
  { title: 'Color y balayage', detail: 'Color, luces y brillo', price: 'Desde ₡62.000' },
  { title: 'Faciales y cuidado de piel', detail: 'Limpieza, masaje y cuidado', price: 'Desde ₡45.000' },
]

const ritualSlides = [
  { image: images.editorial, alt: 'Flores y texturas orgánicas en una composición editorial', label: 'Materia · luz · movimiento' },
  { image: images.texture, alt: 'Cuidado de la piel y textura suave en una escena editorial', label: 'Cuidado · calma · detalle' },
  { image: images.hands, alt: 'Manos realizando un cuidado de belleza', label: 'Técnica · atención · presencia' },
]

const visitSteps = [
  { number: '01', title: 'Llegas', detail: 'Un espacio tranquilo, una bebida fría y unos minutos para bajar el ritmo.', icon: FlowerLotus },
  { number: '02', title: 'Conversamos', detail: 'Escuchamos lo que buscas, vemos referencias y encontramos tu punto de partida.', icon: Sparkle },
  { number: '03', title: 'Creamos', detail: 'Tu ritual toma forma con detalle, técnica y una mirada que te reconoce.', icon: ArrowRight },
]

const notes = [
  { category: 'Cuidado', title: 'El brillo empieza antes del color', detail: 'Pequeños gestos para que tu cabello se sienta tan bien como se ve.', reading: 'Antes de elegir un tono, el cabello agradece una rutina sencilla: hidratación constante, menos calor directo y productos que respeten su textura. Llegar con el cabello cuidado ayuda a que el color se vea luminoso y se sienta ligero.', image: images.texture },
  { category: 'Inspiración', title: 'La belleza de dejar espacio', detail: 'Sobre cortes que acompañan el movimiento natural y no lo esconden.', reading: 'Un buen corte no tiene que imponerse. Observa cómo cae tu cabello cuando está en movimiento y piensa en la forma que quieres acompañar. Esa conversación entre tu textura y el corte es el punto de partida para un resultado fácil de llevar.', image: images.editorial },
  { category: 'Ritual', title: 'Manos, tiempo y atención', detail: 'Una pausa breve puede cambiar la forma en que vuelves a mirarte.', reading: 'Unos minutos de cuidado consciente pueden convertirse en una pausa real durante el día. Masajea suavemente tus manos, hidrata la piel y deja el teléfono a un lado. Lo pequeño también puede sentirse especial cuando le damos tiempo.', image: images.hands },
]

const whatsappUrl = 'https://wa.me/50670000000?text=Hola%20LUMEN%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20una%20cita.'

function BrandLogo({ light = false }) {
  return <img className="brand-logo" src={light ? lumenLogoLight : lumenLogo} alt="LUMEN Atelier" />
}

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Header({ onBook }) {
  const [open, setOpen] = React.useState(false)
  return (
    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="LUMEN Atelier, inicio"><BrandLogo /></a>
      <nav className={open ? 'nav-links nav-links--open' : 'nav-links'} aria-label="Navegación principal">
        <a href="#visita" onClick={() => setOpen(false)}>Cómo funciona</a>
        <a href="#servicios" onClick={() => setOpen(false)}>Servicios</a>
        <a href="#estudio" onClick={() => setOpen(false)}>Conócenos</a>
      </nav>
      <button className="button button--dark header-cta" onClick={onBook}>Reservar <ArrowUpRight size={16} weight="bold" /></button>
      <button className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <span className="menu-lines"><i /><i /></span>}
      </button>
    </header>
  )
}

function HeroVisual() {
  const ref = React.useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 })
  const handleMove = (event) => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = ref.current.getBoundingClientRect()
    x.set((event.clientX - bounds.left) / bounds.width - 0.5)
    y.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <div className="hero-visual" ref={ref} onMouseMove={handleMove} onMouseLeave={reset}>
      <motion.div className="image-stack" style={{ rotateX, rotateY }}>
        <div className="image-back image-frame"><img src={images.detail} alt="Detalle de color y cabello en el estudio" /></div>
        <div className="image-main image-frame"><img src={images.hero} alt="Retrato editorial de una clienta de LUMEN Atelier" /></div>
        <div className="image-note"><Sparkle size={17} weight="fill" /><span>un espacio<br />para volver a ti</span></div>
      </motion.div>
      <div className="hero-caption"><span>01 — 04</span><span>San José · Costa Rica</span></div>
    </div>
  )
}

function Hero({ onBook }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Salón de belleza · San José, Costa Rica</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          Tu belleza,<br /><em>en su mejor luz.</em>
        </motion.h1>
        <motion.p className="hero-intro" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, duration: 0.65 }}>
          Cortes, color y cuidado de la piel en un espacio tranquilo. Elige tu servicio y déjanos acompañarte.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62, duration: 0.65 }}>
          <button className="button button--accent" onClick={onBook}>Reservar una cita <ArrowUpRight size={18} weight="bold" /></button>
          <a className="text-link" href="#visita">Cómo funciona <ArrowDown size={15} weight="bold" /></a>
        </motion.div>
        <motion.div className="hero-aside" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <span className="status-dot" /> Agenda abierta para septiembre
        </motion.div>
      </div>
      <HeroVisual />
    </section>
  )
}

function RitualSection() {
  return (
    <section className="ritual section-shell" id="ritual">
      <div className="ritual-copy-grid"><Reveal className="ritual-heading"><p className="eyebrow">Sobre LUMEN</p><h2>Belleza hecha<br /><em>a tu medida.</em></h2></Reveal><Reveal delay={0.1} className="ritual-body"><p>Te escuchamos, revisamos lo que buscas y recomendamos lo que mejor se adapta a ti. Sin fórmulas repetidas, sin prisas.</p><a className="arrow-link" href="#visita">Conoce tu visita <ArrowUpRight size={16} /></a></Reveal></div>
      <Reveal delay={0.2} className="ritual-gallery-wide"><RitualCarousel /></Reveal>
    </section>
  )
}

function RitualCarousel() {
  const loopSlides = [...ritualSlides, ...ritualSlides]
  return <div className="ritual-carousel ritual-carousel--wide" role="region" aria-label="Galería continua de LUMEN"><div className="ritual-track">{loopSlides.map((slide, index) => <div className="ritual-slide image-frame" key={`${slide.image}-${index}`}><img src={slide.image} alt={index < ritualSlides.length ? slide.alt : ''} aria-hidden={index >= ritualSlides.length} /><span className="image-label">{slide.label}</span></div>)}</div><div className="carousel-caption"><span>Detalles de LUMEN</span><span>Galería en movimiento</span></div></div>
}

function Services({ onBook }) {
  return (
    <section className="services section-shell" id="servicios">
      <Reveal className="section-title-row"><div><p className="eyebrow">Servicios del salón</p><h2>Elige cómo<br /><em>quieres cuidarte.</em></h2></div><p className="section-description">Aquí encuentras nuestros servicios principales. Si no sabes cuál elegir, escríbenos y te orientamos. Precios demostrativos en colones costarricenses.</p></Reveal>
      <div className="service-list">
        {services.map((service, index) => <Reveal delay={index * 0.08} key={service.title} className="service-row"><span className="service-index">0{index + 1}</span><div className="service-name"><h3>{service.title}</h3><p>{service.detail}</p></div><span className="service-price">{service.price}</span><button className="icon-button" aria-label={`Reservar ${service.title}`} onClick={onBook}><Plus size={19} /></button></Reveal>)}
      </div>
      <p className="demo-note">* Precios y disponibilidad son ilustrativos en esta demo.</p>
    </section>
  )
}

function VisitSection() {
  return (
    <section className="visit-section section-shell" id="visita">
      <Reveal className="visit-intro"><p className="eyebrow">Cómo funciona</p><h2>Tu visita,<br /><em>paso a paso.</em></h2><p>Una cita en LUMEN es sencilla: nos cuentas qué necesitas, elegimos el servicio y nos encargamos del resto.</p></Reveal>
      <div className="visit-steps">
        {visitSteps.map(({ number, title, detail, icon: Icon }, index) => <Reveal key={title} delay={index * 0.12} className="visit-step"><div className="visit-step-top"><span>{number}</span><Icon size={21} weight="regular" /></div><h3>{title}</h3><p>{detail}</p></Reveal>)}
      </div>
    </section>
  )
}

function GallerySection() {
  return (
    <section className="gallery-section">
      <div className="gallery-inner section-shell">
        <Reveal className="gallery-heading"><p className="eyebrow">El ambiente</p><h2>Un salón para<br /><em>sentirte bien.</em></h2><p>Luz natural, herramientas cuidadas y detalles pensados para que disfrutes tu tiempo aquí.</p></Reveal>
        <div className="gallery-grid">
          <Reveal className="gallery-tile gallery-tile--tall image-frame"><img src={images.hands} alt="Detalle de manos y cuidado en un ritual de belleza" /><span>el gesto preciso</span></Reveal>
          <Reveal delay={0.12} className="gallery-tile gallery-tile--wide image-frame"><img src={images.texture} alt="Textura orgánica y luz suave en una escena editorial" /><span>luz natural · materia viva</span></Reveal>
          <Reveal delay={0.2} className="gallery-pullquote"><FlowerLotus size={25} weight="light" /><p>“Lo que hacemos afuera también puede ser una forma de cuidarnos adentro.”</p></Reveal>
        </div>
      </div>
    </section>
  )
}

function NoteDialog({ note, onClose }) {
  return <AnimatePresence>{note && <motion.div className="note-dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.article className="note-dialog" role="dialog" aria-modal="true" aria-labelledby="note-dialog-title" initial={{ opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.25 }} onMouseDown={(event) => event.stopPropagation()}><div className="note-dialog-image image-frame"><img src={note.image} alt="" /></div><div className="note-dialog-copy"><p className="eyebrow">{note.category}</p><h2 id="note-dialog-title">{note.title}</h2><p>{note.reading}</p><button className="icon-button" aria-label="Cerrar nota" onClick={onClose}><X size={20} /></button></div></motion.article></motion.div>}</AnimatePresence>
}

function NotesSection() {
  const [selectedNote, setSelectedNote] = React.useState(null)
  return (
    <>
      <section className="notes-section section-shell">
      <Reveal className="section-title-row"><div><p className="eyebrow">Consejos y novedades</p><h2>Ideas para<br /><em>cuidarte en casa.</em></h2></div><a className="arrow-link" href="#top">Volver arriba <ArrowUpRight size={16} /></a></Reveal>
      <div className="notes-grid">
        {notes.map((note, index) => <Reveal key={note.title} delay={index * 0.1} className="note-card"><div className="note-image image-frame"><img src={note.image} alt="" /><span>{note.category}</span></div><div className="note-copy"><p>{note.detail}</p><h3>{note.title}</h3><button className="note-readmore" onClick={() => setSelectedNote(note)} aria-label={`Leer nota: ${note.title}`}>Leer nota <ArrowUpRight size={15} /></button></div></Reveal>)}
      </div>
      </section>
      <NoteDialog note={selectedNote} onClose={() => setSelectedNote(null)} />
    </>
  )
}

function StudioSection() {
  return (
    <section className="studio section-shell" id="estudio">
      <Reveal className="studio-image image-frame"><img src={images.interior} alt="Interior luminoso y sereno del estudio LUMEN" /><div className="studio-stamp"><img src={lumenMark} alt="Isotipo LUMEN Atelier" /></div></Reveal>
      <Reveal delay={0.15} className="studio-copy"><p className="eyebrow">Conócenos</p><h2>Un lugar para<br /><em>hacer pausa.</em></h2><p>Texturas naturales, luz honesta y un equipo que cree en el detalle. Ven por el resultado; quédate por cómo se siente.</p><div className="studio-meta"><span><MapPin size={18} /> Barrio Escalante<br />San José, Costa Rica</span><span><InstagramLogo size={18} /> @lumen.atelier</span></div></Reveal>
    </section>
  )
}

function BookingSheet({ open, onClose }) {
  const [status, setStatus] = React.useState('idle')
  const handleSubmit = (event) => { event.preventDefault(); setStatus('loading'); window.setTimeout(() => setStatus('success'), 700) }
  return <AnimatePresence>{open && <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.aside className="booking-sheet" role="dialog" aria-modal="true" aria-labelledby="booking-title" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 250 }} onMouseDown={(event) => event.stopPropagation()}><div className="sheet-header"><div><p className="eyebrow">Primera conversación</p><h2 id="booking-title">Comienza aquí.</h2></div><button className="icon-button" aria-label="Cerrar reserva" onClick={onClose}><X size={20} /></button></div>{status === 'success' ? <div className="booking-success"><span className="success-mark"><Sparkle size={20} weight="fill" /></span><h3>Recibimos tu señal.</h3><p>Te escribiremos pronto para encontrar el servicio ideal para ti.</p><button className="text-link" onClick={onClose}>Volver al estudio <ArrowUpRight size={16} /></button></div> : <form onSubmit={handleSubmit} className="booking-form"><label>Tu nombre<input required name="name" placeholder="Cómo te gusta que te llamen" /></label><label>¿Qué servicio te interesa?<select required defaultValue=""><option value="" disabled>Elige una opción</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label><label>Tu correo<input required type="email" name="email" placeholder="nombre@correo.com" /></label><button className="button button--accent button--full" disabled={status === 'loading'}>{status === 'loading' ? 'Preparando tu cita…' : 'Enviar solicitud'} <ArrowUpRight size={18} weight="bold" /></button><p className="form-note">Demo interactiva: no se enviarán datos reales.</p></form>}</motion.aside></motion.div>}</AnimatePresence>
}

function WhatsAppButton() {
  return <a className="whatsapp-fab" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp"><WhatsappLogo size={22} weight="fill" /><span>Consultar por WhatsApp</span></a>
}

function Footer({ onBook }) {
  return <footer className="footer section-shell"><div className="footer-grid"><div className="footer-brand"><a className="brand-link brand-link--footer" href="#top"><BrandLogo light /></a><p>Salón de belleza para cortes, color y cuidado de la piel en San José.</p><button className="footer-booking" onClick={onBook}>Reservar una cita <ArrowUpRight size={15} /></button></div><div className="footer-column"><h3>Explora</h3><a href="#visita">Cómo funciona</a><a href="#servicios">Servicios</a><a href="#estudio">Conócenos</a></div><div className="footer-column footer-contact"><h3>Visítanos</h3><p><MapPin size={16} /> Barrio Escalante<br />San José, Costa Rica</p><p><Clock size={16} /> Lunes a sábado<br />9:00–18:00 · demo</p><a href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsappLogo size={16} weight="fill" /> WhatsApp · demo</a><a href="#estudio"><InstagramLogo size={16} /> @lumen.atelier</a></div></div><div className="footer-bottom"><span>© 2024 LUMEN Atelier · Demo conceptual</span><span>Precios y disponibilidad ilustrativos en ₡</span></div></footer>
}

function App() {
  const [bookingOpen, setBookingOpen] = React.useState(false)
  React.useEffect(() => { document.body.style.overflow = bookingOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [bookingOpen])
  return <><Header onBook={() => setBookingOpen(true)} /><main><Hero onBook={() => setBookingOpen(true)} /><RitualSection /><VisitSection /><GallerySection /><Services onBook={() => setBookingOpen(true)} /><NotesSection /><StudioSection /></main><Footer onBook={() => setBookingOpen(true)} /><WhatsAppButton /><BookingSheet open={bookingOpen} onClose={() => setBookingOpen(false)} /></>
}

const rootElement = document.getElementById('root')
const root = window.__lumenRoot || createRoot(rootElement)
window.__lumenRoot = root
root.render(<App />)
