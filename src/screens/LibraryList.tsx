import { View, Text, StyleSheet } from 'react-native';

export default function LibraryList() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Library List</Text>
      <Text style={styles.subtext}>
        (Data wiring comes next)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  subtext: {
    marginTop: 8,
    color: '#666',
  },
});
