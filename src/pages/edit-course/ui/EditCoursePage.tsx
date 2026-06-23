import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import { useGetCourseQuery } from '@/entities/course/api/courseRtkApi';
import { useGetLessonsByCourseQuery } from '@/entities/lesson';
import { EditCourseForm } from '@/features/edit-course';
import { LessonManager } from '@/features/manage-lessons';
import { Loader, ErrorMessage } from '@/shared/ui';
import styles from './EditCoursePage.module.css';

type Tab = 'main' | 'lessons';

export function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector((s) => s.session.user);
  const tab = (searchParams.get('tab') === 'lessons' ? 'lessons' : 'main') as Tab;

  const { data: course, isLoading, error } = useGetCourseQuery(id ?? '', { skip: !id });
  const { data: lessons = [] } = useGetLessonsByCourseQuery(id ?? '', { skip: !id });

  if (!id) return null;
  if (isLoading) {
    return (
      <div className="container page">
        <Loader />
      </div>
    );
  }
  if (error || !course) {
    return (
      <div className="container page">
        <ErrorMessage message="Курс не найден" />
      </div>
    );
  }
  if (user?.id !== course.authorId) {
    return <Navigate to="/403" replace />;
  }

  const setTab = (next: Tab) => {
    setSearchParams(next === 'lessons' ? { tab: 'lessons' } : {});
  };

  return (
    <div className="container page">
      <div className={styles.header}>
        <Link to={`/courses/${id}`} className={styles.backLink}>← К курсу</Link>
        <h1 className="pageTitle">{course.title}</h1>
      </div>

      <div className={styles.tabs} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'main'}
          className={`${styles.tab} ${tab === 'main' ? styles.tabActive : ''}`}
          onClick={() => setTab('main')}
        >
          Основное
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'lessons'}
          className={`${styles.tab} ${tab === 'lessons' ? styles.tabActive : ''}`}
          onClick={() => setTab('lessons')}
        >
          Уроки ({lessons.length})
        </button>
      </div>

      <div className={styles.panel}>
        {tab === 'main' && <EditCourseForm courseId={id} />}
        {tab === 'lessons' && <LessonManager courseId={id} />}
      </div>
    </div>
  );
}
