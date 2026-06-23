import { describe, expect, it } from 'vitest';
import type { LessonBlock } from '@/entities/lesson/model/types';
import { sanitizeBlocksForSave } from './sanitizeLessonBlocks';

describe('sanitizeBlocksForSave', () => {
  it('removes empty checklist items', () => {
    const blocks: LessonBlock[] = [
      { type: 'checklist', items: ['One', '', '  ', 'Two'] },
    ];
    expect(sanitizeBlocksForSave(blocks)).toEqual([
      { type: 'checklist', items: ['One', 'Two'] },
    ]);
  });

  it('removes empty quiz options and recalculates correctIndex', () => {
    const blocks: LessonBlock[] = [
      {
        type: 'quiz',
        question: 'Q',
        options: ['', 'Correct', ''],
        correctIndex: 1,
      },
    ];
    expect(sanitizeBlocksForSave(blocks)).toEqual([
      {
        type: 'quiz',
        question: 'Q',
        options: ['Correct'],
        correctIndex: 0,
      },
    ]);
  });
});
