import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from '@/entities/course/api/courseRtkApi';
import type { CourseLevel } from '@/entities/course/model/types';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/shared/lib/categories';
import { Button, Input, Loader, ErrorMessage, StringListInput, useToast } from '@/shared/ui';
import styles from '@/features/create-course/ui/CreateCourseForm/CreateCourseForm.module.css';

interface EditCourseFormProps {
  courseId: string;
}

export function EditCourseForm({ courseId }: EditCourseFormProps) {
  const { data: course, isLoading, error } = useGetCourseQuery(courseId);
  const [updateCourse, { isLoading: isSaving }] = useUpdateCourseMutation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState<CourseLevel>('beginner');
  const [durationHours, setDurationHours] = useState('6');
  const [learningOutcomes, setLearningOutcomes] = useState(['']);
  const [requirements, setRequirements] = useState(['']);

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setPrice(String(course.price));
      setCategory(course.category);
      setLevel(course.level);
      setDurationHours(String(course.durationHours));
      setLearningOutcomes(
        course.learningOutcomes.length ? course.learningOutcomes : [''],
      );
      setRequirements(course.requirements.length ? course.requirements : ['']);
    }
  }, [course]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const outcomes = learningOutcomes.map((s) => s.trim()).filter(Boolean);
    if (outcomes.length === 0) {
      showToast('Добавьте хотя бы один пункт «Чему научится студент»', 'error');
      return;
    }
    try {
      await updateCourse({
        id: courseId,
        dto: {
          title,
          description,
          price: Number(price),
          category,
          level,
          durationHours: Number(durationHours),
          learningOutcomes: outcomes,
          requirements: requirements.map((s) => s.trim()).filter(Boolean),
        },
      }).unwrap();
      showToast('Курс обновлён', 'success');
      navigate(`/courses/${courseId}`);
    } catch {
      showToast('Не удалось сохранить курс', 'error');
    }
  };

  if (isLoading) return <Loader />;
  if (error || !course) return <ErrorMessage message="Курс не найден" />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Основное</h2>
        <Input label="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label className={styles.fieldLabel}>
          <span>Описание</span>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <Input label="Цена (₽)" type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} required />
        <label className={styles.fieldLabel}>
          <span>Категория</span>
          <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
            {COURSE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className={styles.fieldLabel}>
          <span>Уровень</span>
          <select className={styles.select} value={level} onChange={(e) => setLevel(e.target.value as CourseLevel)}>
            {COURSE_LEVELS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </label>
        <Input
          label="Длительность (часов)"
          type="number"
          min={1}
          value={durationHours}
          onChange={(e) => setDurationHours(e.target.value)}
          required
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Программа курса</h2>
        <StringListInput
          label="Чему вы научитесь"
          values={learningOutcomes}
          onChange={setLearningOutcomes}
          minItems={1}
        />
        <StringListInput
          label="Требования"
          values={requirements.length ? requirements : ['']}
          onChange={setRequirements}
        />
      </section>

      <Button type="submit" disabled={isSaving}>
        {isSaving ? 'Сохранение…' : 'Сохранить'}
      </Button>
    </form>
  );
}
