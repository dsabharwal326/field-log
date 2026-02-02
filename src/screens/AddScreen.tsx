import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ChoosePenTypeScreen,
  AddFountainPenScreen,
  AddMachinedPenScreen,
} from './index';

const Stack = createNativeStackNavigator();

export default function AddScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChoosePenType"
        component={ChoosePenTypeScreen}
        options={{ title: 'Add Pen' }}
      />
      <Stack.Screen
        name="AddFountainPen"
        component={AddFountainPenScreen}
        options={{ title: 'Add Fountain Pen' }}
      />
      <Stack.Screen
        name="AddMachinedPen"
        component={AddMachinedPenScreen}
        options={{ title: 'Add Machined Pen' }}
      />
    </Stack.Navigator>
  );
}
