import { Input } from '@/shared/ui';
import styles from './CourseSearch.module.css';

interface CourseSearchProps {
  query: string;
  category: string;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function CourseSearch({
  query,
  category,
  categories,
  onQueryChange,
  onCategoryChange,
}: CourseSearchProps) {
  return (
    <div className={styles.search}>
      <Input
        label="Поиск курсов"
        name="query"
        placeholder="Название или описание..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <label className={styles.selectLabel}>
        <span>Категория</span>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={styles.select}
        >
          <option value="">Все</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
