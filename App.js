import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Material from "@expo/vector-icons/build/MaterialCommunityIcons";
import './global.css';

export default function App() {
  return (
    <View style={styles.container} className="bg-red-500">
      <Text>Open up App.js to start working on your app!</Text>
      <Material name="flower-tulip" size={24} color="black" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
