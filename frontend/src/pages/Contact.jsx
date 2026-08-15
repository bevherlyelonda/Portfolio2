import { useState } from "react";
import { sendContactMessage } from "../services/contactService";
import "./ContactPage.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await sendContactMessage(formData);

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du message :",
        error
      );

      setError(
        error.message ||
          "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="contact-page">

      {/* =================================
          HEADER
      ================================= */}

      <header className="contact-page-heading">

        <span className="contact-page-label">
          CONTACT
        </span>

        <h1 className="contact-page-title">
          Contactez <span>-moi</span>
        </h1>

        <div className="contact-page-line"></div>

        <p className="contact-page-description">
          Une question, une proposition professionnelle ou
          simplement envie d'échanger ? Je serai ravi de vous
          répondre.
        </p>

      </header>


      {/* =================================
          CONTACT CONTENT
      ================================= */}

      <section className="contact-page-container">

        {/* =================================
            INTRODUCTION
        ================================= */}

        <article className="contact-page-intro">

          <div className="contact-page-intro-badge">
            <span></span>
            DISPONIBLE POUR ÉCHANGER
          </div>

          <h2 className="contact-intro-title">
            Construisons quelque chose
            <strong> d'intéressant.</strong>
          </h2>

          <p className="contact-intro-text">
            Que ce soit autour d'un projet informatique,
            d'une opportunité professionnelle, de bases de
            données Oracle ou de Data Science et d'Intelligence
            Artificielle, n'hésitez pas à me contacter.
          </p>

          <div className="contact-page-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </article>


        {/* =================================
            FORM CARD
        ================================= */}

        <section className="contact-form-card">

          <div className="contact-form-header">

            <span className="contact-form-label">
              ENVOYER UN MESSAGE
            </span>

            <h2 className="contact-form-title">
              Parlons ensemble
            </h2>

            <p className="contact-form-description">
              Remplissez le formulaire ci-dessous et je vous
              répondrai dans les meilleurs délais.
            </p>

          </div>


          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            {/* =================================
                NAME + EMAIL
            ================================= */}

            <div className="contact-form-row">

              <div className="form-group">

                <label
                  htmlFor="name"
                  className="form-label"
                >
                  Nom
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label
                  htmlFor="email"
                  className="form-label"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* =================================
                SUBJECT
            ================================= */}

            <div className="form-group">

              <label
                htmlFor="subject"
                className="form-label"
              >
                Sujet
              </label>

              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                placeholder="Objet de votre message"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>


            {/* =================================
                MESSAGE
            ================================= */}

            <div className="form-group">

              <label
                htmlFor="message"
                className="form-label"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                className="form-input form-textarea"
                placeholder="Écrivez votre message..."
                value={formData.message}
                onChange={handleChange}
                rows="8"
                required
              />

            </div>


            {/* =================================
                ERROR
            ================================= */}

            {error && (
              <div
                className="contact-message contact-message-error"
                role="alert"
              >
                <span className="contact-message-icon">
                  !
                </span>

                <p>
                  {error}
                </p>
              </div>
            )}


            {/* =================================
                SUCCESS
            ================================= */}

            {success && (
              <div
                className="contact-message contact-message-success"
                role="status"
              >
                <span className="contact-message-icon">
                  ✓
                </span>

                <p>
                  Votre message a été envoyé avec succès.
                </p>
              </div>
            )}


            {/* =================================
                SUBMIT
            ================================= */}

            <div className="contact-form-footer">

              <p className="contact-form-footer-text">
                Vos informations restent confidentielles.
              </p>

              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="submit-loader"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <span>→</span>
                  </>
                )}
              </button>

            </div>

          </form>

        </section>

      </section>

    </main>
  );
}

export default Contact;