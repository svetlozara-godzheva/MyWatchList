import { View, TextInput, ActivityIndicator, FlatList, Animated, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from "react-native";
import MovieDetails from "../components/MovieDetails";
import Icon from "react-native-vector-icons/MaterialIcons";
import Routes from "../navigation/Routes";
import { useNavigation } from '@react-navigation/native';

export default function TitleInfo({ route }) {
    const navigation = useNavigation();
    let selectedMovie = route.params?.selectedMovie;

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View>
                <View style={{ position: "absolute", top: 0, right: 0 }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(Routes.SEARCH);
                        }}
                    >
                        <Text style={{ fontSize: 15 }}><Icon name="arrow-back-ios" size={10} color="black" />Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 30 }}>
                <MovieDetails movie={selectedMovie} />
            </View>
        </View>
    );
}