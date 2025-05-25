import styles from './styles/loader.module.css';

export default function Loading() {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
}