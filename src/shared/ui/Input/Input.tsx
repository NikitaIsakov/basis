import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className = '', ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className={styles.label} htmlFor={inputId}>
      <span>{label}</span>
      <input id={inputId} className={`${styles.input} ${className}`} {...props} />
    </label>
  );
}
