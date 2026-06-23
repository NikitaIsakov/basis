import { axiosInstance } from '@/shared/api';
import { mockUsers } from '@/shared/lib/mockData';
import type { User } from '@/shared/types/roles';

export async function loginUser(
  email: string,
  password: string,
): Promise<User | null> {
  try {
    const { data } = await axiosInstance.get<(User & { password: string })[]>(
      '/users',
      { params: { email } },
    );
    const user = data.find((u) => u.email === email && u.password === password);
    if (user) {
      const { password: _password, ...rest } = user;
      void _password;
      return rest;
    }
  } catch {
    /* fallback to mock */
  }
  const found = mockUsers.find(
    (u) => u.email === email && u.password === password,
  );
  if (!found) return null;
  const { password: _password, ...rest } = found;
  void _password;
  return rest;
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  const user: User & { password: string } = {
    id: `user-${Date.now()}`,
    email,
    password,
    name,
    role: 'user',
    enrolledCourseIds: [],
    completedLessonIds: [],
  };
  mockUsers.push(user);
  const { password: _password, ...rest } = user;
  void _password;
  return rest;
}
