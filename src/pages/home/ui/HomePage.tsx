import { useMemo } from 'react';

import { Link } from 'react-router-dom';

import { Hero } from '@/widgets/hero';

import { CourseList } from '@/widgets/course-list';

import { HomeStats } from '@/widgets/home-stats';

import { CategoryPreview } from '@/widgets/category-preview';

import { ContinueLearning } from '@/widgets/continue-learning';

import { useGetCoursesQuery } from '@/entities/course/api/courseRtkApi';

import { Loader, ErrorMessage } from '@/shared/ui';



export function HomePage() {

  const { data: courses, isLoading, error } = useGetCoursesQuery();



  const popular = useMemo(

    () => [...(courses ?? [])].sort((a, b) => b.rating - a.rating).slice(0, 6),

    [courses],

  );



  return (

    <div className="container page">

      <Hero />

      <ContinueLearning />

      <HomeStats />

      <CategoryPreview />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>

        <h2 className="pageTitle" style={{ margin: 0 }}>Популярные курсы</h2>

        <Link to="/catalog">Весь каталог →</Link>

      </div>

      {isLoading && <Loader />}

      {Boolean(error) && <ErrorMessage message="Не удалось загрузить курсы" />}

      {courses && <CourseList courses={popular} />}

    </div>

  );

}

