import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Favorites from "./src/favorites";

import Dashboard from "./src/dashboard";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [loaded, error] = useFonts({
    'IBMPlexSans-Bold': require('./assets/fonts/IBMPlexSans-Bold.ttf'),
    'IBMPlexSans-Regular': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
  });


  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <StatusBar
      backgroundColor="#804674"
      />
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Dashboard" screenOptions={{headerShown: false}} >
            <Stack.Screen name="Dashboard" component={Dashboard} options={{animation: 'none'}}/>
            <Stack.Screen name="Favorites" component={Favorites} options={{animation: 'none'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
    },
});
