/*
Stranica koja prikazje popis svih glumaca serije.
Na jednostavan način korištenjem API-ja tvmaze.com dohvaća sve glumce te njihove uloge.
Na stranici se prikazuju slike glumaca, njihova imena te uloge koje su odigrali u seriji.
*/

import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import styles from "./cast.module.css"; 
import React from "react";
async function CastPage({ params }) {
  const res = await fetch(`https://api.tvmaze.com/shows/${params.id}/cast`);
  const cast = await res.json();

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>🎭 Glumačka postava ✨</h1>
      <ul className={styles.castMemberList}>
        {cast.map((item, index) => (
          <li
            key={`${item.person.id}-${item.character?.id || index}`}
            className={styles.castBox}
          >
            
            <Image
              src={item.person.image?.medium || "./noImage.webp"}
              alt={item.person.name}
              width={60}
              height={90}
              className={styles.castPicture}
            />
            <div>
              <p>
                <strong>{item.person.name}</strong> kao {" "}
                <em>{item.character.name}</em>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CastPage;
