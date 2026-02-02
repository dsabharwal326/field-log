import { View, Text, StyleSheet } from 'react-native';

export default function LogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log</Text>
      <Text>Your log entries will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
});
