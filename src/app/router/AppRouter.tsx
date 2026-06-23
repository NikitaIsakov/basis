import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { Loader } from '@/shared/ui';
import { ProtectedRoute } from './ProtectedRoute';

const HomePage = lazy(() =>
  import('@/pages/home').then((m) => ({ default: m.HomePage })),
);
const CatalogPage = lazy(() =>
  import('@/pages/catalog').then((m) => ({ default: m.CatalogPage })),
);
const CoursePage = lazy(() =>
  import('@/pages/course').then((m) => ({ default: m.CoursePage })),
);
const LessonPage = lazy(() =>
  import('@/pages/lesson').then((m) => ({ default: m.LessonPage })),
);
const LoginPage = lazy(() =>
  import('@/pages/login').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@/pages/register').then((m) => ({ default: m.RegisterPage })),
);
const ProfilePage = lazy(() =>
  import('@/pages/profile').then((m) => ({ default: m.ProfilePage })),
);
const CreateCoursePage = lazy(() =>
  import('@/pages/create-course').then((m) => ({ default: m.CreateCoursePage })),
);
const EditCoursePage = lazy(() =>
  import('@/pages/edit-course').then((m) => ({ default: m.EditCoursePage })),
);
const AuthorCoursesPage = lazy(() =>
  import('@/pages/author-courses').then((m) => ({ default: m.AuthorCoursesPage })),
);
const AdminPage = lazy(() =>
  import('@/pages/admin').then((m) => ({ default: m.AdminPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })),
);
const ForbiddenPage = lazy(() =>
  import('@/pages/forbidden').then((m) => ({ default: m.ForbiddenPage })),
);

function PageFallback() {
  return (
    <div className="container page">
      <Loader />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="courses/:id" element={<CoursePage />} />
            <Route
              path="courses/:courseId/lessons/:lessonId"
              element={<LessonPage />}
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="403" element={<ForbiddenPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route element={<ProtectedRoute roles={['author']} />}>
              <Route path="author/courses" element={<AuthorCoursesPage />} />
              <Route path="author/courses/new" element={<CreateCoursePage />} />
              <Route
                path="author/courses/:id/edit"
                element={<EditCoursePage />}
              />
            </Route>
            <Route element={<ProtectedRoute roles={['admin']} />}>
              <Route path="admin" element={<AdminPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
