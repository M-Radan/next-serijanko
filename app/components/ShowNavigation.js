"use client";
import Link from "next/link";
import styles from "./navigation.module.css";
import BackButton from "./BackButton";
import { useEffect, useState } from "react";


function ShowNavigation({ showId }) {
  return (
    <nav className={styles.nav}>
      <BackButton className={styles.backBtn}></BackButton>
      <Link className={styles.link} href={`/show/${showId}/episodes`}>Epizode</Link>
      <Link className={styles.link} href={`/show/${showId}/cast`}>Glumci</Link>
      <Link className={styles.link} href="/favorites">Favoriti</Link>
    </nav>
  );
}
export default ShowNavigation;
