import { Link } from 'react-router-dom';
import { useGetCoursesByAuthorQuery } from '@/entities/course/api/courseRtkApi';
import { formatPrice } from '@/shared/lib/formatPrice';
import { courseLevelLabel } from '@/shared/lib/courseLevelLabel';
import { Loader, ErrorMessage, EmptyState } from '@/shared/ui';
import styles from './AuthorCourseList.module.css';

interface AuthorCourseListProps {
  authorId: string;
}

export function AuthorCourseList({ authorId }: AuthorCourseListProps) {
  const { data: courses, isLoading, error } = useGetCoursesByAuthorQuery(authorId);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Ошибка загрузки курсов" />;
  if (!courses?.length) {
    return (
      <div>
        <EmptyState message="У вас пока нет курсов" />
        <div className={styles.emptyCta}>
          <Link to="/author/courses/new" className={styles.actionLink}>
            Создать первый курс
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {courses.map((course) => (
        <article key={course.id} className={styles.row}>
          <div>
            <h3>{course.title}</h3>
            <p className={styles.meta}>
              {course.category} · {formatPrice(course.price)}
            </p>
            <p className={styles.meta}>
              {courseLevelLabel(course.level)} · {course.durationHours} ч ·{' '}
              {course.studentsCount} студентов · ★ {course.rating.toFixed(1)}
            </p>
            <div className={styles.statusRow}>
              <span
                className={`${styles.badge} ${
                  course.hidden ? styles.badgeHidden : styles.badgePublished
                }`}
              >
                {course.hidden ? 'Скрыт (модерация)' : 'Опубликован'}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <Link
              to={`/author/courses/${course.id}/edit`}
              className={styles.actionLink}
            >
              Редактировать
            </Link>
            <Link
              to={`/author/courses/${course.id}/edit?tab=lessons`}
              className={styles.actionLink}
            >
              Уроки
            </Link>
            <Link to={`/courses/${course.id}`} className={styles.actionLink}>
              Открыть
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
