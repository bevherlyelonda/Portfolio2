import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  return (
    <article className="project-card">

      {/* =================================
          CATÉGORIE
      ================================= */}

      <div className="project-card-category">
        <span className="project-card-category-dot"></span>
        {project.category}
      </div>


      {/* =================================
          TITRE
      ================================= */}

      <h3 className="project-card-title">
        {project.title}
      </h3>


      {/* =================================
          SÉPARATEUR
      ================================= */}

      <div className="project-card-divider"></div>


      {/* =================================
          DESCRIPTION
      ================================= */}

      <p className="project-card-description">
        {project.description}
      </p>


      {/* =================================
          ACTION
      ================================= */}

      <div className="project-card-footer">

        <Link
          to={`/projects/${project.slug}`}
          className="project-card-button"
        >
          <span>Voir le projet</span>

          <span className="project-card-arrow">
            →
          </span>
        </Link>

      </div>

    </article>
  );
}

export default ProjectCard;