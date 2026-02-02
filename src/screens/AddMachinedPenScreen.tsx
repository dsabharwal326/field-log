import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { insertMachinedPen } from '../db/database';

export default function AddMachinedPenScreen({ navigation }: any) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [mechanism, setMechanism] = useState('bolt');
  const [refillStandard, setRefillStandard] = useState('parker');

  const handleSave = async () => {
    if (!brand || !model) return;

    await insertMachinedPen({
      id: Date.now().toString(),
      brand,
      model,
      mechanism,
      refill_standard: refillStandard,
    });

    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Text>Brand</Text>
      <TextInput style={styles.input} value={brand} onChangeText={setBrand} />

      <Text>Model</Text>
      <TextInput style={styles.input} value={model} onChangeText={setModel} />

      <Text>Mechanism</Text>
      <TextInput style={styles.input} value={mechanism} onChangeText={setMechanism} />

      <Text>Refill Standard</Text>
      <TextInput style={styles.input} value={refillStandard} onChangeText={setRefillStandard} />

      <Button title="Save Machined Pen" onPress={handleSave} />
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
