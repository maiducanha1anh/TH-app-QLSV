import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useStudents} from '../context/StudentContext';
import {getClassification} from '../utils/classification';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentDetail'>;

function InfoRow({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function StudentDetailScreen({route, navigation}: Props) {
  const {id} = route.params;
  const {getStudentById, deleteStudent} = useStudents();
  const student = getStudentById(id);

  if (!student) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Không tìm thấy sinh viên</Text>
      </View>
    );
  }

  const classification = getClassification(student.gpa);

  const getBadgeColor = () => {
    switch (classification) {
      case 'Giỏi':
        return '#2E7D32';
      case 'Khá':
        return '#1565C0';
      case 'Trung bình':
        return '#F57F17';
      case 'Yếu':
        return '#C62828';
      default:
        return '#757575';
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa sinh viên "${student.hoTen}" (${student.maSV})?`,
      [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            deleteStudent(id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>
            {student.hoTen.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{student.hoTen}</Text>
        <Text style={styles.maSV}>{student.maSV}</Text>
        <View style={[styles.badge, {backgroundColor: getBadgeColor()}]}>
          <Text style={styles.badgeText}>{classification}</Text>
        </View>
      </View>

      {/* Info card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <InfoRow label="Ngày sinh" value={student.ngaySinh} />
        <InfoRow label="Giới tính" value={student.gioiTinh} />
        <InfoRow label="Email" value={student.email} />
        <InfoRow label="Số điện thoại" value={student.soDienThoai} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Thông tin học tập</Text>
        <InfoRow label="Lớp" value={student.lop} />
        <InfoRow label="Khoa" value={student.khoa} />
        <InfoRow label="GPA" value={student.gpa.toFixed(1)} />
        <InfoRow label="Xếp loại" value={classification} />
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditStudent', {id})}
          activeOpacity={0.7}>
          <Text style={styles.editButtonText}>✏️  Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}>
          <Text style={styles.deleteButtonText}>🗑️  Xóa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    paddingBottom: 40,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#757575',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: '#1565C0',
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  maSV: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 14,
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    flexShrink: 1,
    textAlign: 'right',
    maxWidth: '60%',
  },
  actions: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#1565C0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E53935',
  },
  deleteButtonText: {
    color: '#E53935',
    fontSize: 15,
    fontWeight: '600',
  },
});
