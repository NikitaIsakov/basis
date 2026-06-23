import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import { AuthorCourseList } from '@/features/view-author-courses';
import styles from './AuthorCoursesPage.module.css';

export function AuthorCoursesPage() {
  const user = useAppSelector((s) => s.session.user)!;

  return (
    <div className="container page">
      <div className={styles.header}>
        <div>
          <h1 className="pageTitle">Мои курсы</h1>
          <p className={styles.subtitle}>
            Управляйте содержимым и следите за статусом публикации
          </p>
        </div>
        <Link to="/author/courses/new" className={styles.createLink}>
          + Создать курс
        </Link>
      </div>
      <AuthorCourseList authorId={user.id} />
    </div>
  );
}
