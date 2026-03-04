import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './Routes';
import { appStyles } from '../shared/AppStyles';
import LatestTitles from '../screens/LatestTitles';


const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator initialRouteName={Routes.LATEST_TITLES} screenOptions={appStyles.toolbar}>
            <Stack.Screen name={Routes.LATEST_TITLES} component={LatestTitles}></Stack.Screen>
        </Stack.Navigator >
    );
}