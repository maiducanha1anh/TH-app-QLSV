import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StudentListScreen from '../screens/StudentListScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import EditStudentScreen from '../screens/EditStudentScreen';

export type RootStackParamList = {
  StudentList: undefined;
  StudentDetail: {id: string};
  AddStudent: undefined;
  EditStudent: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StudentList"
        screenOptions={{
          headerStyle: {backgroundColor: '#1565C0'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: '700', fontSize: 18},
          contentStyle: {backgroundColor: '#F5F7FA'},
        }}>
        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
          options={{title: 'Danh sách sinh viên'}}
        />
        <Stack.Screen
          name="StudentDetail"
          component={StudentDetailScreen}
          options={{title: 'Chi tiết sinh viên'}}
        />
        <Stack.Screen
          name="AddStudent"
          component={AddStudentScreen}
          options={{title: 'Thêm sinh viên'}}
        />
        <Stack.Screen
          name="EditStudent"
          component={EditStudentScreen}
          options={{title: 'Chỉnh sửa sinh viên'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
