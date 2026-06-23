import { Link } from 'react-router-dom';
import { formatPrice } from '@/shared/lib/formatPrice';
import { courseLevelLabel } from '@/shared/lib/courseLevelLabel';
import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';
import type { Course } from '../../model/types';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  return (
    <article className={styles.card} data-testid="course-card">
      <div className={styles.badge}>{course.category}</div>
      <p className={styles.meta}>
        {courseLevelLabel(course.level)} · {course.durationHours} ч
      </p>
      <h3 className={styles.title}>
        <Link to={`/courses/${course.id}`}>{course.title}</Link>
      </h3>
      <p className={styles.description}>{course.description}</p>
      {progress !== undefined && (
        <ProgressBar
          percent={progress}
          label={`Прогресс: ${progress}%`}
          compact
        />
      )}
      <footer className={styles.footer}>
        <span className={styles.price}>{formatPrice(course.price)}</span>
        <span className={styles.rating}>★ {course.rating.toFixed(1)}</span>
      </footer>
    </article>
  );
}
