import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

export default function FavoritesScreen() {
  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Favoritos', headerStyle: { backgroundColor: '#121212' }, headerTitleStyle: { color: '#FFFFFF' } }} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Você ainda não tem episódios favoritos.</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});