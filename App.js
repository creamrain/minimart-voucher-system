import { HomeScreen, DetailsScreen, Stack, TabNavigator, Test, LoginScreen, SignupScreen, styles} from './assets'
import React, { useState, useContext, useEffect } from 'react';

function App() {
      return (
        <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
          <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
            <Stack.Navigator initialRouteName="Back">
              {/* Three tabs, home, profile and details */}
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }}
                initialParams={{ uid: loggedInUser.uid, changeLogin: setLoggedInUser }} // Pass uid as initialParams
              />
              <Stack.Screen 
                name="Details" 
                component={DetailsScreen} 
              />
              <Stack.Screen
                name="Back"
                component={TabNavigator}
                options={{ headerShown: false }} // Hide header for back screen
              />
            </Stack.Navigator>
          </NavigationContainer>
        </themeContext.Provider>
      );
    } 
  
  // export default App ;
  
  export default function Main() {
    return (
      <UserProvider>
        <App />
      </UserProvider>
    );
  }