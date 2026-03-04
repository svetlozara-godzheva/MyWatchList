import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './navigation/RootNavigator';
import { appStyles } from "./shared/AppStyles";
import { Dimensions } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import LatestTitles from './screens/LatestTitles';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";


const { width } = Dimensions.get("window");
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Watchlist" onPress={() => console.log("Go to Watchlist")} />
      <DrawerItem label="Profile" onPress={() => console.log("Go to Profile")} />
      <DrawerItem label="Settings" onPress={() => console.log("Go to Settings")} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={appStyles.safeArea}>
        <GestureHandlerRootView>
          <NavigationContainer>
            <Drawer.Navigator
              drawerContent={(props) => <CustomDrawerContent {...props} />}
              screenOptions={{
                drawerPosition: "left",
                drawerStyle: { width: width * 0.6 },
                headerShown: true,
              }}
            >
              <Drawer.Screen name="LatestTitles" component={LatestTitles} />
            </Drawer.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

