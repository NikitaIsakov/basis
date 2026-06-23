import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CourseSearch } from '@/features/search-courses';
import { CourseList } from '@/widgets/course-list';
import { useGetCoursesQuery } from '@/entities/course/api/courseRtkApi';
import { Loader, ErrorMessage } from '@/shared/ui';
import styles from './CatalogPage.module.css';

const PAGE_SIZE = 6;

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') ?? '';

  const { data: courses = [], isLoading, error } = useGetCoursesQuery();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(categoryFromUrl);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setCategory(categoryFromUrl);
    setVisibleCount(PAGE_SIZE);
  }, [categoryFromUrl]);

  const categories = useMemo(
    () => [...new Set(courses.map((c) => c.category))],
    [courses],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      const matchCategory = !category || c.category === category;
      return matchQuery && matchCategory;
    });
  }, [courses, query, category]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="container page">
      <h1 className="pageTitle">Каталог курсов</h1>
      <CourseSearch
        query={query}
        category={category}
        categories={categories}
        onQueryChange={(v) => {
          setQuery(v);
          setVisibleCount(PAGE_SIZE);
        }}
        onCategoryChange={(v) => {
          setCategory(v);
          setVisibleCount(PAGE_SIZE);
        }}
      />
      <div style={{ marginTop: '1.5rem' }}>
        {isLoading && <Loader />}
        {Boolean(error) && <ErrorMessage message="Ошибка загрузки каталога" />}
        {!isLoading && !error && (
          <>
            <CourseList courses={visible} />
            {visibleCount < filtered.length && (
              <button
                type="button"
                className={styles.loadMore}
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              >
                Показать ещё
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
