import Navbar  from './components/Navbar'
import Home    from './components/Home'
import Skills  from './components/Skills'
import Contact from './components/Contact'
import Footer  from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
