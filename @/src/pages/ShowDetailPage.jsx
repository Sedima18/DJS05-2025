import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPodcastById } from "../api/fetchPodcast";
import { genreMap } from "../utils/genreMap";
import { formatDate } from "../utils/formatDate";
import Loading from "../components/Loading";

export default function ShowDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(0);

  useEffect(() => {
    fetchPodcastById(id)
      .then((data) => {
        setShow(data);
        setSelectedSeason(0);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;
  if (!show) return <p>No show found.</p>;

  const currentSeason = show.seasons[selectedSeason];

  return (
    <div className="container show-detail-page">
      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate(`/${location.search}`)}
      >
        ← Back to shows
      </button>

      {/* Top layout */}
      <div className="show-detail">
        {/* LEFT: Info */}
        <div className="show-info">
          <h1>{show.title}</h1>

          <p className="muted">
            Last updated: {formatDate(show.updated)}
          </p>

          <p className="description">{show.description}</p>

          {/* Genres */}
          <div className="genres">
            {show.genres.map((genreId) => (
              <span key={genreId} className="tag">
                {genreMap[genreId]}
              </span>
            ))}
          </div>

          {/* Season Dropdown */}
          <div className="season-selector">
            <label htmlFor="season">Select Season</label>
            <select
              id="season"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
            >
              {show.seasons.map((season, index) => (
                <option key={season.id} value={index}>
                  {season.title} ({season.episodes.length} episodes)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="show-image">
          <img
            src={show.image}
            alt={show.title}
            className="podcast-image"
          />
        </div>
      </div>

      {/* Episodes */}
      <section className="episodes">
        <h2>{currentSeason.title}</h2>

        {currentSeason.episodes.map((episode, index) => (
          <div key={episode.id} className="card episode">
            <img
              src={episode.image}
              alt={episode.title}
              className="episode-image"
            />

            <div className="episode-info">
              <h4>
                Episode {index + 1}: {episode.title}
              </h4>

              <p className="muted">
                {episode.description.length > 140
                  ? episode.description.slice(0, 140) + "…"
                  : episode.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}