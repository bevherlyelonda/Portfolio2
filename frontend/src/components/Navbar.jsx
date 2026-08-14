import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Fermer le menu mobile
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Retour au début de la page d'accueil
  const handleLogoClick = () => {
    closeMenu();

    // Si on est déjà sur l'accueil
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Navigation vers une section
  const handleSectionClick = (sectionId) => {
    closeMenu();

    // Si on est déjà sur la page d'accueil
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // Si on est sur une autre page,
    // retour à l'accueil puis à la section
    navigate(`/#${sectionId}`);
  };

  return (
    <header className="navbar">
      <div className="container">

        {/* =========================
            LOGO
        ========================= */}
        <Link
          to="/"
          className="logo"
          onClick={handleLogoClick}
          aria-label="Retour au début de l'accueil"
        >
          BE
        </Link>


        {/* =========================
            NAVIGATION
        ========================= */}
        <nav
          id="main-navigation"
          className={menuOpen ? "active" : ""}
          aria-label="Navigation principale"
        >

          <button
            type="button"
            onClick={() => handleSectionClick("about")}
          >
            À propos
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("skills")}
          >
            Compétences
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("experience")}
          >
            Expériences
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("projects")}
          >
            Projets
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("education")}
          >
            Diplômes et Certificats
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("languages")}
          >
            Compétences linguistiques
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("contact")}
          >
            Contact
          </button>

        </nav>


        {/* =========================
            MENU MOBILE
        ========================= */}
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen
              ? "Fermer le menu"
              : "Ouvrir le menu"
          }
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;