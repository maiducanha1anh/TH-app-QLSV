import {Student} from '../types/student';

let nextId = 100;
export function generateId(): string {
  return String(nextId++);
}

export const sampleStudents: Student[] = [
  {
    id: '1',
    maSV: 'SV001',
    hoTen: 'Nguyễn Văn An',
    ngaySinh: '15/03/2003',
    gioiTinh: 'Nam',
    email: 'an.nv@university.edu.vn',
    soDienThoai: '0912345678',
    lop: 'CNTT01',
    khoa: 'Công nghệ thông tin',
    gpa: 8.7,
  },
  {
    id: '2',
    maSV: 'SV002',
    hoTen: 'Trần Thị Bình',
    ngaySinh: '22/07/2002',
    gioiTinh: 'Nữ',
    email: 'binh.tt@university.edu.vn',
    soDienThoai: '0923456789',
    lop: 'CNTT02',
    khoa: 'Công nghệ thông tin',
    gpa: 7.5,
  },
  {
    id: '3',
    maSV: 'SV003',
    hoTen: 'Lê Hoàng Cường',
    ngaySinh: '10/11/2003',
    gioiTinh: 'Nam',
    email: 'cuong.lh@university.edu.vn',
    soDienThoai: '0934567890',
    lop: 'KTPM01',
    khoa: 'Kỹ thuật phần mềm',
    gpa: 5.2,
  },
  {
    id: '4',
    maSV: 'SV004',
    hoTen: 'Phạm Minh Dương',
    ngaySinh: '05/01/2004',
    gioiTinh: 'Nam',
    email: 'duong.pm@university.edu.vn',
    soDienThoai: '0945678901',
    lop: 'HTTT01',
    khoa: 'Hệ thống thông tin',
    gpa: 3.8,
  },
  {
    id: '5',
    maSV: 'SV005',
    hoTen: 'Võ Thị Mai',
    ngaySinh: '28/09/2002',
    gioiTinh: 'Nữ',
    email: 'mai.vt@university.edu.vn',
    soDienThoai: '0956789012',
    lop: 'CNTT01',
    khoa: 'Công nghệ thông tin',
    gpa: 9.1,
  },
];
