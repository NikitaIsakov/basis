import { useGetAuthorQuery } from '@/entities/author';
import { mockUsers } from '@/shared/lib/mockData';
import { Loader } from '@/shared/ui';
import styles from './AuthorCard.module.css';

interface AuthorCardProps {
  authorId: string;
  showEmail?: boolean;
}

export function AuthorCard({ authorId, showEmail }: AuthorCardProps) {
  const { data: author, isLoading } = useGetAuthorQuery(authorId);

  if (isLoading) return <Loader />;
  if (!author) return null;

  const user = mockUsers.find((u) => u.id === authorId);
  const initials = author.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Об авторе</h2>
      <div className={styles.header}>
        <div className={styles.avatar}>{initials}</div>
        <div>
          <p className={styles.name}>{author.name}</p>
          <p className={styles.subtitle}>{author.coursesCount} курсов на платформе</p>
        </div>
      </div>
      <p className={styles.bio}>{author.bio}</p>
      <div className={styles.tags}>
        {author.expertise.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      {showEmail && user && (
        <p className={styles.email}>Контакт: {user.email}</p>
      )}
    </section>
  );
}
