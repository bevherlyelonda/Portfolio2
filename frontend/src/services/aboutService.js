//const API_URL = `${import.meta.env.VITE_API_URL}/api/about/`;
const API_URL = "http://127.0.0.1:8000/api/about/";

export async function getAbout() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des informations About");
  }

  const data = await response.json();

  // Notre table About doit normalement contenir un seul profil.
  // On récupère donc le premier élément.
  return data[0];
}