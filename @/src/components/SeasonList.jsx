/**
 * SeasonList
 * ----------
 * Displays seasons with a dropdown to select which season to view.
 * Episodes of the selected season are shown with:
 * - Episode number
 * - Episode title
 * - Season image
 * - Shortened description
 */

import { useState } from "react";

export default function SeasonList({ seasons }) {
  // Set default selected season as the first one
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  if (!Array.isArray(seasons) || seasons.length === 0) return null;

  /**
   * Handle season change from dropdown
   */
  const handleSeasonChange = (e) => {
    const seasonId = Number(e.target.value);
    const season = seasons.find((s) => s.id === seasonId);
    if (season) setSelectedSeason(season);
  };

  return (
    <div className="season-section">
      {/* SEASON HEADER */}
      <div className="season-header">
        <h2>Season</h2>

        {/* Dropdown to select season */}
        <select value={selectedSeason.id} onChange={handleSeasonChange}>
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>
              {season.title} ({season.episodes.length} episodes)
            </option>
          ))}
        </select>
      </div>

      {/* EPISODES */}
      <div className="episode-list">
        {Array.isArray(selectedSeason.episodes) &&
          selectedSeason.episodes.map((episode) => (
            <div key={episode.id} className="episode-card">
              {/* Use season image as episode image */}
              <img
                src={selectedSeason.image || "/episode-placeholder.png"}
                alt={selectedSeason.title}
                className="episode-image"
              />

              <div className="episode-info">
                <h4>
                  Episode {episode.episode}: {episode.title}
                </h4>

                <p>
                  {episode.description.length > 140
                    ? episode.description.slice(0, 140) + "…"
                    : episode.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
