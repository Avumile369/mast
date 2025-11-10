import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './context/contact';

// Import screens (make sure filenames match exactly)
import HomeScreen from './screens/homescreen';
import AddMenuItemScreen from './screens/menuitem';
import FilterMenuScreen from './screens/FilterMenuScreen'; // new screen you’ll create

// Define the navigation type
type RootStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
  FilterMenu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Menu Overview' }} 
          />
          <Stack.Screen 
            name="AddMenuItem" 
            component={AddMenuItemScreen} 
            options={{ title: 'Add New Menu Item' }} 
          />
          <Stack.Screen 
            name="FilterMenu" 
            component={FilterMenuScreen} 
            options={{ title: 'Filter Menu by Course' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}


