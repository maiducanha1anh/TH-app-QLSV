/**
 * Tính xếp loại từ GPA
 */
export function getClassification(gpa: number): string {
  if (gpa >= 8.5) {
    return 'Giỏi';
  }
  if (gpa >= 7.0) {
    return 'Khá';
  }
  if (gpa >= 5.0) {
    return 'Trung bình';
  }
  return 'Yếu';
}
