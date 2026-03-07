import { StyleSheet } from "react-native";

export const COLORS = {
    primary: "#110803",
    secondary: "#332034",
    tertiary: "#332034f0",
    font: "#f7e8e1",
    error: "#rgb(87, 152, 165)"
};

export const appStyles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    image: {
        width: "100%",
        aspectRatio: 16 / 9
    },
    input: {
        borderColor: COLORS.font,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        color: COLORS.font,
        fontSize: 15
    },
});