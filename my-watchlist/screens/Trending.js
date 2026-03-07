import { View, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { getTrendingTitles } from "../services/Trakt";
import MovieDetails from "../components/MovieDetails";
import { appStyles, COLORS } from "../shared/AppStyles";

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

        // flex: 1,
        // backgroundColor: "#111",
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
    // title: {
    //     fontSize: 24,
    //     color: "white",
    //     fontWeight: "bold",
    //     marginBottom: 20,
    // },
    // hint: {
    //     color: "#aaa",
    //     marginBottom: 5,
    // },
    // link: {
    //     color: "cyan",
    //     marginTop: 10,
    // },
    // sheetContent: {
    //     flex: 1,
    // },
    // sheetTitle: {
    //     fontSize: 22,
    //     fontWeight: "bold",
    //     marginBottom: 15,
    // },
    // topSheet: {
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     right: 0,
    // },
});