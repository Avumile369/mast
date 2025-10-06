import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './context/contact';
import homescreen from './screens/homescreen';
import menuitem from './screens/menuitem';
import "./screens/menuitem"

type RootStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={homescreen} options={{ title: 'Menu' }} />
          <Stack.Screen name="AddMenuItem" component={menuitem} options={{ title: 'Add New Item' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

