export async function getSkills() {
  const response = await fetch("http://127.0.0.1:8000/api/skills/");

  if (!response.ok) {
    throw new Error("Impossible de récupérer les compétences.");
  }

  return response.json();
}