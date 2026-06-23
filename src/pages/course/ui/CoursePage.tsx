import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import {
  useGetCourseQuery,
  useGetLessonsByCourseQuery,
} from '@/entities/course/api/courseRtkApi';
import { CourseProgressBar } from '@/entities/course/ui/CourseProgress/CourseProgressBar';
import { EnrollButton } from '@/features/enroll-course';
import { CourseFeedbackSection } from '@/features/send-feedback';
import { formatPrice } from '@/shared/lib/formatPrice';
import { getCourseProgress } from '@/shared/lib/courseProgress';
import { Loader, ErrorMessage, Button } from '@/shared/ui';
import { AuthorCard } from '@/widgets/author-card';
import { CourseDetails } from '@/widgets/course-details';
import { LessonList } from '@/widgets/lesson-list';
import styles from './CoursePage.module.css';

export function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((s) => s.session.user);
  const { data: course, isLoading, error } = useGetCourseQuery(id ?? '', {
    skip: !id,
  });
  const { data: lessons = [] } = useGetLessonsByCourseQuery(id ?? '', {
    skip: !id,
  });

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
        <Link to="/catalog">В каталог</Link>
      </div>
    );
  }

  const isAuthor = user?.role === 'author' && user.id === course.authorId;
  const enrolled =
    user?.role === 'user' && user.enrolledCourseIds.includes(course.id);
  const completedIds = user?.completedLessonIds ?? [];
  const progress = getCourseProgress(lessons, completedIds);

  return (
    <div className="container page">
      <div className={styles.layout}>
        <div>
          <p className={styles.meta}>{course.category}</p>
          <h1 className="pageTitle">{course.title}</h1>
          <p>
            <strong>{formatPrice(course.price)}</strong>
          </p>
          <CourseDetails course={course} lessonsCount={lessons.length} />
          <AuthorCard authorId={course.authorId} showEmail={Boolean(enrolled)} />
          <div className={styles.actions}>
            <EnrollButton courseId={course.id} />
            {enrolled && progress.nextLessonId && (
              <Link to={`/courses/${course.id}/lessons/${progress.nextLessonId}`}>
                <Button>Продолжить обучение</Button>
              </Link>
            )}
          </div>
          {enrolled && (
            <div style={{ marginTop: '1.5rem' }}>
              <CourseProgressBar progress={progress} />
            </div>
          )}
          {isAuthor && (
            <p style={{ marginTop: '1rem' }}>
              <Link to={`/author/courses/${course.id}/edit`}>Редактировать курс</Link>
              {' · '}
              <Link to={`/author/courses/${course.id}/edit?tab=lessons`}>
                Управление уроками
              </Link>
            </p>
          )}
          <CourseFeedbackSection course={course} />
        </div>

        {lessons.length > 0 && (
          <aside className={styles.sidebar}>
            <section className={styles.lessonsSection}>
              <h2>Уроки</h2>
              <LessonList
                courseId={course.id}
                lessons={lessons}
                completedLessonIds={completedIds}
                enrolled={Boolean(enrolled)}
              />
            </section>
          </aside>
        )}
      </div>
    </div>
  );
}
