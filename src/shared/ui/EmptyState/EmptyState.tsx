interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return <p style={{ color: '#64748b', padding: '1.5rem 0' }}>{message}</p>;
}
