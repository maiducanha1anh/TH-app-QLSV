import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useStudents} from '../context/StudentContext';
import StudentCard from '../components/StudentCard';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentList'>;

export default function StudentListScreen({navigation}: Props) {
  const {students} = useStudents();
  const [searchText, setSearchText] = useState('');

  const filteredStudents = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) {
      return students;
    }
    return students.filter(
      s =>
        s.maSV.toLowerCase().includes(query) ||
        s.hoTen.toLowerCase().includes(query),
    );
  }, [students, searchText]);

  const renderEmpty = () => {
    if (students.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>Chưa có sinh viên nào</Text>
          <Text style={styles.emptySubtitle}>
            Nhấn nút + để thêm sinh viên mới
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>Không tìm thấy kết quả</Text>
        <Text style={styles.emptySubtitle}>
          Thử tìm kiếm với từ khóa khác
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm theo mã SV hoặc họ tên..."
          placeholderTextColor="#9E9E9E"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchText('')}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Student count */}
      <Text style={styles.count}>
        {filteredStudents.length} sinh viên
        {searchText.trim() ? ` (tìm thấy)` : ''}
      </Text>

      {/* List */}
      <FlatList
        data={filteredStudents}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <StudentCard
            student={item}
            onPress={() =>
              navigation.navigate('StudentDetail', {id: item.id})
            }
          />
        )}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          filteredStudents.length === 0
            ? styles.emptyListContent
            : styles.listContent
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddStudent')}
        activeOpacity={0.8}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: '#212121',
  },
  clearButton: {
    padding: 6,
  },
  clearText: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  count: {
    fontSize: 13,
    color: '#757575',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#546E7A',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#90A4AE',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1565C0',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '400',
  },
});
