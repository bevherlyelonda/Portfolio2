import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../services/projectService";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Capture actuellement ouverte
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    async function loadProject() {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);


  // =================================
  // FERMER AVEC ÉCHAP
  // =================================

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);


  if (loading) {
    return (
      <main className="project-detail project-detail-state">
        <p>Chargement du projet...</p>
      </main>
    );
  }


  if (error) {
    return (
      <main className="project-detail project-detail-state">
        <p>Erreur : {error}</p>
      </main>
    );
  }


  if (!project) {
    return (
      <main className="project-detail project-detail-state">
        <div>
          <h1>Projet introuvable</h1>

          <Link
            to="/projects"
            className="project-detail-back"
          >
            ← Retour aux projets
          </Link>
        </div>
      </main>
    );
  }


  return (
    <main className="project-detail">

      {/* =================================
          HERO
      ================================= */}

      <section className="project-detail-hero">

        <div className="project-detail-container">

          <Link
            to="/projects"
            className="project-detail-back"
          >
            ← Tous les projets
          </Link>

          <div className="project-detail-category">
            <span className="project-detail-category-dot"></span>
            {project.category}
          </div>

          <h1>{project.title}</h1>

          <div className="project-detail-line"></div>

          <p className="project-detail-description">
            {project.description}
          </p>

        </div>

      </section>


      {/* =================================
          CONTENT
      ================================= */}

      <section className="project-detail-content">

        <div className="project-detail-container">

          {/* OBJECTIFS */}

          {project.objectives && (
            <section className="project-detail-section">

              <h2>Objectifs</h2>

              <div className="project-detail-card">
                <p>{project.objectives}</p>
              </div>

            </section>
          )}


          {/* TECHNOLOGIES */}

          {project.technologies && (
            <section className="project-detail-section">

              <h2>Technologies</h2>

              <div className="project-detail-card project-detail-technologies">

                {project.technologies
                  .split(",")
                  .map((technology) => technology.trim())
                  .filter(Boolean)
                  .map((technology, index) => (
                    <span
                      key={index}
                      className="technology-tag"
                    >
                      {technology}
                    </span>
                ))}

              </div>

            </section>
          )}


          {/* TRAVAIL RÉALISÉ */}

          {project.work_done && (
            <section className="project-detail-section">

              <h2>Travail réalisé</h2>

              <div className="project-detail-card">
                <p>{project.work_done}</p>
              </div>

            </section>
          )}


          {/* ARCHITECTURE */}

          {project.architecture && (
            <section className="project-detail-section">

              <h2>Architecture</h2>

              <div className="project-detail-card">
                <p>{project.architecture}</p>
              </div>

            </section>
          )}


          {/* =================================
              CAPTURES
          ================================= */}

          {project.images &&
            project.images.length > 0 && (

              <section className="project-detail-section">

                <h2>Captures du projet</h2>

                <div className="project-images">

                  {project.images.map((image) => (

                    <figure
                      key={image.id}
                      className="project-image"
                      onClick={() => setSelectedImage(image)}
                    >

                      <img
                        src={image.image}
                        alt={image.name}
                        loading="lazy"
                      />

                      <figcaption>
                        {image.name}
                      </figcaption>

                    </figure>

                  ))}

                </div>

              </section>
            )}


          {/* RÉSULTATS */}

          {project.results && (
            <section className="project-detail-section">

              <h2>Résultats</h2>

              <div className="project-detail-result">
                <p>{project.results}</p>
              </div>

            </section>
          )}


          {/* FOOTER */}

          <div className="project-detail-footer">

            <Link
              to="/projects"
              className="project-detail-back-button"
            >
              <span>←</span>
              Retour à tous les projets
            </Link>

          </div>

        </div>

      </section>


      {/* =================================
          LIGHTBOX
      ================================= */}

      {selectedImage && (

        <div
          className="image-lightbox"
          onClick={() => setSelectedImage(null)}
        >

          {/* BOUTON FERMER */}

          <button
            type="button"
            className="image-lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Fermer l'image"
          >
            ×
          </button>


          {/* IMAGE */}

          <div
            className="image-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >

            <img
              src={selectedImage.image}
              alt={selectedImage.name}
            />

            <p>
              {selectedImage.name}
            </p>

          </div>

        </div>

      )}

    </main>
  );
}

export default ProjectDetail;