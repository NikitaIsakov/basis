import { useState } from 'react';
import type { Lesson, LessonBlock } from '../../model/types';
import { getLessonBlocks } from '@/shared/lib/courseProgress';
import { Button } from '@/shared/ui';
import styles from './LessonContent.module.css';

interface LessonContentProps {
  lesson: Lesson;
  onQuizPassed?: (passed: boolean) => void;
}

function TextBlock({ body }: Extract<LessonBlock, { type: 'text' }>) {
  return <p className={styles.text}>{body}</p>;
}

function CodeBlock({ language, code }: Extract<LessonBlock, { type: 'code' }>) {
  return (
    <pre className={styles.codeBlock}>
      <span className={styles.codeLang}>{language}</span>
      <code>{code}</code>
    </pre>
  );
}

function ChecklistBlock({ items }: Extract<LessonBlock, { type: 'checklist' }>) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  return (
    <div className={styles.checklist}>
      <p className={styles.checklistTitle}>Чеклист</p>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((item, i) => (
          <li key={item} className={styles.checklistItem}>
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() =>
                setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
              }
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuizBlock({
  block,
  radioName,
  onPassed,
}: {
  block: Extract<LessonBlock, { type: 'quiz' }>;
  radioName: string;
  onPassed: (passed: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);

  const check = () => {
    if (selected === null) return;
    if (selected === block.correctIndex) {
      setFeedback('success');
      onPassed(true);
    } else {
      setFeedback('error');
      onPassed(false);
    }
  };

  return (
    <div className={styles.quiz}>
      <p className={styles.quizQuestion}>{block.question}</p>
      {block.options.map((option, i) =>
        option.trim() ? (
          <label key={i} className={styles.quizOption}>
            <input
              type="radio"
              name={radioName}
              checked={selected === i}
              onChange={() => {
                setSelected(i);
                setFeedback(null);
                onPassed(false);
              }}
            />
            {option}
          </label>
        ) : null,
      )}
      {feedback === 'success' && (
        <p className={`${styles.quizFeedback} ${styles.quizSuccess}`}>
          Верно! Можно завершить урок.
        </p>
      )}
      {feedback === 'error' && (
        <p className={`${styles.quizFeedback} ${styles.quizError}`}>
          Неверный ответ. Попробуйте ещё раз.
        </p>
      )}
      {feedback !== 'success' && (
        <Button type="button" onClick={check} style={{ marginTop: '0.75rem' }}>
          Проверить
        </Button>
      )}
    </div>
  );
}

export function LessonContent({ lesson, onQuizPassed }: LessonContentProps) {
  const blocks = getLessonBlocks(lesson);
  const hasQuiz = blocks.some((b) => b.type === 'quiz');

  const handleQuizPassed = (passed: boolean) => {
    onQuizPassed?.(passed);
  };

  return (
    <div className={styles.lessonContent}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return <TextBlock key={index} {...block} />;
          case 'code':
            return <CodeBlock key={index} {...block} />;
          case 'checklist':
            return <ChecklistBlock key={index} {...block} />;
          case 'quiz':
            return (
              <QuizBlock
                key={index}
                block={block}
                radioName={`quiz-${lesson.id}-${index}`}
                onPassed={handleQuizPassed}
              />
            );
          default:
            return null;
        }
      })}
      {hasQuiz && onQuizPassed && (
        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', margin: 0 }}>
          Пройдите викторину, чтобы завершить урок.
        </p>
      )}
    </div>
  );
}
