import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';
import type { CourseProgress } from '@/shared/lib/courseProgress';

interface CourseProgressBarProps {
  progress: CourseProgress;
  compact?: boolean;
}

export function CourseProgressBar({ progress, compact }: CourseProgressBarProps) {
  if (progress.total === 0) return null;

  const label = `${progress.completed} из ${progress.total} уроков (${progress.percent}%)`;

  return (
    <ProgressBar percent={progress.percent} label={label} compact={compact} />
  );
}
