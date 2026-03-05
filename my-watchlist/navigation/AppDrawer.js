import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import Routes from './Routes';
import { appStyles } from '../shared/AppStyles';
import LatestTitles from '../screens/LatestTitles';

const { width } = Dimensions.get("window");
const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
    return (
        <DrawerContentScrollView>
            <DrawerItem label="Latest Titles" onPress={() => console.log("Go to Latest Titles")} />
            <DrawerItem label="Trending" onPress={() => console.log("Go to Trending")} />
            <DrawerItem label="Watchlist" onPress={() => console.log("Go to Watchlist")} />
            <DrawerItem label="Search" onPress={() => console.log("Go to Search")} />
            <DrawerItem label="Settings" onPress={() => console.log("Go to Settings")} />
        </DrawerContentScrollView>
    );
}

export default function AppDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName={Routes.LATEST_TITLES}
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: { width: width * 0.5 },
                headerShown: true
            }}
        >
            <Drawer.Screen name={Routes.LATEST_TITLES} component={LatestTitles} />
        </Drawer.Navigator>
    );
}