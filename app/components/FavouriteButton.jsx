/* 
Komponenta koja omoguća korisnicima dodavanje i uklanjanje serija iz favorita.
Koristi useState za praćenje stanja favorita i useEffect za inicijalno učitavanje podataka iz localStorage.
*/
"use client";

import { useState, useEffect } from "react";
import styles from "./favouriteBtn.module.css";

//Izvor za rad s localStorage-om: https://blog.logrocket.com/using-localstorage-react-hooks/
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
