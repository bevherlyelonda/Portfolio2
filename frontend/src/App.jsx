import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Tous les projets */}
        <Route path="/projects" element={<Projects />} />

        {/* Détail d'un projet */}
        <Route path="/projects/:slug" element={<ProjectDetail />} />

        {/* Me contacter */}
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;