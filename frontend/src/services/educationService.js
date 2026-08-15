const API_URL = `${import.meta.env.VITE_API_URL}/api/education/`;

export async function getEducation() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les formations.");
  }

  return response.json();
}