import { View, Animated, Text, StyleSheet, Dimensions, Image } from "react-native";
import { appStyles, } from "../shared/AppStyles";
import Swiper from "react-native-deck-swiper";
import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { getTrendingTitles } from "../services/Trakt";
import MovieDetails from "../components/MovieDetails";

export default function Trending({ navigation }) {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(1);

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

    const fetchData = async (pageNumber) => {
        if (pageNumber > totalPageCount) {
            return;
        }
        const data = await getTrendingTitles(pageNumber);
        console.log(data);
        setMovies([...movies, ...data.movies]);
        setCurrentPage(data.page);
        setTotalPageCount(data.totalPages);
    }

    useEffect(() => {
        if (movies.length === 0) {
            fetchData(1);
        }
        if (currentMovieIndex === movies.length - 3) {
            fetchData(currentPage + 1)
        }
    }, [currentMovieIndex]);

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
                        stackSize={1}
                        backgroundColor="transparent"
                        verticalSwipe={true}
                    />

                </View>
            </View>
            <BottomSheet
                index={0}
                snapPoints={["4%", "100%"]}
                backgroundStyle={{ borderRadius: 0 }}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <MovieDetails movie={movies[currentMovieIndex]} />
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
        flex: 0.8,
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