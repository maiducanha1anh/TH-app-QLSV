import {Student} from '../types/student';

export interface ValidationErrors {
  maSV?: string;
  hoTen?: string;
  ngaySinh?: string;
  gioiTinh?: string;
  email?: string;
  soDienThoai?: string;
  lop?: string;
  khoa?: string;
  gpa?: string;
}

/**
 * Kiểm tra ngày có thật theo DD/MM/YYYY
 */
function isValidDate(dateStr: string): boolean {
  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) {
    return false;
  }
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  if (month < 1 || month > 12) {
    return false;
  }
  if (year < 1900 || year > 2100) {
    return false;
  }

  // Tạo Date object để kiểm tra ngày có thật
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * Kiểm tra email cơ bản
 */
function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Kiểm tra số điện thoại: chỉ chữ số, 9-11 ký tự
 */
function isValidPhone(phone: string): boolean {
  const re = /^\d{9,11}$/;
  return re.test(phone);
}

/**
 * Parse GPA: chấp nhận cả dấu phẩy và dấu chấm
 */
export function parseGPA(input: string): number | null {
  const normalized = input.trim().replace(',', '.');
  if (normalized === '') {
    return null;
  }
  const value = parseFloat(normalized);
  if (isNaN(value)) {
    return null;
  }
  return value;
}

/**
 * Validate toàn bộ form sinh viên
 * @param data Dữ liệu form (chưa trim)
 * @param allStudents Toàn bộ danh sách sinh viên hiện tại
 * @param editingId ID sinh viên đang sửa (null nếu thêm mới)
 */
export function validateStudent(
  data: {
    maSV: string;
    hoTen: string;
    ngaySinh: string;
    gioiTinh: string;
    email: string;
    soDienThoai: string;
    lop: string;
    khoa: string;
    gpaStr: string;
  },
  allStudents: Student[],
  editingId: string | null,
): {errors: ValidationErrors; isValid: boolean} {
  const errors: ValidationErrors = {};

  // Mã sinh viên
  const maSV = data.maSV.trim();
  if (!maSV) {
    errors.maSV = 'Mã sinh viên không được để trống';
  } else {
    const duplicate = allStudents.find(
      s => s.maSV.toLowerCase() === maSV.toLowerCase() && s.id !== editingId,
    );
    if (duplicate) {
      errors.maSV = 'Mã sinh viên đã tồn tại';
    }
  }

  // Họ tên
  if (!data.hoTen.trim()) {
    errors.hoTen = 'Họ tên không được để trống';
  }

  // Ngày sinh
  const ngaySinh = data.ngaySinh.trim();
  if (!ngaySinh) {
    errors.ngaySinh = 'Ngày sinh không được để trống';
  } else if (!isValidDate(ngaySinh)) {
    errors.ngaySinh = 'Ngày sinh không hợp lệ (DD/MM/YYYY)';
  }

  // Giới tính
  if (!data.gioiTinh.trim()) {
    errors.gioiTinh = 'Giới tính không được để trống';
  }

  // Email
  const email = data.email.trim();
  if (!email) {
    errors.email = 'Email không được để trống';
  } else if (!isValidEmail(email)) {
    errors.email = 'Email không đúng định dạng';
  }

  // Số điện thoại
  const soDienThoai = data.soDienThoai.trim();
  if (!soDienThoai) {
    errors.soDienThoai = 'Số điện thoại không được để trống';
  } else if (!isValidPhone(soDienThoai)) {
    errors.soDienThoai = 'Số điện thoại chỉ gồm chữ số (9-11 số)';
  }

  // Lớp
  if (!data.lop.trim()) {
    errors.lop = 'Lớp không được để trống';
  }

  // Khoa
  if (!data.khoa.trim()) {
    errors.khoa = 'Khoa không được để trống';
  }

  // GPA
  const gpaStr = data.gpaStr.trim();
  if (gpaStr === '') {
    errors.gpa = 'GPA không được để trống';
  } else {
    const gpaValue = parseGPA(gpaStr);
    if (gpaValue === null) {
      errors.gpa = 'GPA phải là số';
    } else if (gpaValue < 0 || gpaValue > 10) {
      errors.gpa = 'GPA phải từ 0 đến 10';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
