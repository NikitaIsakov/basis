export type UserRole = 'guest' | 'user' | 'author' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Exclude<UserRole, 'guest'>;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
}
