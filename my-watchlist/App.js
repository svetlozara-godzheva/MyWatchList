import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { appStyles } from "./shared/AppStyles";

export default function App() {
  return (

    <SafeAreaProvider>
      <SafeAreaView style={appStyles.safeArea}>
        <GestureHandlerRootView>
          <StatusBar hidden />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}