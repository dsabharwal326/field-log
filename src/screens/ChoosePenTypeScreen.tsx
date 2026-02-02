import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ChoosePenTypeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AddFountainPen')}
      >
        <Text style={styles.buttonText}>Fountain Pen</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AddMachinedPen')}
      >
        <Text style={styles.buttonText}>Machined Pen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
