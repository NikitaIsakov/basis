import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useGetFeedbackByAuthorQuery,
  useReplyToFeedbackMutation,
} from '@/entities/feedback';
import { Button, Loader, useToast } from '@/shared/ui';
import styles from './AuthorFeedbackInbox.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface AuthorFeedbackInboxProps {
  authorId: string;
}

export function AuthorFeedbackInbox({ authorId }: AuthorFeedbackInboxProps) {
  const { showToast } = useToast();
  const { data: items = [], isLoading } = useGetFeedbackByAuthorQuery(authorId);
  const [replyToFeedback, { isLoading: replying }] = useReplyToFeedbackMutation();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const handleReply = async (id: string, courseId: string) => {
    const reply = drafts[id]?.trim();
    if (!reply) return;
    try {
      await replyToFeedback({
        id,
        reply,
        courseId,
        authorId,
      }).unwrap();
      setDrafts((prev) => ({ ...prev, [id]: '' }));
      showToast('Ответ отправлен', 'success');
    } catch {
      showToast('Не удалось отправить ответ', 'error');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <section className={styles.inbox}>
      <h2 className={styles.title}>Сообщения студентов</h2>
      {items.length === 0 ? (
        <p style={{ color: 'var(--color-muted)' }}>Входящих сообщений пока нет.</p>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <Link to={`/courses/${item.courseId}`} className={styles.courseName}>
                  {item.courseTitle}
                </Link>
                <span className={styles.meta}>
                  {item.studentName} · {formatDate(item.createdAt)}
                </span>
              </div>
              <p className={styles.message}>{item.message}</p>
              {item.reply ? (
                <div className={styles.replyBox}>
                  <p className={styles.existingReply}>
                    <strong>Ваш ответ:</strong> {item.reply}
                  </p>
                </div>
              ) : (
                <div className={styles.replyBox}>
                  <textarea
                    className={styles.textarea}
                    placeholder="Напишите ответ студенту…"
                    value={drafts[item.id] ?? ''}
                    onChange={(e) =>
                      setDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                  />
                  <Button
                    type="button"
                    disabled={replying || !drafts[item.id]?.trim()}
                    onClick={() => handleReply(item.id, item.courseId)}
                  >
                    Ответить
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
