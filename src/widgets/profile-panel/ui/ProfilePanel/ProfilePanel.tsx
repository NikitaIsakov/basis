import type { User } from '@/shared/types/roles';
import styles from './ProfilePanel.module.css';

interface ProfilePanelProps {
  user: User;
}

export function ProfilePanel({ user }: ProfilePanelProps) {
  return (
    <section className={styles.panel}>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Роль: {user.role}</p>
      <p>Записано на курсов: {user.enrolledCourseIds.length}</p>
    </section>
  );
}
