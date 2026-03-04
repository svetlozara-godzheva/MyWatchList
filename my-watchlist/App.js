import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './navigation/RootNavigator';
import { appStyles } from "./shared/AppStyles";

import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={appStyles.safeArea}>
        <GestureHandlerRootView>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

