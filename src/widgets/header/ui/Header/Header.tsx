import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { clearSession } from '@/features/auth';
import { Button } from '@/shared/ui';
import styles from './Header.module.css';

export function Header() {
  const user = useAppSelector((s) => s.session.user);
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          Базис
        </Link>
        <button
          type="button"
          className={styles.burger}
          aria-label="Меню"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            Главная
          </NavLink>
          <NavLink to="/catalog" onClick={() => setMenuOpen(false)}>
            Каталог
          </NavLink>
          {user?.role === 'author' && (
            <>
              <NavLink to="/author/courses" onClick={() => setMenuOpen(false)}>
                Мои курсы
              </NavLink>
              <NavLink to="/author/courses/new" onClick={() => setMenuOpen(false)}>
                Создать курс
              </NavLink>
            </>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
              Админ
            </NavLink>
          )}
          {user ? (
            <>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                {user.name}
              </NavLink>
              <Button variant="ghost" onClick={() => dispatch(clearSession())}>
                Выйти
              </Button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Войти
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
