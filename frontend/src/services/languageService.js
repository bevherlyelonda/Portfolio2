export async function getLanguages() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/languages/`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les compétences linguistiques.");
  }

  return response.json();
}