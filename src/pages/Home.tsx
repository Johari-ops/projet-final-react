import { useRef } from 'react'
import Spells from '../components/List/Spells'
import Books from '../components/List/Books'
import Perso from '../components/List/Perso'
import Houses from '../components/List/Houses'
import ResponsiveAppBar from '../components/AppBar'

const Home = (props : any) => {
  const { darkMode, toggleDarkMode } = props;
  const booksRef = useRef<HTMLDivElement>(null);
  const persoRef = useRef<HTMLDivElement>(null);
  const housesRef = useRef<HTMLDivElement>(null);
  const spellsRef = useRef<HTMLDivElement>(null);

  // Fonction pour scroller vers une section
  const scrollToSection = (section: string) => {
    let ref;
    switch(section) {
      case 'Livres':
        ref = booksRef;
        break;
      case 'Personnages':
        ref = persoRef;
        break;
      case 'Maisons':
        ref = housesRef;
        break;
      case 'Sorts':
        ref = spellsRef;
        break;
      default:
        return;
    }
    
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <ResponsiveAppBar onNavigate={scrollToSection} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div ref={booksRef} style={{ marginTop: '100px' }}>
        <Books />
      </div>
      <div ref={persoRef}>
        <Perso />
      </div>
      <div ref={housesRef} >
        <Houses />
      </div>
      <div ref={spellsRef}>
        <Spells />
      </div>
    </>
  )
}

export default Home
