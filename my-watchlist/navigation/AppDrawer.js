import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Dimensions, TouchableOpacity, StyleSheet, View } from "react-native";
import Routes from './Routes';
import { COLORS } from '../shared/AppStyles';
import Collection from '../screens/Collection';
import Search from "../screens/Search";
import SignIn from "../screens/SignIn";
import SettingsScreen from "../screens/Settings";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import TitleInfo from "../screens/TitleInfo";
import { Ionicons } from '@expo/vector-icons';
import Watchlist from "../screens/Watchlist";
import Collections from "../services/Trakt";

const { width } = Dimensions.get("window");

const Drawer = createDrawerNavigator();

function CustomDrawerContent() {

    const navigation = useNavigation();

    return (
        <DrawerContentScrollView >
            <DrawerItem
                label="Trending"
                labelStyle={styles.drawerLabel}
                onPress={() => navigation.navigate(Routes.TRENDING)}
            />
            <DrawerItem
                label="Upcoming"
                labelStyle={styles.drawerLabel}
                onPress={() => navigation.navigate(Routes.UPCOMING)}
            />
            <DrawerItem
                label="Watchlist"
                labelStyle={styles.drawerLabel}
                onPress={() => navigation.navigate(Routes.WATCHLIST)}
            />
            <DrawerItem
                label="Search"
                labelStyle={styles.drawerLabel}
                onPress={() => navigation.navigate(Routes.SEARCH)}
            />
            <DrawerItem
                label="Settings"
                labelStyle={styles.drawerLabel}
                onPress={() => navigation.navigate(Routes.SETTINGS)}
            />
        </DrawerContentScrollView >
    );
}

export default function AppDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName={Routes.SIGN_IN}
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: { width: width * 0.45, backgroundColor: COLORS.tertiary },
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
            <Drawer.Screen name={Routes.SIGN_IN}
                component={SignIn}
                options={{
                    swipeEnabled: false,
                    headerLeft: () =>
                        <View style={{ marginLeft: 15, marginRight: 10 }} />
                }}
            />
            <Drawer.Screen name={Routes.TRENDING} initialParams={{ collection: Collections.TRENDING }} component={Collection} />
            <Drawer.Screen name={Routes.UPCOMING} initialParams={{ collection: Collections.UPCOMING }} component={Collection} />
            <Drawer.Screen name={Routes.SEARCH} component={Search} />
            <Drawer.Screen name={Routes.TITLE_INFO} component={TitleInfo} />
            <Drawer.Screen name={Routes.SETTINGS} component={SettingsScreen} />
            <Drawer.Screen name={Routes.WATCHLIST} component={Watchlist} />
        </Drawer.Navigator >
    );
}

const styles = StyleSheet.create({
    drawerLabel: {
        color: COLORS.font,
        fontSize: 15,
        fontWeight: "bold"
    }
});