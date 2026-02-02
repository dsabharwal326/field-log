import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { insertFountainPen } from '../db/database';

export default function AddFountainPenScreen({ navigation }: any) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [nibSize, setNibSize] = useState('');
  const [nibUnit, setNibUnit] = useState('jowo');

  const handleSave = async () => {
    if (!brand || !model) return;

    await insertFountainPen({
      id: Date.now().toString(),
      brand,
      model,
      nib_size: nibSize,
      nib_unit: nibUnit,
    });

    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Text>Brand</Text>
      <TextInput style={styles.input} value={brand} onChangeText={setBrand} />

      <Text>Model</Text>
      <TextInput style={styles.input} value={model} onChangeText={setModel} />

      <Text>Nib Size</Text>
      <TextInput style={styles.input} value={nibSize} onChangeText={setNibSize} />

      <Text>Nib Unit (jowo / bock / schmidt / proprietary / other)</Text>
      <TextInput style={styles.input} value={nibUnit} onChangeText={setNibUnit} />

      <Button title="Save Fountain Pen" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
});
