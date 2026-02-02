import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LibraryList, ItemDetailScreen } from './index';
import AddLogScreen from './AddLogScreen';

const Stack = createNativeStackNavigator();

export default function LibraryScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryList"
        component={LibraryList}
        options={{ title: 'Library' }}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
        options={{ title: 'Item Details' }}
      />
      <Stack.Screen
        name="AddLog"
        component={AddLogScreen}
        options={{ title: 'Add Log Entry' }}
      />
    </Stack.Navigator>
  );
}
