/**
 * ShowDetailPage
 * ----------------
 * Displays detailed information for a single podcast show.
 * Includes:
 * - Show image and description
 * - Genre names (mapped from genre IDs)
 * - Total episodes and seasons
 * - Last updated date
 * - Season selector with episode list
 */

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPodcastById } from "../api/fetchPodcast";
import SeasonList from "../components/SeasonList";
import { genreMap } from "../utils/genreMap";
import { formatDate } from "../utils/formatDate";
import Loading from "../components/Loading";

export default function ShowDetailPage() {
  /** Get show ID from URL */
  const { id } = useParams();
  const navigate = useNavigate();

  /** Component state */
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Fetch show data when ID changes
   */
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError("");
    setShow(null);

    fetchPodcastById(id)
      .then((data) => {
        if (!data || !Array.isArray(data.seasons)) {
          throw new Error("Invalid show data");
        }
        setShow(data);
      })
      .catch((err) => {
        console.error("Failed to load show:", err);
        setError("Failed to load show");
      })
      .finally(() => setLoading(false));
  }, [id]);

  /** Loading & error states */
  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;
  if (!show) return <p>Show not found.</p>;

  /**
   * Calculate total number of episodes safely
   * @returns {number}
   */
  const totalEpisodes = show.seasons.reduce(
    (total, season) =>
      total + (Array.isArray(season.episodes) ? season.episodes.length : 0),
    0
  );

  /**
   * Convert genre IDs to readable genre names
   * @param {number[]} genres
   * @returns {string}
   */
  const getGenreNames = (genres) => {
    if (!Array.isArray(genres)) return "";

    return genres
      .map((id) => genreMap[id])
      .filter(Boolean)
      .join(" • ");
  };

  return (
    <div className="container show-page">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      {/* HERO SECTION */}
      <div className="show-hero">
        {/* IMAGE */}
        <div className="show-image">
          <img src={show.image} alt={show.title} />
        </div>

        {/* INFO */}
        <div className="show-info">
          <h1>{show.title}</h1>

          <p className="show-description">{show.description}</p>

          <p className="show-meta">
            <strong>Genres:</strong> {getGenreNames(show.genres)}
          </p>

          <p className="show-meta">
            <strong>Total Episodes:</strong> {totalEpisodes}
          </p>

          <p className="show-meta">
            <strong>Seasons:</strong> {show.seasons.length}
          </p>

          <p className="show-meta">
            <strong>Last updated:</strong> {formatDate(show.updated)}
          </p>
        </div>
      </div>

      {/* SEASONS & EPISODES */}
      <SeasonList seasons={show.seasons} />
    </div>
  );
}
