import * as React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, useMenu } from '../context/contact';

type RootStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
  FilterMenu: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { menuItems, removeMenuItem } = useMenu();

  const calculateAverage = (course: 'Starter' | 'Main' | 'Dessert') => {
    const items = menuItems.filter((item) => item.course === course);
    if (items.length === 0) return 0;
    const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    return (total / items.length).toFixed(2);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItemContainer}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>R{item.price}</Text>
      <Text style={styles.course}>Course: {item.course}</Text>
      <Button title="Remove" color="red" onPress={() => removeMenuItem(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Total Menu Items: {menuItems.length}</Text>
        <Button title="Add New Item" onPress={() => navigation.navigate('AddMenuItem')} />
      </View>

      <View style={styles.averageContainer}>
        <Text style={styles.averageTitle}>Average Prices by Course:</Text>
        <Text>Starters: R{calculateAverage('Starter')}</Text>
        <Text>Mains: R{calculateAverage('Main')}</Text>
        <Text>Desserts: R{calculateAverage('Dessert')}</Text>
      </View>

      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <Button
        title="Filter by Course"
        onPress={() => navigation.navigate('FilterMenu')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerText: { fontSize: 18, fontWeight: 'bold' },
  averageContainer: { marginBottom: 16, padding: 8, backgroundColor: '#f5f5f5', borderRadius: 8 },
  averageTitle: { fontWeight: 'bold', marginBottom: 4 },
  list: { flex: 1 },
  listContent: { paddingBottom: 16 },
  menuItemContainer: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  dishName: { fontSize: 16, fontWeight: 'bold' },
  description: { color: '#666', marginTop: 4 },
  price: { fontSize: 14, fontWeight: 'bold', color: 'green', marginTop: 4 },
  course: { fontSize: 12, color: '#888', marginTop: 4 },
});

export default HomeScreen;


