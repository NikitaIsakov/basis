import { useState } from 'react';
import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonsByCourseQuery,
  useReorderLessonsMutation,
} from '@/entities/lesson';
import { Button, Loader, useToast } from '@/shared/ui';
import { LessonEditor } from '@/features/edit-lesson-content';
import styles from './LessonManager.module.css';

interface LessonManagerProps {
  courseId: string;
}

export function LessonManager({ courseId }: LessonManagerProps) {
  const { showToast } = useToast();
  const { data: lessons = [], isLoading } = useGetLessonsByCourseQuery(courseId);
  const [createLesson, { isLoading: creating }] = useCreateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();
  const [reorderLessons] = useReorderLessonsMutation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const selected = isNew ? null : sorted.find((l) => l.id === selectedId) ?? null;

  const handleAdd = async () => {
    try {
      const lesson = await createLesson({
        courseId,
        title: `Урок ${sorted.length + 1}`,
        content: '',
      }).unwrap();
      setSelectedId(lesson.id);
      setIsNew(false);
      showToast('Урок добавлен', 'success');
    } catch {
      showToast('Не удалось добавить урок', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Удалить урок?')) return;
    try {
      await deleteLesson({ id, courseId }).unwrap();
      if (selectedId === id) setSelectedId(null);
      showToast('Урок удалён', 'success');
    } catch {
      showToast('Не удалось удалить урок', 'error');
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sorted.length) return;
    const orderedIds = sorted.map((l) => l.id);
    [orderedIds[index], orderedIds[target]] = [orderedIds[target], orderedIds[index]];
    try {
      await reorderLessons({ courseId, orderedIds }).unwrap();
    } catch {
      showToast('Не удалось изменить порядок', 'error');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.manager}>
      <div className={styles.toolbar}>
        <h2 style={{ margin: 0, fontSize: '1.125rem' }}>Уроки курса</h2>
        <Button type="button" onClick={handleAdd} disabled={creating}>
          {creating ? 'Добавление…' : '+ Добавить урок'}
        </Button>
      </div>

      {sorted.length === 0 ? (
        <div className={styles.empty}>
          <p>Уроков пока нет. Добавьте первый урок, чтобы студенты могли начать обучение.</p>
          <Button type="button" onClick={handleAdd} disabled={creating} style={{ marginTop: '1rem' }}>
            Добавить первый урок
          </Button>
        </div>
      ) : (
        <ul className={styles.list}>
          {sorted.map((lesson, index) => (
            <li key={lesson.id}>
              <div
                className={`${styles.item} ${selectedId === lesson.id && !isNew ? styles.itemActive : ''}`}
                onClick={() => {
                  setSelectedId(lesson.id);
                  setIsNew(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedId(lesson.id);
                    setIsNew(false);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className={styles.itemInfo}>
                  <div className={styles.itemTitle}>
                    {lesson.order}. {lesson.title}
                  </div>
                  <div className={styles.itemMeta}>
                    {lesson.durationMinutes ?? '—'} мин
                    {lesson.blocks?.length
                      ? ` · ${lesson.blocks.length} блоков`
                      : lesson.content
                        ? ' · текст'
                        : ''}
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    disabled={index === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      void move(index, -1);
                    }}
                    aria-label="Выше"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    disabled={index === sorted.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      void move(index, 1);
                    }}
                    aria-label="Ниже"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      void handleDelete(lesson.id);
                    }}
                    aria-label="Удалить"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {(selected || isNew) && (
        <div className={styles.editorWrap}>
          {selected && (
            <LessonEditor
              key={selected.id}
              courseId={courseId}
              lesson={selected}
              onSaved={() => showToast('Урок сохранён', 'success')}
            />
          )}
        </div>
      )}

      {sorted.length > 0 && !selectedId && (
        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', margin: 0 }}>
          Выберите урок из списка для редактирования контента.
        </p>
      )}
    </div>
  );
}
