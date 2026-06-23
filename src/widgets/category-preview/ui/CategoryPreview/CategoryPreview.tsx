import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../model/categories';
import styles from './CategoryPreview.module.css';

export function CategoryPreview() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Категории</h2>
      <div className={styles.grid}>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            to={`/catalog?category=${encodeURIComponent(cat.name)}`}
            className={styles.card}
            style={{ background: cat.color }}
          >
            <span className={styles.icon}>{cat.icon}</span>
            <span className={styles.name}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
