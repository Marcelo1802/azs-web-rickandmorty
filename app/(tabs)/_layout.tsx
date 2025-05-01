import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Episódios',
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={28} name="tv.fill" color={focused ? 'red' : 'gray'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? 'red' : 'gray',
                fontSize: focused ? 14 : 12, 
                fontWeight: focused ? 'bold' : 'normal', 
                marginTop: 4,
              }}>
              Episódios
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="characters"
        options={{
          title: 'Personagens',
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={28} name="person.fill" color={focused ? 'red' : 'gray'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? 'red' : 'gray',
                fontSize: focused ? 14 : 12,
                fontWeight: focused ? 'bold' : 'normal', 
                marginTop: 4,
              }}>
              Personagens
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={28} name="heart.fill" color={focused ? 'red' : 'gray'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? 'red' : 'gray',
                fontSize: focused ? 14 : 12,
                fontWeight: focused ? 'bold' : 'normal', 
                marginTop: 4,
              }}>
              Favorites
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
