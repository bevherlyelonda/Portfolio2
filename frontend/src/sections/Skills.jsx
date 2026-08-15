import { useEffect, useState } from "react";
import { getSkills } from "../services/skillService";
import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadSkills();
  }, []);

  if (loading) {
    return (
      <section
        id="skills"
        className="skills skills-state"
        aria-label="Chargement des compétences"
      >
        <p>Chargement des compétences...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="skills"
        className="skills skills-state"
        aria-label="Erreur de chargement des compétences"
      >
        <p>Erreur : {error}</p>
      </section>
    );
  }

  const categoryNames = {
    database: "Bases de données",
    data_ai: "Data Science & Intelligence Artificielle",
    development: "Développement",
    systems: "Systèmes & outils",
    fundamentals: "Fondamentaux informatiques",
  };

  const categoryDescriptions = {
    database:
      "Administration, conception, optimisation et gestion des bases de données.",
    data_ai:
      "Analyse de données, apprentissage automatique et technologies d'intelligence artificielle.",
    development:
      "Développement logiciel, programmation et conception d'applications.",
    systems:
      "Systèmes d'exploitation, environnements techniques et outils informatiques.",
    fundamentals:
      "Algorithmique, structures de données, mathématiques et concepts fondamentaux.",
  };

  const categoryIcons = {
    database: "DB",
    data_ai: "AI",
    development: "</>",
    systems: "SYS",
    fundamentals: "CS",
  };

  const groupedSkills = skills.reduce((groups, skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = [];
    }

    groups[skill.category].push(skill);

    return groups;
  }, {});

  return (
    <section id="skills" className="skills">

      <div className="skills-container">

        {/* =================================
            EN-TÊTE
        ================================= */}

        <div className="section-heading skills-heading">

          <span className="section-label">
            MON SAVOIR-FAIRE
          </span>

          <h2>
            Mes <span>compétences</span>
          </h2>

          <div className="section-line"></div>

          <p className="skills-intro">
            Un ensemble de compétences techniques construites autour
            des bases de données, du développement, des systèmes,
            de la data et de l'intelligence artificielle.
          </p>

        </div>


        {/* =================================
            COMPÉTENCES
        ================================= */}

        <div className="skills-grid">

          {Object.entries(groupedSkills).map(
            ([category, categorySkills]) => (

              <article
                key={category}
                className={`skill-category skill-category-${category}`}
              >

                {/* En-tête de la carte */}

                <div className="skill-category-header">

                  <div className="skill-category-icon">
                    {categoryIcons[category]}
                  </div>

                  <div>

                    <h3>
                      {categoryNames[category] || category}
                    </h3>

                    <p>
                      {categoryDescriptions[category]}
                    </p>

                  </div>

                </div>


                {/* Liste des compétences */}

                <div className="skill-list">

                  {categorySkills.map((skill) => (

                    <div
                      key={skill.id}
                      className="skill-item"
                    >

                      <span
                        className="skill-dot"
                        aria-hidden="true"
                      ></span>

                      <span className="skill-name">
                        {skill.name}
                      </span>

                    </div>

                  ))}

                </div>

              </article>

            )
          )}

        </div>

      </div>

    </section>
  );
}

export default Skills;