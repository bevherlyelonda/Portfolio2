export async function sendContactMessage(messageData) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/`,
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      // La réponse n'est pas du JSON.
    }

    if (!response.ok) {
      // Django a renvoyé un message d'erreur général.
      if (data.detail) {
        throw new Error(data.detail);
      }

      // Django REST Framework a renvoyé une erreur
      // concernant un champ du formulaire.
      if (typeof data === "object" && data !== null) {
        const firstError = Object.values(data).flat()[0];

        if (firstError) {
          throw new Error(firstError);
        }
      }

      // Erreur HTTP sans message précis.
      throw new Error(
        "Une erreur est survenue lors de l'envoi du message."
      );
    }

    return data;
  } catch (error) {
    // Le serveur Django n'est pas accessible.
    if (error instanceof TypeError) {
      throw new Error(
        "Impossible de contacter le serveur. Vérifiez que le serveur est bien démarré."
      );
    }

    throw error;
  }
}
