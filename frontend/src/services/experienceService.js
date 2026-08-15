const API_URL = `${import.meta.env.VITE_API_URL}/api/experiences/`;

export async function getExperiences() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les expériences.");
  }

  return response.json();
}