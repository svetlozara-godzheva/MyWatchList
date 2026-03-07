import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MovieDetails from "../components/MovieDetails";
import Icon from "react-native-vector-icons/MaterialIcons";
import Routes from "../navigation/Routes";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../shared/AppStyles";

export default function TitleInfo({ route }) {

    const navigation = useNavigation();

    let selectedMovie = route.params?.selectedMovie;

    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(Routes.SEARCH);
                    }}
                >
                    <Text style={styles.backButton}>
                        <Icon name="arrow-back-ios" size={10} />
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.movieDetailsContainer}>
                <MovieDetails movie={selectedMovie} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.primary
    },
    backButtonContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: 10,
        marginRight: 10
    },
    backButton: {
        fontSize: 15,
        color: COLORS.font,
        fontWeight: "bold"
    },
    movieDetailsContainer: {
        marginTop: 30
    }
});