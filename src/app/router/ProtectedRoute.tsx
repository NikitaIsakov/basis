import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import type { UserRole } from '@/shared/types/roles';

interface ProtectedRouteProps {
  roles?: Exclude<UserRole, 'guest'>[];
}

export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const user = useAppSelector((s) => s.session.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
