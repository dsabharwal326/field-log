import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { insertLogEntry } from '../db/database';

export default function AddLogScreen({ route, navigation }: any) {
  const { itemId } = route.params;
  const [notes, setNotes] = useState('');
  const [condition, setCondition] = useState('');

  const handleAddLog = async () => {
    if (!notes) return;

    await insertLogEntry(
      Date.now().toString(),
      itemId,
      notes,
      condition
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Log Entry</Text>

      <Text>Notes</Text>
      <TextInput
        style={[styles.input, styles.notes]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Text>Condition</Text>
      <TextInput
        style={styles.input}
        value={condition}
        onChangeText={setCondition}
        placeholder="e.g. Excellent"
      />

      <Button title="Save Log" onPress={handleAddLog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  notes: {
    height: 80,
    textAlignVertical: 'top',
  },
});
