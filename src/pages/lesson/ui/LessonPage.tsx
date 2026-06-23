import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import {
  useGetCourseQuery,
  useGetLessonQuery,
  useGetLessonsByCourseQuery,
} from '@/entities/course/api/courseRtkApi';
import { LessonContent } from '@/entities/lesson';
import { CompleteLessonButton } from '@/features/complete-lesson';
import { CourseFeedbackSection } from '@/features/send-feedback';
import { lessonHasQuiz } from '@/shared/lib/courseProgress';
import { Loader, ErrorMessage } from '@/shared/ui';
import { LessonList } from '@/widgets/lesson-list';
import styles from './LessonPage.module.css';

export function LessonPage() {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const user = useAppSelector((s) => s.session.user);
  const { data: lesson, isLoading, error } = useGetLessonQuery(lessonId ?? '', {
    skip: !lessonId,
  });
  const { data: lessons = [] } = useGetLessonsByCourseQuery(courseId ?? '', {
    skip: !courseId,
  });
  const { data: course } = useGetCourseQuery(courseId ?? '', { skip: !courseId });

  const [quizPassed, setQuizPassed] = useState(false);

  useEffect(() => {
    if (lesson) {
      setQuizPassed(!lessonHasQuiz(lesson));
    }
  }, [lessonId, lesson]);

  if (isLoading) {
    return (
      <div className="container page">
        <Loader />
      </div>
    );
  }

  if (error || !lesson || !courseId) {
    return (
      <div className="container page">
        <ErrorMessage message="Урок не найден" />
      </div>
    );
  }

  const enrolled =
    user?.role === 'user' && user.enrolledCourseIds.includes(courseId);
  const completedIds = user?.completedLessonIds ?? [];
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < sorted.length - 1
      ? sorted[currentIndex + 1]
      : null;
  const hasQuiz = lessonHasQuiz(lesson);
  const canComplete = enrolled && (!hasQuiz || quizPassed);

  return (
    <div className="container page">
      <p>
        <Link to={`/courses/${courseId}`}>← К курсу{course ? `: ${course.title}` : ''}</Link>
      </p>

      {!enrolled && user?.role === 'user' && (
        <div className={styles.enrollPrompt}>
          <p style={{ margin: 0 }}>
            Запишитесь на курс, чтобы проходить уроки.{' '}
            <Link to={`/courses/${courseId}`}>Перейти к курсу</Link>
          </p>
        </div>
      )}

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>Содержание</p>
          <LessonList
            courseId={courseId}
            lessons={lessons}
            completedLessonIds={completedIds}
            enrolled={Boolean(enrolled)}
            activeLessonId={lesson.id}
            compact
          />
        </aside>

        <div>
          <h1 className="pageTitle">{lesson.title}</h1>
          <LessonContent
            key={lesson.id}
            lesson={lesson}
            onQuizPassed={setQuizPassed}
          />
          <div style={{ marginTop: '2rem' }}>
            <CompleteLessonButton
              lessonId={lesson.id}
              disabled={!canComplete}
              disabledReason={
                !enrolled
                  ? undefined
                  : hasQuiz && !quizPassed
                    ? 'Сначала пройдите викторину'
                    : undefined
              }
            />
          </div>

          <nav className={styles.nav}>
            {prevLesson ? (
              <Link
                to={`/courses/${courseId}/lessons/${prevLesson.id}`}
                className={styles.navLink}
              >
                ← {prevLesson.title}
              </Link>
            ) : (
              <span className={styles.navLinkDisabled}>← Предыдущий</span>
            )}
            {nextLesson ? (
              <Link
                to={`/courses/${courseId}/lessons/${nextLesson.id}`}
                className={styles.navLink}
              >
                {nextLesson.title} →
              </Link>
            ) : (
              <span className={styles.navLinkDisabled}>Следующий →</span>
            )}
          </nav>
          {course && <CourseFeedbackSection course={course} compact />}
        </div>
      </div>
    </div>
  );
}
