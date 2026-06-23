import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { enrollCourse } from '@/features/auth';
import { Button, useToast } from '@/shared/ui';

interface EnrollButtonProps {
  courseId: string;
}

export function EnrollButton({ courseId }: EnrollButtonProps) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const user = useAppSelector((s) => s.session.user);
  const enrolled = user?.enrolledCourseIds.includes(courseId);

  if (!user || user.role !== 'user') {
    return <p>Войдите как студент, чтобы записаться на курс.</p>;
  }

  if (enrolled) {
    return <p>Вы уже записаны на этот курс.</p>;
  }

  return (
    <Button
      onClick={() => {
        dispatch(enrollCourse(courseId));
        showToast('Вы записаны на курс', 'success');
      }}
    >
      Записаться на курс
    </Button>
  );
}
