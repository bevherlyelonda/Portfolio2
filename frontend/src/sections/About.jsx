import { useEffect, useState } from "react";
import { getAbout } from "../services/aboutService";
import "./About.css";

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadAbout();
  }, []);

  if (loading) {
    return (
      <section id="about" className="about about-state">
        <p>Chargement...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="about about-state">
        <p>Erreur : {error}</p>
      </section>
    );
  }

  if (!about) {
    return (
      <section id="about" className="about about-state">
        <p>Informations indisponibles.</p>
      </section>
    );
  }

  return (
    <section id="about" className="about">

      <div className="about-container">

        {/* =================================
            EN-TÊTE
        ================================= */}

        <div className="section-heading about-heading">

          <span className="section-label">
            QUI SUIS-JE ?
          </span>

          <h2>
            À propos <span>de moi</span>
          </h2>

          <div className="section-line"></div>

        </div>


        {/* =================================
            INTRODUCTION
        ================================= */}

        <div className="about-introduction">

          <div className="about-introduction-content">

            <h3>
              Administrateur de bases de données
              <span> Oracle junior</span>
            </h3>
            <h3>
              Data Scientist & Ingénieur IA
              <span> en devenir</span>
            </h3>
            <h3>
              Développeur
            </h3>

            <p>
              {about.biography}
            </p>

          </div>

        </div>


        {/* =================================
            CV
        ================================= */}

        {about.cv && (
          <div className="about-cv">

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
                plus en détail.
              </p>

            </div>

            <a
              href={about.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="about-cv-button"
            >
              Voir mon CV
              <span>↗</span>
            </a>

          </div>
        )}

      </div>

    </section>
  );
}

export default About;