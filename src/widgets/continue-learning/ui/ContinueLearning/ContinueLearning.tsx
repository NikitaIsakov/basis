import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import { useGetCoursesQuery, useGetLessonsByCourseQuery } from '@/entities/course/api/courseRtkApi';
import { CourseProgressBar } from '@/entities/course/ui/CourseProgress/CourseProgressBar';
import type { Course } from '@/entities/course/model/types';
import { getCourseProgress } from '@/shared/lib/courseProgress';
import styles from './ContinueLearning.module.css';

function ContinueLearningItem({ course }: { course: Course }) {
  const user = useAppSelector((s) => s.session.user)!;
  const { data: lessons = [] } = useGetLessonsByCourseQuery(course.id);
  const progress = getCourseProgress(lessons, user.completedLessonIds);

  if (progress.percent >= 100) return null;

  return (
    <div className={styles.item}>
      <div>
        <p className={styles.courseTitle}>{course.title}</p>
        <div className={styles.progressWrap}>
          <CourseProgressBar progress={progress} compact />
        </div>
      </div>
      {progress.nextLessonId && (
        <Link
          to={`/courses/${course.id}/lessons/${progress.nextLessonId}`}
          className={styles.link}
        >
          Продолжить →
        </Link>
      )}
    </div>
  );
}

export function ContinueLearning() {
  const user = useAppSelector((s) => s.session.user);
  const { data: courses = [] } = useGetCoursesQuery();

  if (!user || user.role !== 'user' || user.enrolledCourseIds.length === 0) {
    return null;
  }

  const enrolled = courses.filter((c) => user.enrolledCourseIds.includes(c.id));
  const toShow = enrolled.slice(0, 2);

  if (toShow.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Продолжить обучение</h2>
      <div className={styles.list}>
        {toShow.map((course) => (
          <ContinueLearningItem key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
