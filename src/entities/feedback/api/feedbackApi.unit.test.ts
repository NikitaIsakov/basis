import { describe, expect, it } from 'vitest';
import {
  fetchFeedbackByCourse,
  replyToFeedback,
  sendFeedback,
} from '@/entities/feedback/api/feedbackApi';
import { mockFeedback } from '@/shared/lib/mockData';

describe('feedbackApi mock', () => {
  it('returns feedback filtered by course and student', async () => {
    const items = await fetchFeedbackByCourse('1', 'user-1');
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((f) => f.courseId === '1' && f.studentId === 'user-1')).toBe(
      true,
    );
  });

  it('sends new feedback', async () => {
    const before = mockFeedback.length;
    const item = await sendFeedback({
      courseId: '2',
      courseTitle: 'Course 2',
      studentId: 'user-2',
      studentName: 'Anna',
      authorId: 'author-1',
      message: 'Test question unique',
    });
    expect(mockFeedback.length).toBe(before + 1);
    expect(item.message).toBe('Test question unique');
  });

  it('replies to feedback', async () => {
    const target = mockFeedback.find((f) => f.id === 'fb-2' && !f.reply);
    expect(target).toBeTruthy();
    const updated = await replyToFeedback(target!.id, 'Answer here');
    expect(updated.reply).toBe('Answer here');
    expect(updated.repliedAt).toBeTruthy();
  });
});
