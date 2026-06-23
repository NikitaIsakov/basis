import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  percent: number;
  label?: string;
  compact?: boolean;
}

export function ProgressBar({ percent, label, compact }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div
      className={`${styles.progressBar} ${compact ? styles.compact : ''}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
