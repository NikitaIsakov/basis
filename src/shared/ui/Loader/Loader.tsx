import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.wrap} role="status" aria-label="Загрузка">
      <div className={styles.spinner} />
    </div>
  );
}
