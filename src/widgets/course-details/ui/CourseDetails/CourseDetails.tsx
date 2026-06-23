import type { Course } from '@/entities/course/model/types';
import { courseLevelLabel } from '@/shared/lib/courseLevelLabel';
import styles from './CourseDetails.module.css';

interface CourseDetailsProps {
  course: Course;
  lessonsCount: number;
}

export function CourseDetails({ course, lessonsCount }: CourseDetailsProps) {
  return (
    <section className={styles.details}>
      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          <span className={styles.levelBadge}>{courseLevelLabel(course.level)}</span>
        </span>
        <span className={styles.metaItem}>
          <strong>{course.durationHours}</strong> ч
        </span>
        <span className={styles.metaItem}>
          <strong>{course.studentsCount.toLocaleString('ru-RU')}</strong> студентов
        </span>
        <span className={styles.metaItem}>
          <strong>{lessonsCount}</strong> уроков
        </span>
        <span className={styles.metaItem}>★ {course.rating}</span>
      </div>
      <p className={styles.description}>{course.description}</p>
      {course.learningOutcomes.length > 0 && (
        <>
          <h3 className={styles.sectionTitle}>Чему вы научитесь</h3>
          <ul className={styles.list}>
            {course.learningOutcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      {course.requirements.length > 0 && (
        <>
          <h3 className={styles.sectionTitle}>Требования</h3>
          <ul className={styles.list}>
            {course.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
