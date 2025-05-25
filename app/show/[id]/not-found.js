import styles from './styles/notFound.module.css';
export default function NotFound() {
  return (
    <div className={styles.containerNotFound}>
      <h2>Serija nije pronađena ❌</h2>
      <p>Provjerite URL ili se vratite na <a href="/">početnu stranicu</a>.</p>
    </div>
  );
}
