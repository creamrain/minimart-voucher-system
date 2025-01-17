import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // for tab icons
import { HomePage, ProductDetailsPage, SettingsPage } from './assets.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Product Details
const ProductStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsPage} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen 
          name="Home" 
          component={ProductStack} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsPage} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }} 
        />
      </Tab.Navigator>
  );
};

export default App;