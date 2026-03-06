import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Dimensions, Button } from "react-native";
import Routes from './Routes';
import { appStyles } from '../shared/AppStyles';
import Trending from '../screens/Trending';
import Search from "../screens/Search";
import { useNavigation } from '@react-navigation/native';
import TitleInfo from "../screens/TitleInfo";

const { width } = Dimensions.get("window");
const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
    const navigation = useNavigation();
    return (
        <DrawerContentScrollView>
            <DrawerItem label="Latest Titles" onPress={() => console.log("Go to Latest Titles")} />
            <DrawerItem label="Trending" onPress={() => console.log("Go to Trending")} />
            <DrawerItem label="Watchlist" onPress={() => console.log("Go to Watchlist")} />
            <DrawerItem label="Search" onPress={() => navigation.navigate(Routes.SEARCH)} />
            <DrawerItem label="Settings" onPress={() => console.log("Go to Settings")} />
        </DrawerContentScrollView>
    );
}

export default function AppDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName={Routes.SEARCH}
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: { width: width * 0.5 },
                headerShown: true
            }}
        >
            <Drawer.Screen name={Routes.TRENDING} component={Trending} />
            <Drawer.Screen name={Routes.LATEST_TITLES} component={Trending} />
            <Drawer.Screen name={Routes.SEARCH} component={Search} />
            <Drawer.Screen name={Routes.TITLE_INFO} component={TitleInfo} />
        </Drawer.Navigator>
    );
}