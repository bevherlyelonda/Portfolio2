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
        setExperiences(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadExperiences();
  }, []);

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
            Un parcours construit autour de l'administration
            des bases de données, des systèmes informatiques
            et du développement de compétences en Data Science
            et Intelligence Artificielle.
          </p>

        </div>


        {/* =================================
            TIMELINE
        ================================= */}

        {experiences.length > 0 ? (
          <div className="experience-timeline">

            {experiences.map((experience, index) => (

              <article
                key={experience.id}
                className="experience-item"
              >

                {/* POINT SUR LA TIMELINE */}

                <div className="experience-marker">
                  <span></span>
                </div>


                {/* CONTENU */}

                <div className="experience-card">

                  <div className="experience-card-header">

                    <div>

                      <span className="experience-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3>
                        {experience.position}
                      </h3>

                      <h4>
                        {experience.organization}
                      </h4>

                    </div>

                    <span className="experience-date">
                      {experience.start_date}
                      {" — "}
                      {experience.end_date}
                    </span>

                  </div>


                  <div className="experience-divider"></div>


                  <p className="experience-description">
                    {experience.description}
                  </p>

                </div>

              </article>

            ))}

          </div>
        ) : (
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