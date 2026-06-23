import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@/app/store/hooks';
import { loginUser } from '@/entities/user';
import { setSession } from '../../model/sessionSlice';
import { Button, Input } from '@/shared/ui';
import styles from './AuthForm.module.css';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('student@mail.ru');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const user = await loginUser(email, password);
    if (!user) {
      setError('Неверный email или пароль');
      return;
    }
    dispatch(setSession({ user, token: `token-${user.id}` }));
    navigate('/profile');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Вход</h1>
      <p className={styles.hint}>
        Демо: student@mail.ru / author@mail.ru / admin@mail.ru (пароль 123456)
      </p>
      <Input
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button type="submit">Войти</Button>
      <Link to="/register">Регистрация</Link>
    </form>
  );
}
