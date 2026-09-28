import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useStudents} from '../context/StudentContext';
import StudentForm from '../components/StudentForm';
import {Student} from '../types/student';

type Props = NativeStackScreenProps<RootStackParamList, 'AddStudent'>;

export default function AddStudentScreen({navigation}: Props) {
  const {addStudent} = useStudents();

  const handleSave = (data: Omit<Student, 'id'>) => {
    addStudent(data);
    navigation.goBack();
  };

  return <StudentForm onSave={handleSave} submitLabel="Thêm sinh viên" />;
}
