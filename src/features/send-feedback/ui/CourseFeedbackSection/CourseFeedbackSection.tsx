import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import type { Course } from '@/entities/course/model/types';
import {
  useGetFeedbackByCourseQuery,
  useSendFeedbackMutation,
} from '@/entities/feedback';
import { Button, Loader, useToast } from '@/shared/ui';
import styles from './CourseFeedbackSection.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface CourseFeedbackSectionProps {
  course: Course;
  compact?: boolean;
}

export function CourseFeedbackSection({
  course,
  compact,
}: CourseFeedbackSectionProps) {
  const user = useAppSelector((s) => s.session.user);
  const { showToast } = useToast();
  const [message, setMessage] = useState('');
  const enrolled =
    user?.role === 'user' && user.enrolledCourseIds.includes(course.id);

  const { data: feedback = [], isLoading } = useGetFeedbackByCourseQuery(
    { courseId: course.id, studentId: user?.id },
    { skip: !user || user.role !== 'user' },
  );
  const [sendFeedback, { isLoading: sending }] = useSendFeedbackMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;
    try {
      await sendFeedback({
        courseId: course.id,
        courseTitle: course.title,
        studentId: user.id,
        studentName: user.name,
        authorId: course.authorId,
        message: message.trim(),
      }).unwrap();
      setMessage('');
      showToast('Сообщение отправлено преподавателю', 'success');
    } catch {
      showToast('Не удалось отправить сообщение', 'error');
    }
  };

  if (!user || user.role !== 'user') {
    return null;
  }

  if (!enrolled) {
    return (
      <section className={`${styles.section} ${compact ? styles.compact : ''}`}>
        <h2 className={styles.title}>Обратная связь</h2>
        <p className={styles.hint}>
          Запишитесь на курс, чтобы задавать вопросы преподавателю.{' '}
          <Link to={`/courses/${course.id}`}>Перейти к курсу</Link>
        </p>
      </section>
    );
  }

  return (
    <section
      id="feedback"
      className={`${styles.section} ${compact ? styles.compact : ''}`}
    >
      <h2 className={styles.title}>Обратная связь с преподавателем</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.thread}>
          {feedback.length === 0 && (
            <p className={styles.hint}>Вы ещё не задавали вопросов по этому курсу.</p>
          )}
          {feedback.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={`${styles.bubble} ${styles.studentBubble}`}>
                {item.message}
              </div>
              <span className={styles.meta}>Вы · {formatDate(item.createdAt)}</span>
              {item.reply && (
                <>
                  <div className={`${styles.bubble} ${styles.authorBubble}`}>
                    {item.reply}
                  </div>
                  <span className={styles.meta}>
                    Преподаватель
                    {item.repliedAt ? ` · ${formatDate(item.repliedAt)}` : ''}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      {!compact && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            placeholder="Ваш вопрос преподавателю…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button type="submit" disabled={sending}>
            {sending ? 'Отправка…' : 'Отправить преподавателю'}
          </Button>
        </form>
      )}
      {compact && (
        <Link to={`/courses/${course.id}#feedback`}>Задать вопрос на странице курса →</Link>
      )}
    </section>
  );
}
