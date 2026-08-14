const API_URL = "http://127.0.0.1:8000/api/experiences/";

export async function getExperiences() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les expériences.");
  }

  return response.json();
}