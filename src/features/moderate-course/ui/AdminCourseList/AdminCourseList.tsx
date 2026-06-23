import {
  useGetCoursesQuery,
  useSetCourseHiddenMutation,
} from '@/entities/course/api/courseRtkApi';
import { useToast } from '@/shared/ui';
import { Button, Loader, ErrorMessage, EmptyState } from '@/shared/ui';
import { formatPrice } from '@/shared/lib/formatPrice';
import styles from './AdminCourseList.module.css';

export function AdminCourseList() {
  const { data: courses, isLoading, error } = useGetCoursesQuery(true);
  const [setHidden] = useSetCourseHiddenMutation();
  const { showToast } = useToast();

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Ошибка загрузки курсов" />;
  if (!courses?.length) return <EmptyState message="Курсы не найдены" />;

  const handleToggle = async (id: string, hidden: boolean) => {
    try {
      await setHidden({ id, hidden }).unwrap();
      showToast(hidden ? 'Курс скрыт' : 'Курс опубликован', 'success');
    } catch {
      showToast('Ошибка модерации', 'error');
    }
  };

  return (
    <div className={styles.list}>
      {courses.map((course) => (
        <article key={course.id} className={styles.row}>
          <div>
            <h3>{course.title}</h3>
            <p className={styles.meta}>
              {course.category} · {formatPrice(course.price)}
              {course.hidden ? ' · скрыт' : ''}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => handleToggle(course.id, !course.hidden)}
          >
            {course.hidden ? 'Опубликовать' : 'Скрыть'}
          </Button>
        </article>
      ))}
    </div>
  );
}
