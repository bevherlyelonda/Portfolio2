import { useEffect, useState } from "react";
import { getEducation } from "../services/educationService";
import "./Education.css";

function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEducation() {
      try {
        const data = await getEducation();
        setEducation(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadEducation();
  }, []);

  /* =================================
     LOADING
  ================================= */

  if (loading) {
    return (
      <section className="education education-state">
        <p>Chargement des diplômes et certificats...</p>
      </section>
    );
  }

  /* =================================
     ERROR
  ================================= */

  if (error) {
    return (
      <section className="education education-state">
        <p>Erreur : {error}</p>
      </section>
    );
  }

  return (
    <section id="education" className="education">

      {/* =================================
          HEADER
      ================================= */}

      <div className="education-heading">

        <div className="section-heading">

          <span className="section-label">
            PARCOURS ACADÉMIQUE
          </span>

          <h2>
            Diplômes <span>&</span> Certificats
          </h2>

          <div className="section-line"></div>

        </div>

      </div>


      {/* =================================
          TIMELINE
      ================================= */}

      <div className="education-container">

        <div className="education-timeline">

          {education.map((item) => {

            const isDegree = item.type === "degree";

            return (
              <article
                key={item.id}
                className={`education-item ${
                  isDegree
                    ? "education-degree"
                    : "education-certificate"
                }`}
              >

                {/* =================================
                    TIMELINE DOT
                ================================= */}

                <div className="education-dot">
                  <span></span>
                </div>


                {/* =================================
                    DATE
                ================================= */}

                <div className="education-date">

                  <span>
                    {new Date(
                      item.start_date
                    ).toLocaleDateString("fr-FR")}
                  </span>

                  <span className="education-date-separator">
                    —
                  </span>

                  <span>
                    {item.end_date
                      ? new Date(
                          item.end_date
                        ).toLocaleDateString("fr-FR")
                      : "En cours"}
                  </span>

                </div>


                {/* =================================
                    CARD
                ================================= */}

                <div className="education-card">

                  {/* TYPE */}

                  <span className="education-type">
                    {isDegree
                      ? "DIPLÔME"
                      : "CERTIFICAT"}
                  </span>


                  {/* TITRE */}

                  <h3>
                    {item.degree}
                  </h3>


                  {/* DOMAINE */}

                  {item.field_of_study && (
                    <p className="education-field">
                      {item.field_of_study}
                    </p>
                  )}


                  {/* INSTITUTION */}

                  <p className="education-institution">
                    {item.institution}
                  </p>


                  {/* DESCRIPTION */}

                  {item.description && (
                    <p className="education-description">
                      {item.description}
                    </p>
                  )}

                </div>

              </article>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Education;
