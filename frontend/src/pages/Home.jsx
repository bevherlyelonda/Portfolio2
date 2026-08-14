import Presentation from "../sections/Presentation";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Education from "../sections/Education";
import Languages from "../sections/Languages";
import Contact from "../sections/Contact";

function Home() {
  return (
    <main className="home">

      {/* =================================
          PRÉSENTATION / HERO
      ================================= */}
      <Presentation />


      {/* =================================
          À PROPOS
      ================================= */}
      <About />


      {/* =================================
          COMPÉTENCES
      ================================= */}
      <Skills />


      {/* =================================
          EXPÉRIENCES
      ================================= */}
      <Experience />


      {/* =================================
          PROJETS
      ================================= */}
      <Projects />


      {/* =================================
          FORMATION
      ================================= */}
      <Education />


      {/* =================================
          LANGUES
      ================================= */}
      <Languages />


      {/* =================================
          CONTACT
      ================================= */}
      <Contact />

    </main>
  );
}

export default Home;