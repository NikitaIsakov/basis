import { FormEvent, useMemo, useState } from 'react';
import type { Lesson, LessonBlock } from '@/entities/lesson/model/types';
import { LessonContent } from '@/entities/lesson';
import { useUpdateLessonMutation } from '@/entities/lesson';
import { Button, Input, StringListInput } from '@/shared/ui';
import { sanitizeBlocksForSave } from '@/shared/lib/sanitizeLessonBlocks';
import styles from './LessonEditor.module.css';

type ContentMode = 'text' | 'blocks';

function emptyBlock(type: LessonBlock['type']): LessonBlock {
  switch (type) {
    case 'text':
      return { type: 'text', body: '' };
    case 'code':
      return { type: 'code', language: 'javascript', code: '' };
    case 'checklist':
      return { type: 'checklist', items: [''] };
    case 'quiz':
      return {
        type: 'quiz',
        question: '',
        options: ['', ''],
        correctIndex: 0,
      };
  }
}

interface BlockEditorProps {
  blocks: LessonBlock[];
  onChange: (blocks: LessonBlock[]) => void;
}

function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [newType, setNewType] = useState<LessonBlock['type']>('text');

  const updateBlock = (index: number, block: LessonBlock) => {
    onChange(blocks.map((b, i) => (i === index ? block : b)));
  };

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addBlock = () => {
    onChange([...blocks, emptyBlock(newType)]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {blocks.map((block, index) => (
        <div key={index} className={styles.blockCard}>
          <div className={styles.blockHeader}>
            <span className={styles.blockType}>{block.type}</span>
            <div className={styles.blockActions}>
              <button type="button" className={styles.select} disabled={index === 0} onClick={() => moveBlock(index, -1)}>↑</button>
              <button type="button" className={styles.select} disabled={index === blocks.length - 1} onClick={() => moveBlock(index, 1)}>↓</button>
              <button type="button" className={styles.select} onClick={() => removeBlock(index)}>✕</button>
            </div>
          </div>

          {block.type === 'text' && (
            <textarea
              className={styles.textarea}
              value={block.body}
              onChange={(e) => updateBlock(index, { ...block, body: e.target.value })}
              placeholder="Текст урока"
            />
          )}

          {block.type === 'code' && (
            <>
              <select
                className={styles.select}
                value={block.language}
                onChange={(e) => updateBlock(index, { ...block, language: e.target.value })}
              >
                {['javascript', 'typescript', 'jsx', 'css', 'html'].map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <textarea
                className={`${styles.textarea} ${styles.codeArea}`}
                value={block.code}
                onChange={(e) => updateBlock(index, { ...block, code: e.target.value })}
                placeholder="Код"
              />
            </>
          )}

          {block.type === 'checklist' && (
            <StringListInput
              label="Пункты чеклиста"
              values={block.items.length ? block.items : ['']}
              onChange={(items) => updateBlock(index, { ...block, items })}
              minItems={1}
            />
          )}

          {block.type === 'quiz' && (
            <>
              <label className={styles.fieldLabel}>
                <span>Вопрос</span>
                <textarea
                  className={styles.textarea}
                  value={block.question}
                  onChange={(e) => updateBlock(index, { ...block, question: e.target.value })}
                />
              </label>
              <StringListInput
                label="Варианты ответа"
                values={block.options.length ? block.options : ['', '']}
                onChange={(options) =>
                  updateBlock(index, {
                    ...block,
                    options,
                    correctIndex: Math.min(block.correctIndex, Math.max(0, options.length - 1)),
                  })
                }
                minItems={2}
              />
              <label className={styles.fieldLabel}>
                <span>Правильный ответ</span>
                <select
                  className={styles.select}
                  value={block.correctIndex}
                  onChange={(e) =>
                    updateBlock(index, { ...block, correctIndex: Number(e.target.value) })
                  }
                >
                  {block.options.map((opt, i) => (
                    <option key={i} value={i}>
                      {opt || `Вариант ${i + 1}`}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>
      ))}

      <div className={styles.addBlockRow}>
        <select className={styles.select} value={newType} onChange={(e) => setNewType(e.target.value as LessonBlock['type'])}>
          <option value="text">Текст</option>
          <option value="code">Код</option>
          <option value="checklist">Чеклист</option>
          <option value="quiz">Викторина</option>
        </select>
        <Button type="button" variant="secondary" onClick={addBlock}>
          + Добавить блок
        </Button>
      </div>
    </div>
  );
}

interface LessonEditorProps {
  courseId: string;
  lesson: Lesson;
  onSaved?: () => void;
}

export function LessonEditor({ courseId, lesson, onSaved }: LessonEditorProps) {
  const [updateLesson, { isLoading }] = useUpdateLessonMutation();
  const [title, setTitle] = useState(lesson.title);
  const [durationMinutes, setDurationMinutes] = useState(String(lesson.durationMinutes ?? 10));
  const [mode, setMode] = useState<ContentMode>(
    lesson.blocks?.length ? 'blocks' : 'text',
  );
  const [content, setContent] = useState(lesson.content);
  const [blocks, setBlocks] = useState<LessonBlock[]>(lesson.blocks ?? []);

  const previewLesson: Lesson = useMemo(
    () => ({
      ...lesson,
      title,
      durationMinutes: Number(durationMinutes),
      content: mode === 'text' ? content : '',
      blocks: mode === 'blocks' ? blocks : undefined,
    }),
    [lesson, title, durationMinutes, mode, content, blocks],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateLesson({
      id: lesson.id,
      courseId,
      dto: {
        title,
        durationMinutes: Number(durationMinutes),
        content: mode === 'text' ? content : '',
        blocks: mode === 'blocks' ? sanitizeBlocksForSave(blocks) : undefined,
      },
    }).unwrap();
    onSaved?.();
  };

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      <h3 style={{ margin: 0 }}>Редактор урока</h3>
      <Input label="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input
        label="Длительность (мин)"
        type="number"
        min={1}
        value={durationMinutes}
        onChange={(e) => setDurationMinutes(e.target.value)}
        required
      />

      <div className={styles.modeToggle}>
        <label>
          <input
            type="radio"
            name={`mode-${lesson.id}`}
            checked={mode === 'text'}
            onChange={() => setMode('text')}
          />{' '}
          Простой текст
        </label>
        <label>
          <input
            type="radio"
            name={`mode-${lesson.id}`}
            checked={mode === 'blocks'}
            onChange={() => setMode('blocks')}
          />{' '}
          Блоки контента
        </label>
      </div>

      {mode === 'text' ? (
        <label className={styles.fieldLabel}>
          <span>Содержание</span>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
      ) : (
        <BlockEditor blocks={blocks} onChange={setBlocks} />
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Сохранение…' : 'Сохранить урок'}
      </Button>

      <div className={styles.preview}>
        <p className={styles.previewTitle}>Предпросмотр</p>
        <LessonContent lesson={previewLesson} />
      </div>
    </form>
  );
}
