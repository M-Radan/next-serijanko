"use client";

import { useState, useEffect } from "react";
import styles from "./favouriteBtn.module.css";

function FavoriteButton({ show }) {
  const [isFavoriteSeries, setIsFavoriteSeries] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    const found = saved.find((item) => item.id === show.id);
    setIsFavoriteSeries(!!found);
  }, [show.id]);

  function changeFavorite() {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;

    if (isFavoriteSeries) {
      updated = saved.filter((item) => item.id !== show.id);
    } 
    else {
      updated = [...saved, show];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavoriteSeries(!isFavoriteSeries);
  }

  return (
    <button onClick={changeFavorite} className={styles.button}>
      {isFavoriteSeries ? "💔 Ukloni iz favorita" : "❤️ Dodaj u favorite"}
    </button>
  );
}

export default FavoriteButton;
