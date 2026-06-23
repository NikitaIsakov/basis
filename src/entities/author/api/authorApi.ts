import { axiosInstance } from '@/shared/api';
import { mockAuthors } from '@/shared/lib/mockData';
import type { AuthorProfile } from '../model/types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function fetchAuthorById(
  id: string,
): Promise<AuthorProfile | undefined> {
  if (USE_MOCK) return mockAuthors.find((a) => a.id === id);
  const { data } = await axiosInstance.get<AuthorProfile>(`/authors/${id}`);
  return data;
}
