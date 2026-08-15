import { useEffect, useState } from "react";
import { getLanguages } from "../services/languageService";
import "./Languages.css";

function Languages() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLanguages() {
      try {
        const data = await getLanguages();
        setLanguages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadLanguages();
  }, []);

  const getLevelLabel = (level) => {
    switch (level) {
      case "native":
        return "Natif";

      case "fluent":
        return "Courant";

      case "operational":
        return "Opérationnel";

      case "intermediate":
        return "Intermédiaire";

      default:
        return "Notions";
    }
  };

  const getLevelDescription = (level) => {
    switch (level) {
      case "native":
        return "Langue maternelle";

      case "fluent":
        return "Communication fluide";

      case "operational":
        return "Communication professionnelle";

      case "intermediate":
        return "Communication intermédiaire";

      default:
        return "Connaissances de base";
    }
  };

  if (loading) {
    return (
      <section className="languages languages-state">
        <p>Chargement des compétences linguistiques...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="languages languages-state">
        <p>Erreur : {error}</p>
      </section>
    );
  }

  return (
    <section id="languages" className="languages">

      {/* =================================
          HEADER
      ================================= */}

      <div className="languages-heading">

        <div className="section-heading">

          <span className="section-label">
            LANGUES
          </span>

          <h2>
            Compétences <span>linguistiques</span>
          </h2>

          <div className="section-line"></div>

        </div>

      </div>


      {/* =================================
          LANGUAGES LIST
      ================================= */}

      <div className="languages-container">

        <div className="languages-list">

          {languages.map((language) => {

            const initials = language.name
              .slice(0, 3)
              .toUpperCase();

            return (
              <article
                key={language.id}
                className="language-row"
              >

                {/* INITIALS */}

                <div className="language-code">
                  {initials}
                </div>


                {/* LANGUAGE INFORMATION */}

                <div className="language-main">

                  <h3>
                    {language.name}
                  </h3>

                  <p>
                    {getLevelDescription(language.level)}
                  </p>

                </div>


                {/* LEVEL */}

                <div className="language-level">

                  <span>
                    {getLevelLabel(language.level)}
                  </span>

                </div>

              </article>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Languages;
