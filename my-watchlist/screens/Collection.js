import { View, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import Swiper from "react-native-deck-swiper";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { getCollection, getTrendingTitles } from "../services/Trakt";
import MovieDetails from "../components/MovieDetails";
import { COLORS } from "../shared/AppStyles";

export default function Collection({ navigation }) {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(1);

    const route = useRoute();

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

        const collection = route.params?.collection;

        const data = await getCollection(collection, pageNumber);
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
        <View style={styles.container}>
            <View style={{ zIndex: 0 }}>
                <View /*style={{ flex: 1 }}*/ >
                    <Swiper
                        infinite={true}
                        cards={movies}
                        cardHorizontalMargin={0}
                        cardVerticalMargin={0}
                        renderCard={(movie) => (
                            movie &&
                            <View style={styles.card}>
                                <Image
                                    source={{ uri: `https://${movie.poster}` }}
                                    resizeMode="cover"
                                    style={{ minWidth: "100%", height: "100%" }}
                                />
                            </View>
                        )}
                        onSwipedLeft={handleSwipedLeft}
                        onSwipedRight={handleSwipedRight}
                        disableTopSwipe={true}
                        disableRightSwipe={true}
                        verticalSwipe={true}
                        stackSize={1}
                        backgroundColor="transparent"
                    />
                </View>
            </View>
            <BottomSheet
                index={0}
                snapPoints={["4%", "100%"]}
                backgroundStyle={styles.slideUpPanel}
                handleIndicatorStyle={{ backgroundColor: COLORS.font }}
            >
                <BottomSheetView /*style={styles.sheetContent}*/>
                    <MovieDetails movie={movies[currentMovieIndex]} />
                </BottomSheetView>
            </BottomSheet>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    card: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: "center"
    },
    slideUpPanel: {
        backgroundColor: COLORS.secondary,
        borderRadius: 0
    }
});