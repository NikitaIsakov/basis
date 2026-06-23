import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';

export function NotFoundPage() {
  return (
    <div className="container page" style={{ textAlign: 'center' }}>
      <h1 className="pageTitle">404</h1>
      <p>Страница не найдена.</p>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
    </div>
  );
}
