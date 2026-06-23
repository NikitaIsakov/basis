import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { completeLesson } from '@/features/auth';
import { useToast } from '@/shared/ui';
import { Button } from '@/shared/ui';

interface CompleteLessonButtonProps {
  lessonId: string;
  disabled?: boolean;
  disabledReason?: string;
}

export function CompleteLessonButton({
  lessonId,
  disabled,
  disabledReason,
}: CompleteLessonButtonProps) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const user = useAppSelector((s) => s.session.user);
  const done = user?.completedLessonIds.includes(lessonId);

  if (!user || user.role !== 'user') {
    return <p>Для прохождения урока войдите как студент.</p>;
  }

  if (done) {
    return <p>Урок пройден.</p>;
  }

  return (
    <div>
      {disabled && disabledReason && (
        <p style={{ color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
          {disabledReason}
        </p>
      )}
      <Button
        disabled={disabled}
        onClick={() => {
          dispatch(completeLesson(lessonId));
          showToast('Урок отмечен как пройденный', 'success');
        }}
      >
        Завершить урок
      </Button>
    </div>
  );
}
