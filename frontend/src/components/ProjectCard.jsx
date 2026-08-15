import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  return (
    <article className="project-card">

      {/* =================================
          DÉCORATION
      ================================= */}

      <div
        className="project-card-glow"
        aria-hidden="true"
      />


      {/* =================================
          CATÉGORIE
      ================================= */}

      {project.category && (
        <div className="project-card-category">
          <span
            className="project-card-category-dot"
            aria-hidden="true"
          />

          <span>
            {project.category}
          </span>
        </div>
      )}


      {/* =================================
          TITRE
      ================================= */}

      <h3 className="project-card-title">
        {project.title || "Projet sans titre"}
      </h3>


      {/* =================================
          SÉPARATEUR
      ================================= */}

      <div
        className="project-card-divider"
        aria-hidden="true"
      />


      {/* =================================
          DESCRIPTION
      ================================= */}

      <p className="project-card-description">
        {project.description || "Aucune description disponible."}
      </p>


      {/* =================================
          ACTION
      ================================= */}

      <div className="project-card-footer">

        {project.slug ? (
          <Link
            to={`/projects/${project.slug}`}
            className="project-card-button"
            aria-label={`Voir le projet ${project.title || ""}`}
          >
            <span>Voir le projet</span>

            <span
              className="project-card-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ) : (
          <span className="project-card-unavailable">
            Projet indisponible
          </span>
        )}

      </div>

    </article>
  );
}

export default ProjectCard;