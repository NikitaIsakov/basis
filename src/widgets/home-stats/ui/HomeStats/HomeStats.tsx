import { useMemo } from 'react';
import { useGetCoursesQuery } from '@/entities/course/api/courseRtkApi';
import { mockLessons } from '@/shared/lib/mockDb';
import styles from './HomeStats.module.css';

export function HomeStats() {
  const { data: courses = [] } = useGetCoursesQuery();
  const visible = courses.filter((c) => !c.hidden);

  const categoryCount = useMemo(
    () => new Set(visible.map((c) => c.category)).size,
    [visible],
  );

  const items = [
    { value: visible.length, label: 'Курсов' },
    { value: categoryCount, label: 'Категорий' },
    { value: mockLessons.length, label: 'Уроков' },
    { value: '10 000+', label: 'Студентов' },
  ];

  return (
    <section className={styles.stats} aria-label="Статистика платформы">
      {items.map((item) => (
        <div key={item.label} className={styles.card}>
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </section>
  );
}
