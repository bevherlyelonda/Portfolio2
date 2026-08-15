import { useEffect, useState } from "react";
import { getExperiences } from "../services/experienceService";
import "./Experience.css";

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadExperiences() {
      try {
        const data = await getExperiences();

        console.log("Expériences reçues :", data);

        setExperiences(data);
      } catch (error) {
        console.error("Erreur :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadExperiences();
  }, []);

  // =================================
  // CHARGEMENT
  // =================================

  if (loading) {
    return (
      <section
        id="experience"
        className="experience experience-state"
      >
        <p>Chargement des expériences...</p>
      </section>
    );
  }

  // =================================
  // ERREUR
  // =================================

  if (error) {
    return (
      <section
        id="experience"
        className="experience experience-state"
      >
        <p>Erreur : {error}</p>
      </section>
    );
  }

  // =================================
  // AFFICHAGE
  // =================================

  return (
    <section id="experience" className="experience">

      <div className="experience-container">

        {/* =================================
            EN-TÊTE
        ================================= */}

        <div className="section-heading experience-heading">

          <span className="section-label">
            MON PARCOURS
          </span>

          <h2>
            Mes <span>expériences</span>
          </h2>

          <div className="section-line"></div>

          <p className="experience-intro">
            Découvrez mon parcours professionnel,
            mes responsabilités et les différentes
            expériences qui ont contribué à mon évolution.
          </p>

        </div>


        {/* =================================
            EXPÉRIENCES
        ================================= */}

        {experiences.length > 0 ? (

          <div className="experience-timeline">

            {experiences.map((experience, index) => (

              <article
                key={experience.id || index}
                className="experience-item"
              >

                {/* =================================
                    POINT TIMELINE
                ================================= */}

                <div
                  className="experience-marker"
                  aria-hidden="true"
                >
                  <span></span>
                </div>


                {/* =================================
                    CARTE EXPÉRIENCE
                ================================= */}

                <div className="experience-card">

                  {/* =================================
                      EN-TÊTE
                  ================================= */}

                  <div className="experience-card-header">

                    <div className="experience-card-main">

                      {/* NUMÉRO */}

                      <span className="experience-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>


                      {/* POSITION */}

                      <h3 className="experience-position">
                        {experience.position}
                      </h3>


                      {/* ORGANIZATION */}

                      <h4 className="experience-organization">
                        {experience.organization}
                      </h4>

                    </div>


                    {/* DATES */}

                    <div className="experience-date">

                      <span>
                        {experience.start_date}
                      </span>

                      <span className="experience-date-separator">
                        —
                      </span>

                      <span>
                        {experience.end_date}
                      </span>

                    </div>

                  </div>


                  {/* =================================
                      SÉPARATEUR
                  ================================= */}

                  <div
                    className="experience-divider"
                    aria-hidden="true"
                  ></div>


                  {/* =================================
                      DESCRIPTION
                  ================================= */}

                  <p className="experience-description">
                    {experience.description}
                  </p>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* =================================
             AUCUNE EXPÉRIENCE
          ================================= */

          <div className="experience-empty">

            <p>
              Aucune expérience professionnelle disponible
              pour le moment.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default Experience;