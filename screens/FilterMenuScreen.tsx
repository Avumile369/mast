import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useMenu } from '../context/contact';
import { MenuItem } from '../context/contact';

const FilterMenuScreen = () => {
  const { menuItems } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<'Starter' | 'Main' | 'Dessert' | null>(null);

  const filteredItems = selectedCourse
    ? menuItems.filter((item) => item.course === selectedCourse)
    : menuItems;

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.dishName}</Text>
      <Text>{item.course}</Text>
      <Text>R{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>
      <View style={styles.buttonRow}>
        <Button title="Starters" onPress={() => setSelectedCourse('Starter')} />
        <Button title="Mains" onPress={() => setSelectedCourse('Main')} />
        <Button title="Desserts" onPress={() => setSelectedCourse('Dessert')} />
        <Button title="Show All" onPress={() => setSelectedCourse(null)} />
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  name: { fontWeight: 'bold' },
});

export default FilterMenuScreen;
