import { Link } from 'react-router-dom';

import { useAppSelector } from '@/app/store/hooks';

import { Button } from '@/shared/ui';

import styles from './Hero.module.css';



export function Hero() {

  const user = useAppSelector((s) => s.session.user);



  return (

    <section className={styles.hero}>

      <h1>Образовательный маркетплейс</h1>

      <p>

        Курсы по программированию, дизайну и бизнесу — учитесь в своём темпе

      </p>

      <div className={styles.actions}>

        <Link to="/catalog">

          <Button>Смотреть каталог</Button>

        </Link>

        {user ? (

          <Link to="/profile">

            <Button variant="secondary">Продолжить обучение</Button>

          </Link>

        ) : (

          <Link to="/login">

            <Button variant="secondary">Войти</Button>

          </Link>

        )}

      </div>

    </section>

  );

}

