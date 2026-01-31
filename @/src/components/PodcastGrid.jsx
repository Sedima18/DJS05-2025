import { useState } from "react";
import PodcastCard from "./PodcastCard";

export default function PodcastGrid({ podcasts, search, onSearch }) {
  const [sort, setSort] = useState("newest");
  const [genre, setGenre] = useState("all");

  //  Get unique genres
  const genres = [
    "all",
    ...new Set(podcasts.flatMap((podcast) => podcast.genres)),
  ];

  //  Filter by search + genre
  let filtered = podcasts.filter((podcast) => {
    const matchesSearch = podcast.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "all" || podcast.genres.includes(Number(genre));

    return matchesSearch && matchesGenre;
  });

  //  Sort logic
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
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search podcasts..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />

      {/* 🎛 Filters */}
      <div className="filters">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="az">A–Z</option>
        </select>

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g === "all" ? "All Genres" : `Genre ${g}`}
            </option>
          ))}
        </select>
      </div>

      {/* 🧩 Podcast Grid */}
      <div className="podcast-grid">
        {filtered.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}