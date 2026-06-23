import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@/app/store/hooks';
import { registerUser } from '@/entities/user';
import { setSession } from '../../model/sessionSlice';
import { Button, Input } from '@/shared/ui';
import styles from '../LoginForm/AuthForm.module.css';

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = await registerUser(email, password, name);
    dispatch(setSession({ user, token: `token-${user.id}` }));
    navigate('/profile');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Регистрация</h1>
      <Input label="Имя" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Пароль" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit">Создать аккаунт</Button>
      <Link to="/login">Уже есть аккаунт</Link>
    </form>
  );
}
