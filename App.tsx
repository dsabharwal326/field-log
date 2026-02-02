import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LibraryScreen from './src/screens/LibraryScreen';
import LogScreen from './src/screens/LogScreen';
import AddScreen from './src/screens/AddScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { initDatabase } from './src/db/database';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
