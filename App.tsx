import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import LibraryScreen from "./src/screens/LibraryScreen";
import LogScreen from "./src/screens/LogScreen";
import AddScreen from "./src/screens/AddScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

import { store, persistor } from "./src/store/store";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Library" component={LibraryScreen} />
            <Tab.Screen name="Log" component={LogScreen} />
            <Tab.Screen name="Add" component={AddScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
