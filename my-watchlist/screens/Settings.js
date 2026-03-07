import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Routes from "../navigation/Routes";
import { COLORS } from "../shared/AppStyles";


export default function SettingsScreen() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    alert("Your information was successfully deleted!");
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>Delete my Information</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: Routes.SIGN_IN }]
                    });
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        backgroundColor: COLORS.primary
    },
    button: {
        borderRadius: 3,
        borderColor: COLORS.font,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        marginBottom: 50,
        padding: 5,
        alignItems: "center"

    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.font
    }
});