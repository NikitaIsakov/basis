import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import { useCreateCourseMutation } from '@/entities/course/api/courseRtkApi';
import type { CourseLevel } from '@/entities/course/model/types';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/shared/lib/categories';
import { Button, Input, StringListInput, useToast } from '@/shared/ui';
import styles from './CreateCourseForm.module.css';

export function CreateCourseForm() {
  const user = useAppSelector((s) => s.session.user);
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [category, setCategory] = useState<string>(COURSE_CATEGORIES[0]);
  const [level, setLevel] = useState<CourseLevel>('beginner');
  const [durationHours, setDurationHours] = useState('6');
  const [learningOutcomes, setLearningOutcomes] = useState(['']);
  const [requirements, setRequirements] = useState(['']);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const outcomes = learningOutcomes.map((s) => s.trim()).filter(Boolean);
    if (outcomes.length === 0) {
      showToast('Добавьте хотя бы один пункт «Чему научится студент»', 'error');
      return;
    }
    try {
      const course = await createCourse({
        title,
        description,
        price: Number(price),
        category,
        authorId: user.id,
        level,
        durationHours: Number(durationHours),
        learningOutcomes: outcomes,
        requirements: requirements.map((s) => s.trim()).filter(Boolean),
      }).unwrap();
      showToast('Курс создан', 'success');
      navigate(`/author/courses/${course.id}/edit?tab=lessons`);
    } catch {
      showToast('Ошибка создания курса', 'error');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Создание курса</h1>

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

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Создание…' : 'Создать и добавить уроки'}
      </Button>
    </form>
  );
}
