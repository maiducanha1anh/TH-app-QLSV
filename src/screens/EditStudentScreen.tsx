import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useStudents} from '../context/StudentContext';
import StudentForm from '../components/StudentForm';
import {Student} from '../types/student';

type Props = NativeStackScreenProps<RootStackParamList, 'EditStudent'>;

export default function EditStudentScreen({route, navigation}: Props) {
  const {id} = route.params;
  const {getStudentById, updateStudent} = useStudents();
  const student = getStudentById(id);

  if (!student) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Không tìm thấy sinh viên</Text>
      </View>
    );
  }

  const handleSave = (data: Omit<Student, 'id'>) => {
    updateStudent(id, data);
    navigation.goBack();
  };

  return (
    <StudentForm
      initialData={student}
      onSave={handleSave}
      submitLabel="Lưu thay đổi"
    />
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#757575',
  },
});
