import { useEffect, useState } from "react";
import { getAbout } from "../services/aboutService";
import "./About.css";

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAbout() {
      try {
        const data = await getAbout();

        if (isMounted) {
          setAbout(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error?.message ||
            "Impossible de charger les informations."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAbout();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =================================
     CHARGEMENT
  ================================= */

  if (loading) {
    return (
      <section
        id="about"
        className="about about-state"
        aria-label="À propos"
        aria-busy="true"
      >
        <div className="about-state-content">
          <span
            className="about-state-loader"
            aria-hidden="true"
          />

          <p>
            Chargement des informations...
          </p>
        </div>
      </section>
    );
  }


  /* =================================
     ERREUR
  ================================= */

  if (error) {
    return (
      <section
        id="about"
        className="about about-state"
        aria-label="À propos"
      >
        <div className="about-state-content">

          <span
            className="about-state-icon"
            aria-hidden="true"
          >
            !
          </span>

          <p>
            Impossible de charger les informations.
          </p>

          <small>
            {error}
          </small>

        </div>
      </section>
    );
  }


  /* =================================
     DONNÉES ABSENTES
  ================================= */

  if (!about) {
    return (
      <section
        id="about"
        className="about about-state"
        aria-label="À propos"
      >
        <div className="about-state-content">

          <span
            className="about-state-icon"
            aria-hidden="true"
          >
            —
          </span>

          <p>
            Informations indisponibles.
          </p>

        </div>
      </section>
    );
  }


  return (
    <section
      id="about"
      className="about"
      aria-labelledby="about-title"
    >

      <div className="about-container">

        {/* =================================
            EN-TÊTE
        ================================= */}

        <header className="section-heading about-heading">

          <span className="section-label">
            QUI SUIS-JE ?
          </span>

          <h2 id="about-title">
            À propos{" "}
            <span className="section-title">
              de moi
            </span>
          </h2>

          <div
            className="section-line"
            aria-hidden="true"
          />

        </header>


        {/* =================================
            INTRODUCTION
        ================================= */}

        <div className="about-introduction">

          <div
            className="about-introduction-accent"
            aria-hidden="true"
          />

          <div className="about-introduction-content">

            <div className="about-roles">

              <div className="about-role">
                <span
                  className="about-role-number"
                  aria-hidden="true"
                >
                  01
                </span>

                <h3>
                  Administrateur de bases de données{" "}
                  <span>Oracle junior</span>
                </h3>
              </div>


              <div className="about-role">
                <span
                  className="about-role-number"
                  aria-hidden="true"
                >
                  02
                </span>

                <h3>
                  Data Scientist & Ingénieur IA{" "}
                  <span>en devenir</span>
                </h3>
              </div>


              <div className="about-role">
                <span
                  className="about-role-number"
                  aria-hidden="true"
                >
                  03
                </span>

                <h3>
                  Développeur
                </h3>
              </div>

            </div>


            <div className="about-introduction-divider" />


            <p className="about-biography">
              {about.biography}
            </p>

          </div>

        </div>


        {/* =================================
            CV
        ================================= */}

        {about.cv && (
          <div className="about-cv">

            <div className="about-cv-icon" aria-hidden="true">
              <span>CV</span>
            </div>


            <div className="about-cv-content">

              <span className="about-cv-label">
                DOCUMENT
              </span>

              <h3>
                Mon Curriculum Vitae
              </h3>

              <p>
                Consultez mon parcours académique,
                professionnel et mes compétences
                en détail.
              </p>

            </div>


            <a
              href={about.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="about-cv-button"
              aria-label="Ouvrir mon Curriculum Vitae dans un nouvel onglet"
            >
              <span>
                Voir mon CV
              </span>

              <span
                className="about-cv-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

          </div>
        )}

      </div>

    </section>
  );
}

export default About;