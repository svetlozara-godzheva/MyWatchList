import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../shared/AppStyles";

export default function Watchlist() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coming soon...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.primary
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 5,
        color: COLORS.font
    },
});