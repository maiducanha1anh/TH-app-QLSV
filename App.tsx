/**
 * Ứng dụng Quản lý Sinh viên
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StudentProvider} from './src/context/StudentContext';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StudentProvider>
        <AppNavigator />
      </StudentProvider>
    </SafeAreaProvider>
  );
}

export default App;
