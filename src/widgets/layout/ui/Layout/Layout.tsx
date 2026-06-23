import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="container" style={{ padding: '2rem 0', color: '#64748b' }}>
        © 2026 Базис — образовательный маркетплейс
      </footer>
    </>
  );
}
