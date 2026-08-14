import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();

        // Sur la page d'accueil :
        // uniquement les projets importants
        const importantProjects = data.filter(
          (project) => project.important === true
        );

        setProjects(importantProjects);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section
        id="projects"
        className="projects projects-state"
      >
        <p>Chargement des projets...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="projects projects-state"
      >
        <p>Erreur : {error}</p>
      </section>
    );
  }

  return (
    <section id="projects" className="projects">

      <div className="projects-container">

        {/* =================================
            EN-TÊTE
        ================================= */}

        <div className="section-heading projects-heading">

          <span className="section-label">
            MES RÉALISATIONS
          </span>

          <h2>
            Mes <span>projets</span>
          </h2>

          <div className="section-line"></div>

          <p className="projects-intro">
            Une sélection de projets illustrant mon parcours
            en administration de bases de données, développement,
            Data Science et Intelligence Artificielle.
          </p>

        </div>


        {/* =================================
            PROJETS
        ================================= */}

        {projects.length > 0 ? (

          <div className="projects-grid">

            {projects.map((project) => (

              <article
                key={project.id}
                className="project-wrapper"
              >
                <ProjectCard project={project} />
              </article>

            ))}

          </div>

        ) : (

          <div className="projects-empty">
            <p>
              Aucun projet important n'est disponible pour le moment.
            </p>
          </div>

        )}


        {/* =================================
            TOUS LES PROJETS
        ================================= */}

        <div className="projects-more">

          <Link
            to="/projects"
            className="projects-more-button"
          >
            <span>Voir tous mes projets</span>

            <span className="projects-arrow">
              →
            </span>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Projects;