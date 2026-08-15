import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../services/projectService";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Toujours commencer la page en haut
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
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
      <main className="all-projects all-projects-state">
        <p className="all-projects-state-text">
          Chargement des projets...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="all-projects all-projects-state">
        <p className="all-projects-state-text">
          Erreur : {error}
        </p>
      </main>
    );
  }

  return (
    <main className="all-projects">

      {/* =================================
          HERO
      ================================= */}

      <section className="all-projects-hero">

        <div className="all-projects-container">

          <span className="all-projects-section-label">
            PORTFOLIO
          </span>

          <h1 className="all-projects-title">
            Tous mes <span>projets</span>
          </h1>

          <div className="all-projects-section-line"></div>

          <p className="all-projects-description">
            Découvrez l'ensemble de mes réalisations en
            administration de bases de données, développement,
            Data Science et Intelligence Artificielle.
          </p>

        </div>

      </section>


      {/* =================================
          PROJECTS
      ================================= */}

      <section className="all-projects-list">

        <div className="all-projects-container">

          {projects.length > 0 ? (

            <div className="all-projects-grid">

              {projects.map((project) => (

                <ProjectCard
                  key={project.id}
                  project={project}
                />

              ))}

            </div>

          ) : (

            <div className="all-projects-empty">
              <p>
                Aucun projet disponible pour le moment.
              </p>
            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Projects;