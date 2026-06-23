import { StoreProvider } from './providers/StoreProvider';
import { ToastProvider } from '@/shared/ui';
import { AppRouter } from './router/AppRouter';

export function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </StoreProvider>
  );
}
