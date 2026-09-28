import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FormField from './FormField';
import {Student} from '../types/student';
import {ValidationErrors, validateStudent, parseGPA} from '../utils/validation';
import {useStudents} from '../context/StudentContext';

interface StudentFormProps {
  /** Sinh viên hiện tại (nếu đang sửa) */
  initialData?: Student;
  /** Callback khi lưu thành công */
  onSave: (data: Omit<Student, 'id'>) => void;
  /** Nhãn nút submit */
  submitLabel: string;
}

const GENDER_OPTIONS = ['Nam', 'Nữ', 'Khác'];

export default function StudentForm({
  initialData,
  onSave,
  submitLabel,
}: StudentFormProps) {
  const {students} = useStudents();

  const [maSV, setMaSV] = useState(initialData?.maSV ?? '');
  const [hoTen, setHoTen] = useState(initialData?.hoTen ?? '');
  const [ngaySinh, setNgaySinh] = useState(initialData?.ngaySinh ?? '');
  const [gioiTinh, setGioiTinh] = useState(initialData?.gioiTinh ?? '');
  const [email, setEmail] = useState(initialData?.email ?? '');
  const [soDienThoai, setSoDienThoai] = useState(
    initialData?.soDienThoai ?? '',
  );
  const [lop, setLop] = useState(initialData?.lop ?? '');
  const [khoa, setKhoa] = useState(initialData?.khoa ?? '');
  const [gpaStr, setGpaStr] = useState(
    initialData != null ? String(initialData.gpa) : '',
  );
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = () => {
    const result = validateStudent(
      {maSV, hoTen, ngaySinh, gioiTinh, email, soDienThoai, lop, khoa, gpaStr},
      students,
      initialData?.id ?? null,
    );

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    const gpaValue = parseGPA(gpaStr)!;

    onSave({
      maSV: maSV.trim(),
      hoTen: hoTen.trim(),
      ngaySinh: ngaySinh.trim(),
      gioiTinh: gioiTinh.trim(),
      email: email.trim(),
      soDienThoai: soDienThoai.trim(),
      lop: lop.trim(),
      khoa: khoa.trim(),
      gpa: gpaValue,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <FormField
        label="Mã sinh viên *"
        value={maSV}
        onChangeText={v => {
          setMaSV(v);
          if (errors.maSV) {
            setErrors(prev => ({...prev, maSV: undefined}));
          }
        }}
        error={errors.maSV}
        placeholder="VD: SV001"
      />
      <FormField
        label="Họ tên *"
        value={hoTen}
        onChangeText={v => {
          setHoTen(v);
          if (errors.hoTen) {
            setErrors(prev => ({...prev, hoTen: undefined}));
          }
        }}
        error={errors.hoTen}
        placeholder="Nguyễn Văn A"
      />
      <FormField
        label="Ngày sinh * (DD/MM/YYYY)"
        value={ngaySinh}
        onChangeText={v => {
          setNgaySinh(v);
          if (errors.ngaySinh) {
            setErrors(prev => ({...prev, ngaySinh: undefined}));
          }
        }}
        error={errors.ngaySinh}
        placeholder="01/01/2003"
      />

      {/* Giới tính */}
      <View style={styles.genderContainer}>
        <Text style={styles.label}>Giới tính *</Text>
        <View style={styles.genderRow}>
          {GENDER_OPTIONS.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.genderOption,
                gioiTinh === option && styles.genderSelected,
              ]}
              onPress={() => {
                setGioiTinh(option);
                if (errors.gioiTinh) {
                  setErrors(prev => ({...prev, gioiTinh: undefined}));
                }
              }}>
              <Text
                style={[
                  styles.genderText,
                  gioiTinh === option && styles.genderTextSelected,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.gioiTinh ? (
          <Text style={styles.errorText}>{errors.gioiTinh}</Text>
        ) : null}
      </View>

      <FormField
        label="Email *"
        value={email}
        onChangeText={v => {
          setEmail(v);
          if (errors.email) {
            setErrors(prev => ({...prev, email: undefined}));
          }
        }}
        error={errors.email}
        placeholder="example@email.com"
        keyboardType="email-address"
      />
      <FormField
        label="Số điện thoại *"
        value={soDienThoai}
        onChangeText={v => {
          setSoDienThoai(v);
          if (errors.soDienThoai) {
            setErrors(prev => ({...prev, soDienThoai: undefined}));
          }
        }}
        error={errors.soDienThoai}
        placeholder="0912345678"
        keyboardType="phone-pad"
      />
      <FormField
        label="Lớp *"
        value={lop}
        onChangeText={v => {
          setLop(v);
          if (errors.lop) {
            setErrors(prev => ({...prev, lop: undefined}));
          }
        }}
        error={errors.lop}
        placeholder="CNTT01"
      />
      <FormField
        label="Khoa *"
        value={khoa}
        onChangeText={v => {
          setKhoa(v);
          if (errors.khoa) {
            setErrors(prev => ({...prev, khoa: undefined}));
          }
        }}
        error={errors.khoa}
        placeholder="Công nghệ thông tin"
      />
      <FormField
        label="GPA * (0-10)"
        value={gpaStr}
        onChangeText={v => {
          setGpaStr(v);
          if (errors.gpa) {
            setErrors(prev => ({...prev, gpa: undefined}));
          }
        }}
        error={errors.gpa}
        placeholder="8.5"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{submitLabel}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 6,
  },
  genderContainer: {
    marginBottom: 14,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  genderSelected: {
    borderColor: '#1565C0',
    backgroundColor: '#E3F2FD',
  },
  genderText: {
    fontSize: 14,
    color: '#546E7A',
  },
  genderTextSelected: {
    color: '#1565C0',
    fontWeight: '600',
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
