export type LessonBlock =
  | { type: 'text'; body: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'checklist'; items: string[] }
  | {
      type: 'quiz';
      question: string;
      options: string[];
      correctIndex: number;
    };

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  order: number;
  durationMinutes?: number;
  blocks?: LessonBlock[];
}

export interface CreateLessonDto {
  courseId: string;
  title: string;
  order?: number;
  durationMinutes?: number;
  content?: string;
  blocks?: LessonBlock[];
}

export interface UpdateLessonDto {
  title?: string;
  order?: number;
  durationMinutes?: number;
  content?: string;
  blocks?: LessonBlock[];
}
