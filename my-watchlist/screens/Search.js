import { View, TextInput, ActivityIndicator, FlatList, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import Routes from "../navigation/Routes";
import { useNavigation } from '@react-navigation/native';
import { searchMovies } from "../services/Trakt";
import { appStyles, COLORS } from '../shared/AppStyles';

export default function Search() {

    const navigation = useNavigation();

    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (text) => {
        console.log("Searching....", text);
        setIsLoading(true);
        const result = await searchMovies(text);
        setSearchResults(result.movies);
        setIsLoading(false);
    }

    const renderItem = ({ item }) => {
        const url = item.thumb ?? item.poster;
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(Routes.TITLE_INFO, { selectedMovie: item });
                }}
            >
                <View style={styles.movieCard}>
                    {url &&
                        <Image
                            source={{ uri: `https://${url}` }}
                            resizeMode="cover"
                            style={appStyles.image}
                        />
                    }
                    <Text style={styles.movieTitle}>{item.title} ({item.year})</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View >
                <TextInput
                    value={searchTerm}
                    onChangeText={(text) => {
                        setSearchTerm(text);
                    }}
                    placeholder="Search for a movie"
                    placeholderTextColor={COLORS.font}
                    cursorColor={COLORS.font}
                    style={appStyles.input}
                    onSubmitEditing={() => handleSearch(searchTerm)}
                    maxLength={50}
                    keyboardType="default"
                />
            </View>
            <View style={styles.resultsContainer}>
                {
                    isLoading ? (<ActivityIndicator size="large" color={COLORS.font} />) :
                        (
                            <FlatList
                                style={{ backgroundColor: "transparent" }}
                                data={searchResults}
                                keyExtractor={item => item.id}
                                renderItem={renderItem}
                                ItemSeparatorComponent={() =>
                                    <View style={{ height: 20 }} />
                                }
                            />
                        )
                }
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
    movieTitle: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 5,
        color: COLORS.font
    },
    resultsContainer: {
        marginTop: 10
    },
    movieCard: {
        overflow: "hidden",
        borderRadius: 10,
        padding: 10,
        // backgroundColor: "rgba(247, 232, 225, 0.1)"
        backgroundColor: COLORS.secondary
    }
});