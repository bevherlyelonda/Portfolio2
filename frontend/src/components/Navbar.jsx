import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* =================================
     INITIALISATION DU THÈME
  ================================= */

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      setLightMode(true);
    } else {
      document.documentElement.classList.remove("light");
      setLightMode(false);
    }
  }, []);

  /* =================================
     CHANGER LE THÈME
  ================================= */

  const toggleTheme = () => {
    const newLightMode = !lightMode;

    setLightMode(newLightMode);

    if (newLightMode) {
      document.documentElement.classList.add("light");
      localStorage.setItem("portfolio-theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("portfolio-theme", "dark");
    }
  };

  /* =================================
     FERMER LE MENU MOBILE
  ================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =================================
     LOGO
  ================================= */

  const handleLogoClick = () => {
    closeMenu();

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* =================================
     NAVIGATION SECTIONS
  ================================= */

  const handleSectionClick = (sectionId) => {
    closeMenu();

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

    navigate(`/#${sectionId}`);
  };

  return (
    <header className="navbar">

      <div className="container">

        {/* =================================
            LOGO
        ================================= */}

        <Link
          to="/"
          className="logo"
          onClick={handleLogoClick}
          aria-label="Retour au début de l'accueil"
        >
          BE
        </Link>


        {/* =================================
            NAVIGATION
        ================================= */}

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


        {/* =================================
            ACTIONS NAVBAR
        ================================= */}

        <div className="navbar-actions">

          {/* THÈME */}

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              lightMode
                ? "Activer le mode sombre"
                : "Activer le mode clair"
            }
            title={
              lightMode
                ? "Mode sombre"
                : "Mode clair"
            }
          >
            <span className="theme-icon" aria-hidden="true">
              {lightMode ? "☀" : "☾"}
            </span>
          </button>


          {/* MENU MOBILE */}

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

      </div>

    </header>
  );
}

export default Navbar;