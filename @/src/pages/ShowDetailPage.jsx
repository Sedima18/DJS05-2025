import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPodcastById } from "../api/fetchPodcast";
import SeasonList from "../components/SeasonList";
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

  useEffect(() => {
    fetchPodcastById(id)
      .then(setShow)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!show) return <p>Show not found.</p>;

  return (
    <div className="container show-page">
      <button
        className="back-btn"
        onClick={() => navigate(`/${location.search}`)}
      >
        ← Back
      </button>

      
      <div className="show-hero">
        
        <div className="show-info">
          <h1>{show.title}</h1>

          <p className="show-description">{show.description}</p>

          <div className="genres">
            {show.genres.map((id) => (
              <span key={id} className="genre-tag">
                {genreMap[id]}
              </span>
            ))}
          </div>

          <p>
            <strong>Seasons:</strong> {show.seasons.length}
          </p>

          <p>
            <strong>Last updated:</strong>{" "}
            {formatDate(show.updated)}
          </p>
        </div>

        
        <div className="show-image">
          <img src={show.image} alt={show.title} />
        </div>
      </div>

      
      <SeasonList seasons={show.seasons} />
    </div>
  );
}
