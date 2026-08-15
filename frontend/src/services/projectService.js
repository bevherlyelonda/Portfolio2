const API_URL = `${import.meta.env.VITE_API_URL}/api/projects/`;

export async function getProjects() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des projets')
  }

  return response.json()
}

export async function getProjectBySlug(slug) {
  const response = await fetch(`${API_URL}${slug}/`)

  if (!response.ok) {
    throw new Error('Projet introuvable')
  }

  return response.json()
}