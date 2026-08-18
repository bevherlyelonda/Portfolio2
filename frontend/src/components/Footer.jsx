import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAbout } from "../services/aboutService";
import "./Footer.css";

function Footer() {
  const [about, setAbout] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* =================================
     CHARGEMENT DES INFORMATIONS
  ================================= */

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des informations du footer :",
          error
        );
      }
    }

    loadAbout();
  }, []);

  /* =================================
     ANNÉE ACTUELLE
  ================================= */

  const currentYear = new Date().getFullYear();

  /* =================================
     NAVIGATION VERS UNE SECTION
  ================================= */

  const handleSectionClick = (sectionId) => {
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

  /* =================================
     RETOUR EN HAUT
  ================================= */

  const handleBackToTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    navigate("/");
  };

  return (
    <footer className="footer">

      {/* =================================
          EFFET LUMINEUX
      ================================= */}

      <div
        className="footer-glow"
        aria-hidden="true"
      />


      {/* =================================
          CONTENU PRINCIPAL
      ================================= */}

      <div className="footer-container">

        {/* =================================
            IDENTITÉ
        ================================= */}

        <div className="footer-brand">

          <Link
            to="/"
            className="footer-logo"
            aria-label="Retour à l'accueil"
          >
            Bevherly Juvhel <span>ELONDA</span>
          </Link>

          <p className="footer-description">
            Administrateur de bases de données
            <br />
            Développeur
            <br />
            Data Scientist & Ingénieur IA en devenir
          </p>

          <p className="footer-location">
            Passionné par les bases de données,le développement, la Data Science
            et l'intelligence artificielle.
          </p>

        </div>


        {/* =================================
            NAVIGATION
        ================================= */}

        <div className="footer-navigation">

          <span className="footer-title">
            NAVIGATION
          </span>

          <button
            type="button"
            onClick={() => handleSectionClick("about")}
            className="footer-nav-button"
          >
            À propos
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("skills")}
            className="footer-nav-button"
          >
            Compétences
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("experience")}
            className="footer-nav-button"
          >
            Expériences
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("projects")}
            className="footer-nav-button"
          >
            Projets
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("education")}
            className="footer-nav-button"
          >
            Diplômes et Certificats
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("languages")}
            className="footer-nav-button"
          >
            Compétences linguistiques
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("contact")}
            className="footer-nav-button"
          >
            Contact
          </button>

        </div>


        {/* =================================
            CONTACT
        ================================= */}

        <div className="footer-contact">

          <span className="footer-title">
            EMAIL
          </span>

          {about?.email ? (
            <>
              <a
                href={`mailto:${about.email}`}
                className="footer-contact-link"
              >
                {about.email}
              </a>

              <button
                type="button"
                onClick={() => handleSectionClick("contact")}
                className="footer-contact-button"
              >
                Me contacter
                <span aria-hidden="true">→</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => handleSectionClick("contact")}
              className="footer-contact-button"
            >
              Me contacter
              <span aria-hidden="true">→</span>
            </button>
          )}

        </div>


        {/* =================================
            RÉSEAUX SOCIAUX
        ================================= */}

        <div className="footer-social">

          <span className="footer-title">
            RÉSEAUX
          </span>

          <div className="footer-social-links">

            {/* =================================
                LINKEDIN
            ================================= */}

            {about?.linkedin_url && (
              <a
                href={about.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visiter mon profil LinkedIn"
                className="footer-social-link linkedin"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.8c0-3.75-2-5.5-4.7-5.5-2.15 0-3.1 1.18-3.63 2v-1.8H9.2V21h3.47v-6.2c0-1.64.3-3.23 2.35-3.23 2.02 0 2.05 1.88 2.05 3.34V21H21v-7.2Z" />
                </svg>
              </a>
            )}


            {/* =================================
                GITHUB
            ================================= */}

            {about?.github_url && (
              <a
                href={about.github_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visiter mon profil GitHub"
                className="footer-social-link github"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.16c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.28-1.29-5.28-5.74 0-1.27.45-2.31 1.2-3.12-.12-.29-.52-1.48.11-3.08 0 0 .98-.31 3.17 1.19a10.9 10.9 0 0 1 5.77 0c2.19-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.79.11 3.08.75.81 1.2 1.85 1.2 3.12 0 4.46-2.71 5.45-5.29 5.74.42.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                </svg>
              </a>
            )}

          </div>

          <p className="footer-social-text">
            Retrouvez mes projets et mon parcours professionnel
            sur mes réseaux.
          </p>

        </div>

      </div>


      {/* =================================
          FOOTER BOTTOM
      ================================= */}

      <div className="footer-bottom">

        <div className="footer-bottom-content">

          <p>
            © {currentYear}{" "}
            <span>Bevherly Juvhel ELONDA</span>.
            Tous droits réservés.
          </p>

          <p className="footer-credit">
            Conçu & développé avec passion.
          </p>

        </div>


        {/* =================================
            RETOUR EN HAUT
        ================================= */}

        <button
          type="button"
          className="footer-back-top"
          onClick={handleBackToTop}
          aria-label="Retour en haut de la page"
          title="Retour en haut"
        >
          ↑
        </button>

      </div>

    </footer>
  );
}

export default Footer;