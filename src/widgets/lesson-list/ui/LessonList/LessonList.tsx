import { Link } from 'react-router-dom';
import type { Lesson } from '@/entities/lesson/model/types';
import { getCourseProgress } from '@/shared/lib/courseProgress';
import styles from './LessonList.module.css';

export type LessonItemStatus = 'completed' | 'current' | 'available' | 'locked';

interface LessonListProps {
  courseId: string;
  lessons: Lesson[];
  completedLessonIds: string[];
  enrolled: boolean;
  activeLessonId?: string;
  compact?: boolean;
}

function getLessonStatus(
  lesson: Lesson,
  completedLessonIds: string[],
  nextLessonId: string | undefined,
  enrolled: boolean,
  activeLessonId?: string,
): LessonItemStatus {
  if (!enrolled) return 'locked';
  if (completedLessonIds.includes(lesson.id)) return 'completed';
  if (activeLessonId === lesson.id || nextLessonId === lesson.id) return 'current';
  return 'available';
}

function StatusIcon({ status }: { status: LessonItemStatus }) {
  switch (status) {
    case 'completed':
      return <span className={`${styles.icon} ${styles.iconCompleted}`}>✓</span>;
    case 'current':
      return <span className={`${styles.icon} ${styles.iconCurrent}`}>→</span>;
    case 'locked':
      return <span className={`${styles.icon} ${styles.iconLocked}`}>🔒</span>;
    default:
      return <span className={styles.icon}>○</span>;
  }
}

export function LessonList({
  courseId,
  lessons,
  completedLessonIds,
  enrolled,
  activeLessonId,
  compact,
}: LessonListProps) {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const { nextLessonId } = getCourseProgress(sorted, completedLessonIds);

  return (
    <ul className={`${styles.lessonList} ${compact ? styles.compact : ''}`}>
      {sorted.map((lesson) => {
        const status = getLessonStatus(
          lesson,
          completedLessonIds,
          nextLessonId,
          enrolled,
          activeLessonId,
        );
        const locked = status === 'locked';

        return (
          <li
            key={lesson.id}
            className={`${styles.item} ${status === 'current' ? styles.itemCurrent : ''} ${status === 'completed' ? styles.itemCompleted : ''} ${locked ? styles.itemLocked : ''}`}
          >
            {locked ? (
              <div className={`${styles.link} ${styles.linkDisabled}`}>
                <StatusIcon status={status} />
                <div className={styles.body}>
                  <div className={styles.title}>
                    {lesson.order}. {lesson.title}
                  </div>
                  <div className={styles.order}>
                    {lesson.durationMinutes ? `${lesson.durationMinutes} мин · ` : ''}
                    Запишитесь на курс
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to={`/courses/${courseId}/lessons/${lesson.id}`}
                className={styles.link}
              >
                <StatusIcon status={status} />
                <div className={styles.body}>
                  <div className={styles.title}>
                    {lesson.order}. {lesson.title}
                  </div>
                  <div className={styles.order}>
                    {lesson.durationMinutes ? `${lesson.durationMinutes} мин` : ''}
                    {status === 'completed' && ' · Пройден'}
                    {status === 'current' && ' · Текущий урок'}
                  </div>
                </div>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
