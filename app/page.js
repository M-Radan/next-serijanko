"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [shows, setShows] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [sortOption, setSortOption] = useState("najnovije");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);


  useEffect(() => {
    fetchAllShows();
  }, []);

  const fetchAllShows = async () => {
          
    const res = await fetch("https://api.tvmaze.com/shows");
    const data = await res.json();
    setShows(data);
    setIsSearching(false);
    setVisibleCount(20);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      alert("❗ Molim Vas da unesete pdoatke za pretragu ❗");
      fetchAllShows();
      return;
    }

    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
    const data = await res.json();
    const extractedShows = data.map((item) => item.show);
    setShows(extractedShows);
    setIsSearching(true);
    setVisibleCount(20);
    setSearchTerm("");
  };

  const sortedShows = [...shows].sort((a, b) => {
    if (sortOption === "najbolje") {
      let ratingFirst = 0;
      let ratingSecond = 0;
      if (a.rating && a.rating.average) {
        ratingFirst = a.rating.average;
      }
      if (b.rating && b.rating.average) {
        ratingSecond = b.rating.average;
      }
      return ratingSecond - ratingFirst;
    }
    if (sortOption === "najnovije") {
      let dateFirst = new Date("1970-01-01");
      let dateSecond = new Date("1970-01-01");
      if (a.premiered) {
        dateFirst = new Date(a.premiered);
      }
      if (b.premiered) {
        dateSecond = new Date(b.premiered);
      }
      return dateSecond - dateFirst;
    }
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>📺Serijanko📽️</h1>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Pretraži🔎..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>🔎</button>
          {isSearching && (
            <button onClick={fetchAllShows} style={{ marginLeft: "10px" }}>
              Poništi pretragu ❌
            </button>
          )}
        </div>

        <div className={styles.favoritesBtnContainer}>
          <Link href="/favorites">
            <button className={styles.favoritesButton}>
              ❤️ Moji favoriti ❤️
            </button>
          </Link>
        </div>
      </header>

      <div className={styles.sortOptions}>
        <label>
          <input
            type="radio"
            name="sort"
            value="najnovije"
            checked={sortOption === "najnovije"}
            onChange={() => setSortOption("najnovije")}
          />
          Najnovije
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="najbolje"
            checked={sortOption === "najbolje"}
            onChange={() => setSortOption("najbolje")}
          />
          Najbolje ocijenjeno
        </label>
      </div>

      <main className={styles.main}>
        {sortedShows.length === 0 ? (
          <div className={styles.noResults}>
            <Image
              src="/images/notFound.png"
              alt="Nema rezultata za pretragu po imenu"
              width={300}
              height={200}
            />
            <p className={styles.pNotFoundSeries}>😞 Nema pronađenih serija 😢</p>
          </div>
        ) : (
          sortedShows.slice(0, visibleCount).map((show) => (
            <div key={show.id} className={styles.card}>
              <Image
                src={show.image?.medium || "/placeholder.jpg"}
                alt={show.name}
                width={210}
                height={295}
                className={styles.imageOfShow}
              />
              <h2>{show.name}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: show.summary?.slice(0, 100) + "...",
                }}
              />
              <p>
                <strong>Ocjena:</strong> {show.rating?.average || "N/A"}
              </p>
              <Link href={`/show/${show.id}`}>
                <button>Detalji</button>
              </Link>
            </div>
          ))
        )}

        {visibleCount < shows.length && sortedShows.length > 0 && (
          <button
            className={styles.loadMore}
            onClick={() => setVisibleCount((prev) => prev + 20)}
          >
            ⬇️ Učitaj još serija ⬇️
          </button>
        )}
      </main>

      <footer className={styles.footer}>
        <p>💻~Izradio: Mirko Radan~💻</p>
      </footer>
    </div>
  );
}
