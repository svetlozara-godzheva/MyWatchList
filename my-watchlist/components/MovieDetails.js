import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";
import { appStyles, COLORS } from "../shared/AppStyles";

export default function MovieDetails({ movie }) {
    return (
        movie &&
        <View >
            {movie.thumb &&
                <Image
                    source={{ uri: `https://${movie.thumb}` }}
                    resizeMode="cover"
                    style={appStyles.image}
                />
            }
            <View style={styles.container}>
                <Icon name="cards-heart-outline"
                    size={30}
                    style={styles.icon}
                />
                <Text style={styles.title}>{movie.title} ({movie.year})</Text>
                <Text style={styles.paragraph}>{movie.overview}</Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: "10"
    },
    icon: {
        position: "absolute",
        top: 10,
        right: 10,
        color: COLORS.font
    },
    title: {
        fontSize: 20,
        color: COLORS.font
    },
    paragraph: {
        marginTop: 10,
        fontSize: 15,
        color: COLORS.font
    }
});