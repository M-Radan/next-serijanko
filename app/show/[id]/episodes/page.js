"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import styles from "./episode.module.css";
import BackButton from "@/app/components/BackButton";

function EpisodesPage({ params: paramsP }) {
  const { id } = use(paramsP);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
      const data = await res.json();
      setEpisodes(data);
    };
    fetchEpisodes();
  }, [id]);

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>🎬 Epizode ▶️</h1>
      <ul className={styles.episodeList}>
        {episodes.map((ep) => (
          <li key={ep.id} className={styles.episodeItem}>
            <details>
              <summary className={styles.episodeSumary}>
                S{ep.season}E{ep.number} - {ep.name} ({ep.airdate})
              </summary>
              <p>{ep.summary ? ep.summary.replace(/<[^>]+>/g, "") : "Nema opisa."}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default EpisodesPage;
