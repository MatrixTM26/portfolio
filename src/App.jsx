import { useEffect } from 'react'
import Loader   from './components/Loader'
import Navbar   from './components/Navbar'
import Home     from './components/Home'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Gallery  from './components/Gallery'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

export default function App() {
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme')
  }, [])

  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Home />
        <Skills />
        <Projects />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
