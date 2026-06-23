import { useAppSelector } from '@/app/store/hooks';
import { useGetLessonsByCourseQuery } from '@/entities/course/api/courseRtkApi';
import { CourseCard, type Course } from '@/entities/course';
import { getCourseProgress } from '@/shared/lib/courseProgress';

interface CourseCardWithProgressProps {
  course: Course;
}

export function CourseCardWithProgress({ course }: CourseCardWithProgressProps) {
  const user = useAppSelector((s) => s.session.user);
  const { data: lessons = [] } = useGetLessonsByCourseQuery(course.id);
  const progress = getCourseProgress(lessons, user?.completedLessonIds ?? []);

  return <CourseCard course={course} progress={progress.percent} />;
}
