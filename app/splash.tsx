import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, router } from 'expo-router';


// Obtém as dimensões da tela
const { width } = Dimensions.get('window');

// Constantes da UI
const UI = {
  IMAGES: {
    MAIN_IMAGE: require('../assets/images/AZShip-and-rick-and-morty.png'),
  },
  TEXTS: {
    TITLE: '@ marcelo guimaraes',
  },
  TIMING: {
    SPLASH_DURATION: 2000, // 2 segundos
  }
};

// Componente de apresentação
const SplashScreen = () => {
  useEffect(() => {
    // Configura um timer para navegar para a tela Home após o tempo definido
    const timer = setTimeout(() => {
      router.replace('/home');
    }, UI.TIMING.SPLASH_DURATION);

    // Limpa o timer quando o componente for desmontado
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.imageWrapper}>
          <View style={styles.imageContainer}>
            <Image 
              source={UI.IMAGES.MAIN_IMAGE}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.homeText}>{UI.TEXTS.TITLE}</Text>
        </View>

      </SafeAreaView>
    </>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  homeText: {
    fontSize: Math.min(width * 0.08, 15),
    fontWeight: 'bold',
    color: 'green',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
});

export default SplashScreen; 