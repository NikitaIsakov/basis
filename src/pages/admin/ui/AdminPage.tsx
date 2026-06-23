import { AdminCourseList } from '@/features/moderate-course';

export function AdminPage() {
  return (
    <div className="container page">
      <h1 className="pageTitle">Панель администратора</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        Модерация каталога: публикация и скрытие курсов.
      </p>
      <AdminCourseList />
    </div>
  );
}
