import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

/**
 * HomeScreen - Tela principal do aplicativo
 * Exibe um texto simples centralizado
 */
const HomeScreen = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.content}>
          <Text style={styles.homeText}>Home</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  homeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default HomeScreen; 