import { useState } from "react";
import PodcastCard from "./PodcastCard";

export default function PodcastGrid({ podcasts, search, onSearch }) {
  const [sort, setSort] = useState("newest");
  const [genre, setGenre] = useState("all");

  // Get unique genre IDs
  const genres = [
    "all",
    ...new Set(podcasts.flatMap((podcast) => podcast.genres)),
  ];

  // Filter by search + genre
  let filtered = podcasts.filter((podcast) => {
    const matchesSearch = podcast.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "all" || podcast.genres.includes(Number(genre));

    return matchesSearch && matchesGenre;
  });

  // Sort logic
  if (sort === "az") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "newest") {
    filtered.sort(
      (a, b) => new Date(b.updated) - new Date(a.updated)
    );
  }

  return (
    <div className="container">
      {/* Search + Filters */}
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search podcasts..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="az">A–Z</option>
          <option value="newest">Newest</option>
        </select>

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All Genres</option>
          {genres
            .filter((g) => g !== "all")
            .map((g) => (
              <option key={g} value={g}>
                Genre {g}
              </option>
            ))}
        </select>
      </div>

      {/* Podcast Grid */}
      <div className="podcast-grid">
        {filtered.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}
