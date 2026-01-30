import { Link, useLocation } from "react-router-dom";
import { genreMap } from "../utils/genreMap";
import { formatDate } from "../utils/formatDate";

export default function PodcastCard({ podcast }) {
  const location = useLocation();

  return (
    <Link
      to={`/show/${podcast.id}${location.search}`}
      className="podcast-card"
    >
      {/* Image */}
      <img
        src={podcast.image}
        alt={podcast.title}
        className="podcast-image"
      />

      {/* Info */}
      <div className="podcast-info">
        <h3>{podcast.title}</h3>

        <p className="muted">
          {podcast.seasons} seasons • Last updated{" "}
          {formatDate(podcast.updated)}
        </p>

        <div className="genres">
          {podcast.genres.map((id) => (
            <span key={id} className="tag">
              {genreMap[id]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}