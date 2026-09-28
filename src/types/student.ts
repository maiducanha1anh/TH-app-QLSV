/**
 * Kiểu dữ liệu sinh viên
 */

export interface Student {
  /** ID nội bộ, ổn định, không hiển thị cho người dùng */
  id: string;
  /** Mã sinh viên (trường nghiệp vụ, có thể chỉnh sửa) */
  maSV: string;
  hoTen: string;
  ngaySinh: string; // DD/MM/YYYY
  gioiTinh: string;
  email: string;
  soDienThoai: string;
  lop: string;
  khoa: string;
  gpa: number;
}
