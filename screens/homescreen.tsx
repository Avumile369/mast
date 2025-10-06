import * as React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, useMenu } from '../context/contact';

type RootStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { menuItems } = useMenu();

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItemContainer}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.course}>Course: {item.course}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Total Menu Items: {menuItems.length}</Text>
        <Button
          title="Add New Item"
          onPress={() => navigation.navigate('AddMenuItem')}
        />
      </View>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  menuItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 4,
  },
  course: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default HomeScreen;
