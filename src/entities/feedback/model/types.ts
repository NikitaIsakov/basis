export interface CourseFeedback {
  id: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  authorId: string;
  message: string;
  createdAt: string;
  reply?: string;
  repliedAt?: string;
}

export interface SendFeedbackDto {
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  authorId: string;
  message: string;
}
