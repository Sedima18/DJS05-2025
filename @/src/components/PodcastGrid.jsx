import PodcastCard from "./PodcastCard";

export default function PodcastGrid({ podcasts, search, onSearch }) {
  const filtered = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search podcasts..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />

      <div className="podcast-list">
        {filtered.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}