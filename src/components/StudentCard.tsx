import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Student} from '../types/student';
import {getClassification} from '../utils/classification';

interface StudentCardProps {
  student: Student;
  onPress: () => void;
}

export default function StudentCard({student, onPress}: StudentCardProps) {
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

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.hoTen.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {student.hoTen}
          </Text>
          <Text style={styles.maSV}>{student.maSV}</Text>
        </View>
        <View style={[styles.badge, {backgroundColor: getBadgeColor()}]}>
          <Text style={styles.badgeText}>{classification}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.detail}>Lớp: {student.lop}</Text>
        <Text style={styles.detail}>GPA: {student.gpa.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  maSV: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF1',
  },
  detail: {
    fontSize: 13,
    color: '#546E7A',
  },
});
