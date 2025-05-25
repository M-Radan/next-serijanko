/* 
Komponenta za povratak na prethodnu stranicu
*/
"use client";
import styles from "./backBtn.module.css"
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <button
          onClick={() => router.back()}
          className={styles.backBtn}
          title="Natrag"
          alt="Natrag na prethodnu stranicu"
        >
          ↩️ Natrag 
      </button>
  );
}
export default BackButton;