interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p role="alert" style={{ color: '#dc2626', padding: '1rem 0' }}>
      {message}
    </p>
  );
}
