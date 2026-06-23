import type { CourseLevel } from '@/entities/course/model/types';

const LABELS: Record<CourseLevel, string> = {
  beginner: 'Начальный',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

export function courseLevelLabel(level: CourseLevel): string {
  return LABELS[level];
}
