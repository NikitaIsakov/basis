import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';

export function ForbiddenPage() {
  return (
    <div className="container page" style={{ textAlign: 'center' }}>
      <h1 className="pageTitle">403</h1>
      <p>Недостаточно прав для просмотра страницы.</p>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
    </div>
  );
}
