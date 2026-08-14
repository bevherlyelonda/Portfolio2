export async function getLanguages() {
  const response = await fetch("http://127.0.0.1:8000/api/languages/");

  if (!response.ok) {
    throw new Error("Impossible de récupérer les compétences linguistiques.");
  }

  return response.json();
}