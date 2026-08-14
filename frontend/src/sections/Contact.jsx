import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAbout } from "../services/aboutService";
import "./Contact.css";

function Contact() {
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

  /* =================================
     LOADING
  ================================= */

  if (loading) {
    return (
      <section className="contact contact-state">
        <p>Chargement des informations de contact...</p>
      </section>
    );
  }

  /* =================================
     ERROR
  ================================= */

  if (error) {
    return (
      <section className="contact contact-state">
        <p>Erreur : {error}</p>
      </section>
    );
  }

  /* =================================
     NO DATA
  ================================= */

  if (!about) {
    return (
      <section className="contact contact-state">
        <p>Informations de contact indisponibles.</p>
      </section>
    );
  }

  return (
    <section id="contact" className="contact">

      {/* =================================
          HEADER
      ================================= */}

      <div className="contact-heading">
        <div className="section-heading">

          <span className="section-label">
            CONTACT
          </span>

          <h2>
            Travaillons <span>ensemble</span>
          </h2>

          <div className="section-line"></div>

        </div>
      </div>


      {/* =================================
          CONTAINER
      ================================= */}

      <div className="contact-container">

        {/* =================================
            INTRODUCTION
        ================================= */}

        <div className="contact-intro">

          <p className="contact-eyebrow">
            UNE OPPORTUNITÉ ?
          </p>

          <h3>
            Parlons de votre projet.
          </h3>

          <p>
            Vous souhaitez échanger avec moi, discuter
            d'une opportunité professionnelle ou simplement
            entrer en contact ? Je serais ravi d'échanger
            avec vous.
          </p>

        </div>


        {/* =================================
            LOCATION
        ================================= */}

        {about.location && (
          <div className="contact-location">

            <div className="contact-location-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                />

                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                />
              </svg>
            </div>

            <div className="contact-location-content">

              <span className="contact-location-label">
                LOCALISATION
              </span>

              <p>
                {about.location}
              </p>

            </div>

          </div>
        )}


        {/* =================================
            MAIN CONTENT
        ================================= */}

        <div className="contact-content">

          {/* =================================
              CONTACT LINKS
          ================================= */}

          <div className="contact-information">

            <div className="contact-information-header">

              <span className="contact-information-label">
                ME CONTACTER
              </span>

              <h3>
                Mes coordonnées
              </h3>

              <p>
                Retrouvez-moi directement sur les différents
                canaux professionnels ci-dessous.
              </p>

            </div>


            <div className="contact-links">

              {/* =================================
                  EMAIL
              ================================= */}

              {about.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="contact-link email-link"
                >

                  <div className="contact-icon email-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>

                  <div className="contact-link-content">

                    <span className="contact-link-label">
                      EMAIL
                    </span>

                    <span className="contact-link-value">
                      {about.email}
                    </span>

                  </div>

                  <span className="contact-link-arrow">
                    ↗
                  </span>

                </a>
              )}


              {/* =================================
                  LINKEDIN
              ================================= */}

              {about.linkedin_url && (
                <a
                  href={about.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link linkedin-link"
                >

                  <div className="contact-icon linkedin-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.8c0-3.75-2-5.5-4.7-5.5-2.15 0-3.1 1.18-3.63 2v-1.8H9.2V21h3.47v-6.2c0-1.64.3-3.23 2.35-3.23 2.02 0 2.05 1.88 2.05 3.34V21H21v-7.2Z" />
                    </svg>
                  </div>

                  <div className="contact-link-content">

                    <span className="contact-link-label">
                      LINKEDIN
                    </span>

                    <span className="contact-link-value">
                      Mon profil professionnel
                    </span>

                  </div>

                  <span className="contact-link-arrow">
                    ↗
                  </span>

                </a>
              )}


              {/* =================================
                  GITHUB
              ================================= */}

              {about.github_url && (
                <a
                  href={about.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link github-link"
                >

                  <div className="contact-icon github-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.16c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.28-1.29-5.28-5.74 0-1.27.45-2.31 1.2-3.12-.12-.29-.52-1.48.11-3.08 0 0 .98-.31 3.17 1.19a10.9 10.9 0 0 1 5.77 0c2.19-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.79.11 3.08.75.81 1.2 1.85 1.2 3.12 0 4.46-2.71 5.45-5.29 5.74.42.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                    </svg>
                  </div>

                  <div className="contact-link-content">

                    <span className="contact-link-label">
                      GITHUB
                    </span>

                    <span className="contact-link-value">
                      Mes projets et dépôts
                    </span>

                  </div>

                  <span className="contact-link-arrow">
                    ↗
                  </span>

                </a>
              )}

            </div>

          </div>


          {/* =================================
              CALL TO ACTION
          ================================= */}

          <div className="contact-action">

            <span className="contact-action-label">
              DISPONIBLE POUR ÉCHANGER
            </span>

            <h3>
              Une idée, un projet ou une opportunité ?
            </h3>

            <p>
              N'hésitez pas à m'envoyer un message.
              Je serai heureux d'échanger avec vous.
            </p>

            <Link
              to="/contact"
              className="contact-button"
            >
              Envoyez-moi un message

              <span>
                →
              </span>
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;