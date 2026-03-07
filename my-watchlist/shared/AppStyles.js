import { StyleSheet } from "react-native";

export const COLORS = {
    primary: "#110803",
    secondary: "#332034",
    tertiary: "#332034f0",
    font: "#f7e8e1",
};

// #0e1b07
// #35170c
// #924622
// #9e7967
// #f7e8e1

//#332034

export const FONT_SIZES = {
    title: 25,
    subTitle: 20,
    textAndButton: 18
}

export const appStyles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    image: {
        width: "100%",
        aspectRatio: 16 / 9
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: COLORS.secondary,
        padding: 0
    },
    toolbar: {
        headerStyle: {
            backgroundColor: COLORS.primary
        },
        headerTitleStyle: {
            fontSize: FONT_SIZES.title,
            fontWeight: "bold"
        },
        headerTintColor: COLORS.secondary,
        headerTitleAlign: "center"
    },
    title: {
        fontSize: FONT_SIZES.title,
        color: COLORS.primary,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    subTitle: {
        fontSize: FONT_SIZES.subTitle,
        color: COLORS.primary,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    progressBar: {
        borderColor: COLORS.progressBar,
        borderWidth: 2,
        borderRadius: 5,
        alignSelf: "center"
    },
    textHelper: {
        fontSize: FONT_SIZES.textAndButton,
        color: COLORS.primary,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5
    },
    button: {
        borderRadius: 5,
        borderColor: COLORS.primary,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        marginTop: 15,
        padding: 5,
        alignItems: "center"
    },
    buttonText: {
        fontSize: FONT_SIZES.textAndButton,
        fontWeight: "bold",
        color: COLORS.primary
    },
    scoreboardButton: {
        borderRadius: 5,
        borderColor: COLORS.primary,
        borderWidth: 2,
        backgroundColor: COLORS.primary,
        marginTop: 30,
        padding: 5,
        alignItems: "center"
    },
    scoreboardButtonText: {
        fontSize: FONT_SIZES.textAndButton,
        fontWeight: "bold",
        color: COLORS.secondary
    },
    flatListItem: {
        borderRadius: 5,
        borderColor: COLORS.primary,
        borderWidth: 2,
        padding: 5,
        alignItems: "center"
    },
    flatListItemNormal: {
        backgroundColor: COLORS.secondary
    },
    flatListItemSuccess: {
        backgroundColor: "#d4e457"
    },
    flatListItemText: {
        fontSize: FONT_SIZES.subTitle,
        color: COLORS.primary,
        fontWeight: "bold",
        textAlign: "center"
    },
    separator: {
        height: 3,
        backgroundColor: COLORS.secondary,
        marginVertical: 10
    }
});