import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/contact';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import "@react-native-picker/picker"

type RootStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
};

type AddMenuItemScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenuItem'>;

const AddMenuItemScreen: React.FC<AddMenuItemScreenProps> = ({ navigation }) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const { addMenuItem } = useMenu();

  const handleAddMenuItem = () => {
    if (dishName.trim() === '' || price.trim() === '') {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    
    addMenuItem({ dishName, description, price, course });
    Alert.alert('Success', 'Menu item added successfully!');
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse('Starter');
    navigation.goBack(); // Navigate back to the Home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name:</Text>
      <TextInput
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
        placeholder="e.g. Pasta Carbonara"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="A creamy pasta dish"
        multiline
      />

      <Text style={styles.label}>Course:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) => setCourse(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Starters" value="Starter" />
          <Picker.Item label="Mains" value="Main" />
          <Picker.Item label="Desserts" value="Dessert" />
        </Picker>
      </View>

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="e.g. R99.50"
        keyboardType="numeric"
      />

      <Button title="Add Item to Menu" onPress={handleAddMenuItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
});

export default AddMenuItemScreen;
