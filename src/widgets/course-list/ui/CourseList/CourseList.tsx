import { CourseCard, type Course } from '@/entities/course';
import styles from './CourseList.module.css';

interface CourseListProps {
  courses: Course[];
  emptyMessage?: string;
}

export function CourseList({ courses, emptyMessage = 'Курсы не найдены' }: CourseListProps) {
  if (courses.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className={styles.grid}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
