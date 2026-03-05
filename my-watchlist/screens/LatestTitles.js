import { View, Animated, Text, StyleSheet, Dimensions, Image } from "react-native";
import { appStyles, } from "../shared/AppStyles";
import Swiper from "react-native-deck-swiper";
import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { getTrendingTitles } from "../services/Trakt";

export default function LatestTitles({ navigation }) {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [movies, setMovies] = useState([]);

    const handleSwipedLeft = (index) => {
        // console.log("Added to Watchlist:", movies[index].title);
        setCurrentMovieIndex(index + 1);
        console.log(currentMovieIndex);
    };

    const handleSwipedRight = (index) => {
        // console.log("Skipped:", movies[index].title);
        setCurrentMovieIndex(index + 1);
        console.log(currentMovieIndex);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrendingTitles();
            console.log(data);
            setMovies(data);
        }
        fetchData();

    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <View style={{ zIndex: 0 }}>
                <View style={{ flex: 1 }} >
                    <Swiper
                        infinite={true}
                        cards={movies}
                        cardHorizontalMargin={0}
                        cardVerticalMargin={0}
                        renderCard={(movie) => (
                            movie &&
                            <View style={[styles.card]}>
                                <Image
                                    style={{ minWidth: "100%", height: "100%" }}
                                    source={{ uri: `https://${movie.poster}` }}
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                        onSwipedLeft={handleSwipedLeft}
                        onSwipedRight={handleSwipedRight}
                        disableTopSwipe={true}
                        disableRightSwipe={true}
                        backgroundColor="transparent"
                        verticalSwipe={true}
                    />

                </View>
            </View>
            <BottomSheet
                index={0}
                snapPoints={["5%", "90%"]}
                backgroundStyle={{ borderRadius: 0 }}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <Text style={styles.sheetTitle}>Movie Details</Text>
                </BottomSheetView>
            </BottomSheet>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
    },
    card: {
        flex: 0.79,
        backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
        marginBottom: 20,
    },
    hint: {
        color: "#aaa",
        marginBottom: 5,
    },
    link: {
        color: "cyan",
        marginTop: 10,
    },
    sheetContent: {
        flex: 1,
        padding: 20,
    },
    sheetTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    topSheet: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
});