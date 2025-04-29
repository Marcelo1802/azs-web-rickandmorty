import { Image, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image 
        source={require('../assets/images/react-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.homeText}>Project JS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  homeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
}); 