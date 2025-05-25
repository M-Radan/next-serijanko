/*
Stranica za prikaz omiljenih serija korisnika. Koristeći localStorage pohranu,
omogućava pamćenje i prikaz serija koje su korisnici označili kao favorite.
Omogućava jednostavno uklanjanje serija iz favorita i 
prikazuje poruku i sliku u slučaju da nema spremljenih favorita.
*/

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./favorites.module.css"; 
import BackButton from "../components/BackButton";

/*
Funkcija FavoritesPage omogućava prikaz favorita, učitava podatke iz localStorage-a,
omogućava uklanjanje pojede serije iz liste favorita, automatski ažurira prikaz i pohranu.
*/
function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const favseries = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favseries);
  }, []);

  function removeFavorite(id) {
    const update = favorites.filter((fav) => fav.id !== id);
    setFavorites(update);
    localStorage.setItem("favorites", JSON.stringify(update));
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.container}>
        <BackButton onClick={() => route.back()} className={styles.backButton} />
        <p className={styles.emptyMes}>🥺 Nema spremljenih favorita 😔</p>
        <Image
          src="/images/empty_favorite.webp"  
          alt="Opis slike"
          width={300}
          height={300}
          className={styles.emptyImage}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      
      <BackButton onClick={() => route.back()} className={styles.backButton} />
      <h1 className={styles.title}>⭐ Favoriti ❤️</h1>
      
      <div className={styles.grid}>
        
        {favorites.map((show) => (
          <div key={show.id} className={styles.card}>
            
            {show.image?.medium ? (
              <Image
                src={show.image.medium}
                alt={show.name}
                width={150}
                height={210}
                className={styles.image}
              />
            ) : (
              <div className={styles.imageNotFound} />
            )}
            <h3>{show.name}</h3>
            <button
              onClick={() => removeFavorite(show.id)}
              className={styles.removeBtn}
            >
             ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FavoritesPage;
