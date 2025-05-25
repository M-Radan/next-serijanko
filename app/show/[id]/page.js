import Image from "next/image";
import FavoriteButton from "@/app/components/FavouriteButton";
import ShowNavigation from "@/app/components/ShowNavigation";
import styles from "./styles/details.module.css";

export default async function ShowDetails({ params }) {
  const showId = params.id;

  const res = await fetch(`https://api.tvmaze.com/shows/${showId}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Nažalost serija nije pronađena");
  }
  const show = await res.json();

  return (
    <div className={styles.container}>
      <ShowNavigation showId={showId} />
      <h1>🏷️ {show.name} 📌</h1>

      {show.image && (
        <Image
          src={show.image.medium}
          alt={show.name}
          width={210}
          height={295}
          className={styles.image}
        />
      )}

      <div
        className={styles.summary}
        dangerouslySetInnerHTML={{ __html: show.summary }}
      ></div>

      <div className={styles.favorite}>
        <FavoriteButton show={show} className={styles.favouriteBtn}/>
      </div>

      <p className={styles.info}>
        <strong>Status:</strong> {show.status}
      </p>
      <p className={styles.info2}>
        <strong>Žanrovi:</strong> {show.genres.join(", ")}
      </p>
    </div>
  );
}
