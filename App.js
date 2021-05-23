import React from 'react';
import {StatusBar} from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Src/Screen/HomeScreen";
import SetWallpaper from "./Src/Screen/SetWallpaper"

import Firebase from "@react-native-firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCgSGV6lIrMgUoILFzohDuk7OwYdKXYNrM",
  authDomain: "wallpaper-h-f666e.firebaseapp.com",
  projectId: "wallpaper-h-f666e",
  storageBucket: "wallpaper-h-f666e.appspot.com",
  messagingSenderId: "573522922780",
  appId: "1:573522922780:web:e8304bded379d16a83bed9",
  measurementId: "G-WLPGE05D3R"
};

const Stack = createStackNavigator();

function App(props) {

    React.useEffect(() => {
      if (!Firebase.apps.length) {
        const app =Firebase.initializeApp(firebaseConfig);       // FIREBASE INITILIZE
      }
    });

  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="black" />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={"HomeScreen"}
        >  
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SetWallpaper" component={SetWallpaper} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;