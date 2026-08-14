const API_URL = "http://127.0.0.1:8000/api/education/";

export async function getEducation() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les formations.");
  }

  return response.json();
}