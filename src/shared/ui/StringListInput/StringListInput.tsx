import { Button } from '../Button/Button';
import styles from './StringListInput.module.css';

interface StringListInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  minItems?: number;
}

export function StringListInput({
  label,
  values,
  onChange,
  placeholder = 'Введите пункт',
  minItems = 0,
}: StringListInputProps) {
  const update = (index: number, value: string) => {
    onChange(values.map((v, i) => (i === index ? value : v)));
  };

  const remove = (index: number) => {
    if (values.length <= minItems) return;
    onChange(values.filter((_, i) => i !== index));
  };

  const add = () => onChange([...values, '']);

  return (
    <div className={styles.list}>
      <span className={styles.label}>{label}</span>
      {values.map((value, index) => (
        <div key={index} className={styles.row}>
          <input
            className={styles.input}
            value={value}
            placeholder={placeholder}
            onChange={(e) => update(index, e.target.value)}
          />
          {values.length > minItems && (
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => remove(index)}
              aria-label="Удалить пункт"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <Button type="button" variant="secondary" className={styles.addBtn} onClick={add}>
        + Добавить пункт
      </Button>
    </div>
  );
}
