import { useEffect, useState } from "react";
import { getAbout } from "../services/aboutService";
import "./Presentation.css";

function Presentation() {
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
      <section
        className="presentation presentation-state"
        aria-label="Chargement de la présentation"
      >
        <p>Chargement...</p>
      </section>
    );
  }

  /* =================================
     ERROR
  ================================= */

  if (error) {
    return (
      <section
        className="presentation presentation-state"
        aria-label="Erreur de chargement"
      >
        <p>Erreur : {error}</p>
      </section>
    );
  }

  /* =================================
     NO DATA
  ================================= */

  if (!about) {
    return (
      <section
        className="presentation presentation-state"
        aria-label="Présentation indisponible"
      >
        <p>Informations indisponibles.</p>
      </section>
    );
  }

  return (
    <section id="presentation" className="presentation">

      {/* =================================
          ÉLÉMENTS DÉCORATIFS
      ================================= */}

      <div
        className="presentation-background-glow presentation-background-glow-one"
        aria-hidden="true"
      />

      <div
        className="presentation-background-glow presentation-background-glow-two"
        aria-hidden="true"
      />


      {/* =================================
          CONTENEUR PRINCIPAL
      ================================= */}

      <div className="presentation-container">


        {/* =================================
            PHOTO
        ================================= */}

        <div className="presentation-photo-wrapper">

          <div
            className="presentation-photo-glow"
            aria-hidden="true"
          />

          {about.profile_photo && (
            <div className="presentation-photo-frame">

              <div
                className="presentation-photo-border"
                aria-hidden="true"
              />

              <img
                src={about.profile_photo}
                alt={`Portrait de ${about.name}`}
                className="presentation-photo"
              />

            </div>
          )}

        </div>


        {/* =================================
            CONTENU
        ================================= */}

        <div className="presentation-content">

          {/* Badge */}
          <div className="presentation-status">

            <span
              className="presentation-status-dot"
              aria-hidden="true"
            />

            <span>
              Disponible pour échanger
            </span>

          </div>


          {/* Introduction */}
          <p className="presentation-intro">
            Bonjour, je suis
          </p>


          {/* Nom */}
          <h1 className="presentation-name">
            {about.name}
          </h1>


          {/* Ligne décorative */}
          <div
            className="presentation-line"
            aria-hidden="true"
          />


          {/* Titre professionnel */}
          <h2 className="presentation-title">
            {about.professional_title}
          </h2>


          {/* Description */}
          <p className="presentation-description">
            {about.short_description}
          </p>


          {/* =================================
              ACTIONS
          ================================= */}

          <div className="presentation-actions">

            <a
              href="#projects"
              className="btn-primary presentation-button"
            >
              <span>
                Voir mes projets
              </span>

              <span
                className="presentation-button-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>

            <a
              href="#contact"
              className="btn-secondary presentation-button"
            >
              <span>
                Me contacter
              </span>

              <span
                className="presentation-button-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>

          </div>

        </div>

      </div>


      {/* =================================
          INDICATEUR DE SCROLL
      ================================= */}

      <a
        href="#about"
        className="presentation-scroll"
        aria-label="Faire défiler vers la section À propos"
      >
        <span className="presentation-scroll-text">
          Découvrir
        </span>

        <span
          className="presentation-scroll-arrow"
          aria-hidden="true"
        >
          ↓
        </span>
      </a>

    </section>
  );
}

export default Presentation;