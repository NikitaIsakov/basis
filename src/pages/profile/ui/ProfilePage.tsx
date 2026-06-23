import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import { ProfilePanel } from '@/widgets/profile-panel';
import { useGetCoursesQuery } from '@/entities/course/api/courseRtkApi';
import { CourseCardWithProgress } from '@/entities/course/ui/CourseCardWithProgress/CourseCardWithProgress';
import { AuthorFeedbackInbox } from '@/features/view-author-feedback';
import { Loader } from '@/shared/ui';
import styles from '@/widgets/course-list/ui/CourseList/CourseList.module.css';

export function ProfilePage() {
  const user = useAppSelector((s) => s.session.user)!;
  const { data: allCourses = [], isLoading } = useGetCoursesQuery();

  const myCourses = allCourses.filter((c) =>
    user.enrolledCourseIds.includes(c.id),
  );

  return (
    <div className="container page">
      <h1 className="pageTitle">Личный кабинет</h1>
      <ProfilePanel user={user} />
      {user.role === 'author' && (
        <>
          <AuthorFeedbackInbox authorId={user.id} />
          <p style={{ marginTop: '1rem' }}>
            <Link to="/author/courses">Перейти к моим курсам</Link>
          </p>
        </>
      )}
      {user.role === 'user' && (
        <>
          <h2 style={{ marginTop: '2rem' }}>Мои курсы</h2>
          {isLoading ? (
            <Loader />
          ) : myCourses.length === 0 ? (
            <p>Вы ещё не записаны на курсы</p>
          ) : (
            <div className={styles.grid}>
              {myCourses.map((course) => (
                <CourseCardWithProgress key={course.id} course={course} />
              ))}
            </div>
          )}
          <p style={{ marginTop: '1rem', color: 'var(--color-muted)' }}>
            Пройдено уроков: {user.completedLessonIds.length}
          </p>
        </>
      )}
    </div>
  );
}
