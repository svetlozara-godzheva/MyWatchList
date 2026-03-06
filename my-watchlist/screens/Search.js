import { View, TextInput, ActivityIndicator, FlatList, Animated, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { searchMovies } from "../services/Trakt";
import Routes from "../navigation/Routes";
import { useNavigation } from '@react-navigation/native';

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
                <View style={{}}>
                    {url &&
                        <Image
                            style={{ width: "100%", aspectRatio: 16 / 9, }}
                            source={{ uri: `https://${url}` }}
                            resizeMode="cover"

                        />
                    }

                    <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 5 }}>{item.title} ({item.year})</Text>
                </View>
            </TouchableOpacity>

        );
    }

    return (
        <View style={{ padding: 10 }}>
            <View >
                <TextInput
                    value={searchTerm}
                    onChangeText={(text) => {
                        setSearchTerm(text);
                    }}
                    placeholder="Search for a movie"
                    // placeholderTextColor={COLORS.secondary}
                    // cursorColor={COLORS.secondary}
                    style={{
                        borderColor: "rgba(0,0,0,0.3)",
                        borderWidth: 1,
                        borderRadius: 3,
                        padding: 5,
                        color: "rgba(0,0,0,0.8)",
                    }}
                    onSubmitEditing={() => handleSearch(searchTerm)}
                    maxLength={50}
                    keyboardType="default"
                />
            </View>
            <View style={{ marginTop: 10 }}>
                {
                    isLoading ? (<ActivityIndicator size="large" color="#67bd4a" />) :
                        (
                            <FlatList
                                style={{}}
                                data={searchResults}
                                keyExtractor={item => item.id}
                                renderItem={renderItem}
                                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                            />
                        )
                }
            </View>
        </View>
    );
}
