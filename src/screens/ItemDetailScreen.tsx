import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchItemById, fetchLogsForItem } from '../db/database';

export default function ItemDetailScreen({ route, navigation }: any) {
  const { itemId } = route.params;
  const [item, setItem] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const itemData = await fetchItemById(itemId);
    const logData = await fetchLogsForItem(itemId);
    setItem(itemData);
    setLogs(logData as any[]);
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {item.brand} {item.model}
      </Text>

      <Text style={styles.label}>Category</Text>
      <Text>{item.category}</Text>

      <Text style={styles.label}>Notes</Text>
      <Text>{item.notes || 'No notes'}</Text>

      <Button
        title="Add Log Entry"
        onPress={() =>
          navigation.navigate('AddLog', { itemId })
        }
      />

      <Text style={styles.label}>Log Entries</Text>

      <FlatList
        data={logs}
        keyExtractor={(log) => log.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text>{item.date.split('T')[0]}</Text>
            <Text>{item.usage_notes}</Text>
            <Text>{item.condition}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text>No logs yet.</Text>
        }
      />
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
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 12,
  },
  logItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
