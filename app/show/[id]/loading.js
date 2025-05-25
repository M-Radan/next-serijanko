/* 
Stranica koja se prikazuje dok se podacai učitavaju.
Preko css modula se koristi gif animacija učitavanja.
*/
import styles from './styles/loader.module.css';

function Loading() {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
}
export default Loading;