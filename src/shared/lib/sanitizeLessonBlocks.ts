import type { LessonBlock } from '@/entities/lesson/model/types';

export function sanitizeBlocksForSave(blocks: LessonBlock[]): LessonBlock[] {
  return blocks.map((block) => {
    if (block.type === 'checklist') {
      return {
        ...block,
        items: block.items.map((s) => s.trim()).filter(Boolean),
      };
    }
    if (block.type === 'quiz') {
      const indexed = block.options
        .map((option, i) => ({ option: option.trim(), i }))
        .filter(({ option }) => option.length > 0);
      if (indexed.length === 0) {
        return block;
      }
      const correctIdx = indexed.findIndex(({ i }) => i === block.correctIndex);
      return {
        ...block,
        options: indexed.map(({ option }) => option),
        correctIndex: correctIdx >= 0 ? correctIdx : 0,
      };
    }
    return block;
  });
}
