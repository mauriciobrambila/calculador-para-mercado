import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';
import Calculadora from './pages/calculadora';
import Lista from './pages/lista';

const Tab = createBottomTabNavigator();
function CustomTabIcon({ source, focused }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={source}
        style={{
          width: focused ? 40 : 40,
          height: focused ? 44 : 44,
          tintColor: focused ? '#fff' : 'rgba(255, 255, 255, 0.9)',
        }}
      />
    </View>
  );
}

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#006990',
          borderTopColor: 'transparent',
          paddingBottom: 36,
          height: 100,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.9)',
      }}
    >

      <Tab.Screen
        name="Lista  "
        component={Lista}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              source={require('../assets/lista.png')}
              focused={focused}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Calculadora  "
        component={Calculadora}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              source={require('../assets/calculadora.png')}
              focused={focused}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
