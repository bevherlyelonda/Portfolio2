export async function getSkills() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills/`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les compétences.");
  }

  return response.json();
}