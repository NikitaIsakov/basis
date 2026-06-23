export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  authorId: string;
  rating: number;
  hidden?: boolean;
  level: CourseLevel;
  durationHours: number;
  studentsCount: number;
  learningOutcomes: string[];
  requirements: string[];
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  hidden?: boolean;
  level?: CourseLevel;
  durationHours?: number;
  learningOutcomes?: string[];
  requirements?: string[];
}

export interface CreateCourseDto {
  title: string;
  description: string;
  price: number;
  category: string;
  authorId: string;
  level?: CourseLevel;
  durationHours?: number;
  learningOutcomes?: string[];
  requirements?: string[];
}

export const DEFAULT_COURSE_META = {
  level: 'beginner' as CourseLevel,
  durationHours: 6,
  studentsCount: 0,
  learningOutcomes: [] as string[],
  requirements: [] as string[],
};
