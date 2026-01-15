/**
 * Fetch all podcast previews
 */
export async function fetchPodcasts() {
  const res = await fetch("https://podcast-api.netlify.app");
  if (!res.ok) throw new Error("Failed to load podcasts");
  return res.json();
}

/**
 * Fetch single podcast by ID
 */
export async function fetchPodcastById(id) {
  const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
  if (!res.ok) throw new Error("Show not found");
  return res.json();
}