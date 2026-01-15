import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPodcasts } from "../api/podcasts";
import PodcastGrid from "../components/PodcastGrid";
import Loading from "../components/Loading";

export default function HomePage() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    fetchPodcasts()
      .then(setPodcasts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <PodcastGrid
      podcasts={podcasts}
      search={search}
      onSearch={(value) => setSearchParams({ search: value })}
    />
  );
}