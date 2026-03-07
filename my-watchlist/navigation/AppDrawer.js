import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Dimensions, TouchableOpacity } from "react-native";
import Routes from './Routes';
import { COLORS } from '../shared/AppStyles';
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
            < DrawerItem
                label="Trending"
                labelStyle={{ color: COLORS.font }}
                onPress={() => navigation.navigate(Routes.TRENDING)}
            />
            < DrawerItem
                label="Watchlist"
                labelStyle={{ color: COLORS.font }}
                onPress={() => console.log("Go to Watchlist")}
            />
            < DrawerItem
                label="Search"
                labelStyle={{ color: COLORS.font }}
                onPress={() => navigation.navigate(Routes.SEARCH)}
            />
            < DrawerItem
                label="Settings"
                labelStyle={{ color: COLORS.font }}
                onPress={() => console.log("Go to Settings")}
            />
        </DrawerContentScrollView >
    );
}

export default function AppDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName={Routes.SEARCH}
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: { width: width * 0.5, backgroundColor: COLORS.tertiary },
                headerShown: true,
                headerStyle: { backgroundColor: COLORS.secondary },
                headerTitleStyle: { color: COLORS.font },
                headerLeft: () => {

                    const navigation = useNavigation()

                    return (
                        < TouchableOpacity
                            style={{ marginLeft: 15, marginRight: 10 }}
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                        >
                            <Ionicons
                                name="menu"
                                size={28}
                                color={COLORS.font}
                            />
                        </TouchableOpacity >
                    );
                }
            }}
        >
            <Drawer.Screen name={Routes.TRENDING} component={Trending} />
            {/* <Drawer.Screen name={Routes.LATEST_TITLES} component={Trending} /> */}
            <Drawer.Screen name={Routes.SEARCH} component={Search} />
            <Drawer.Screen name={Routes.TITLE_INFO} component={TitleInfo} />
        </Drawer.Navigator >
    );
}