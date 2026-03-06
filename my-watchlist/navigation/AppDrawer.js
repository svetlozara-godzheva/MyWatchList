import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Dimensions, TouchableOpacity, View, Button } from "react-native";
import Routes from './Routes';
import { appStyles } from '../shared/AppStyles';
import Trending from '../screens/Trending';
import Search from "../screens/Search";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import TitleInfo from "../screens/TitleInfo";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");
const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
    const navigation = useNavigation();
    return (
        <DrawerContentScrollView >
            {/* <DrawerItem label="Latest Titles" onPress={() => navigation.navigate(Routes.LATEST_TITLES)} /> */}
            < DrawerItem label="Trending" labelStyle={{ color: "#f7e8e1" }} onPress={() => navigation.navigate(Routes.TRENDING)} />
            < DrawerItem label="Watchlist" labelStyle={{ color: "#f7e8e1" }} onPress={() => console.log("Go to Watchlist")} />
            < DrawerItem label="Search" labelStyle={{ color: "#f7e8e1" }} onPress={() => navigation.navigate(Routes.SEARCH)} />
            < DrawerItem label="Settings" labelStyle={{ color: "#f7e8e1" }} onPress={() => console.log("Go to Settings")} />
        </DrawerContentScrollView >
    );
}

function CustomHeaderLeft2() {
    const navigation = useNavigation(); // Hook to access navigation object

    const toggleDrawer = () => {
        navigation.toggleDrawer(); // or navigation.dispatch(DrawerActions.toggleDrawer())
    };

    return (
        <Button
            onPress={toggleDrawer}
            title="Menu"
        />
    );
}
export default function AppDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName={Routes.SEARCH}
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: { width: width * 0.5, backgroundColor: "#924622" },
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#35170c",
                },
                headerTitleStyle: {
                    color: "#f7e8e1"
                },

                headerLeft: () => {
                    const navigation = useNavigation()
                    return < TouchableOpacity
                        style={{ marginLeft: 15 }}
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    >
                        <Ionicons name="menu" size={28} color="#fff" />
                    </TouchableOpacity >
                },
            }}

        >
            <Drawer.Screen name={Routes.TRENDING} component={Trending} />
            {/* <Drawer.Screen name={Routes.LATEST_TITLES} component={Trending} /> */}
            <Drawer.Screen name={Routes.SEARCH} component={Search} />
            <Drawer.Screen name={Routes.TITLE_INFO} component={TitleInfo} />
        </Drawer.Navigator >
    );
}