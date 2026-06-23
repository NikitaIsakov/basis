import { axiosInstance } from '@/shared/api';
import { mockCourses } from '@/shared/lib/mockDb';
import {
  DEFAULT_COURSE_META,
  type Course,
  type CreateCourseDto,
  type UpdateCourseDto,
} from '../model/types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function fetchCourses(includeHidden = false): Promise<Course[]> {
  if (USE_MOCK) {
    return includeHidden
      ? [...mockCourses]
      : mockCourses.filter((c) => !c.hidden);
  }
  const { data } = await axiosInstance.get<Course[]>('/courses');
  return includeHidden ? data : data.filter((c) => !c.hidden);
}

export async function fetchCourseById(id: string): Promise<Course | undefined> {
  if (USE_MOCK) return mockCourses.find((c) => c.id === id);
  const { data } = await axiosInstance.get<Course>(`/courses/${id}`);
  return data;
}

export async function fetchCoursesByAuthor(
  authorId: string,
  includeHidden = true,
): Promise<Course[]> {
  if (USE_MOCK) {
    const courses = mockCourses.filter((c) => c.authorId === authorId);
    const visible = includeHidden ? courses : courses.filter((c) => !c.hidden);
    return [...visible].sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  }
  const { data } = await axiosInstance.get<Course[]>(
    `/courses?authorId=${authorId}`,
  );
  const filtered = includeHidden ? data : data.filter((c) => !c.hidden);
  return filtered.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
}

export async function createCourse(dto: CreateCourseDto): Promise<Course> {
  if (USE_MOCK) {
    const course: Course = {
      id: String(Date.now()),
      rating: 5,
      hidden: false,
      ...DEFAULT_COURSE_META,
      level: dto.level ?? DEFAULT_COURSE_META.level,
      durationHours: dto.durationHours ?? DEFAULT_COURSE_META.durationHours,
      learningOutcomes:
        dto.learningOutcomes ?? DEFAULT_COURSE_META.learningOutcomes,
      requirements: dto.requirements ?? DEFAULT_COURSE_META.requirements,
      ...dto,
    };
    mockCourses.push(course);
    return course;
  }
  const { data } = await axiosInstance.post<Course>('/courses', dto);
  return data;
}

export async function updateCourse(
  id: string,
  dto: UpdateCourseDto,
): Promise<Course> {
  if (USE_MOCK) {
    const index = mockCourses.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Курс не найден');
    mockCourses[index] = { ...mockCourses[index], ...dto };
    return mockCourses[index];
  }
  const { data } = await axiosInstance.patch<Course>(`/courses/${id}`, dto);
  return data;
}

export async function setCourseHidden(id: string, hidden: boolean): Promise<Course> {
  return updateCourse(id, { hidden });
}

export { fetchLessonsByCourse, fetchLessonById } from '@/entities/lesson/api/lessonApi';
