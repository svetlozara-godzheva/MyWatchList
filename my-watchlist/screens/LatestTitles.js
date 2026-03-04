import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { appStyles, } from "../shared/AppStyles";
import Swiper from "react-native-deck-swiper";
import React, { useMemo, useRef, useState, useCallback } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const { width, height } = Dimensions.get("window");

const movies = [
    { id: 1, title: "Avengers: Secret Wars", description: "Big Marvel event." },
    { id: 2, title: "Dune Part Three", description: "Continuation of Arrakis saga." },
    { id: 3, title: "Spider-Man 4", description: "Peter Parker returns." },
    { id: 4, title: "Dune Part Three", description: "Continuation of Arrakis saga." },
    { id: 5, title: "Spider-Man 4", description: "Peter Parker returns." },
    { id: 6, title: "Dune Part Three", description: "Continuation of Arrakis saga." },
    { id: 7, title: "Spider-Man 4", description: "Peter Parker returns." },
];

export default function LatestTitles() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const detailsSheetRef = useRef(null);
    const navSheetRef = useRef(null);

    const detailSnapPoints = useMemo(() => ["5%", "90%"], []);
    const navSnapPoints = useMemo(() => ["40%"], []);
    const handleSwipedLeft = (index) => {
        console.log("Added to Watchlist:", movies[index].title);
        setCurrentIndex(index + 1);
    };

    const handleSwipedRight = (index) => {
        console.log("Skipped:", movies[index].title);
        setCurrentIndex(index + 1);
    };

    const openDetails = useCallback(() => {
        detailsSheetRef.current?.expand();
    }, []);

    const openNavigation = useCallback(() => {
        navSheetRef.current?.expand();
    }, []);

    const handleSwipedTop = (index) => {
        console.log("Swiped Up:", movies[index].title);
        detailsSheetRef.current?.expand();
    };

    const handleSwipedBottom = (index) => {
        console.log("Swiped Down:", movies[index].title);
        navSheetRef.current?.expand();
    };

    return (
        <View style={appStyles.container}>
            <View style={{ zIndex: 0 }}>
                <Swiper
                    cards={movies}
                    cardIndex={0}
                    renderCard={(movie) => {
                        if (!movie) return <View />;
                        return (
                            <View style={styles.card}>
                                <Text style={styles.title}>{movie.title}</Text>
                                <Text style={styles.hint}>Swipe left = Watchlist</Text>
                                <Text style={styles.hint}>Swipe right = Skip</Text>
                                <Text style={styles.link} onPress={openDetails}>
                                    Swipe Up or Tap for Details
                                </Text>
                                <Text style={styles.link} onPress={openNavigation}>
                                    Swipe Down or Tap for Menu
                                </Text>
                            </View>
                        );
                    }}
                    onSwipedLeft={handleSwipedLeft}
                    onSwipedRight={handleSwipedRight}
                    onSwipedTop={handleSwipedTop}
                    onSwipedBottom={handleSwipedBottom}
                    stackSize={2}
                    backgroundColor="black"
                    verticalSwipe={false} // we let bottom sheet handle vertical
                />
            </View>
            <BottomSheet
                ref={detailsSheetRef}
                index={0}
                snapPoints={detailSnapPoints}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <Text style={styles.sheetTitle}>Movie Details</Text>
                    <Text>{movies[currentIndex]?.description}</Text>
                </BottomSheetView>
            </BottomSheet>

            <BottomSheet
                ref={navSheetRef}
                index={-1}
                snapPoints={navSnapPoints}
                enablePanDownToClose
                detached
                style={styles.topSheet}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <Text style={styles.sheetTitle}>Navigation</Text>
                    <Text>Watchlist</Text>
                    <Text>Profile</Text>
                    <Text>Settings</Text>
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
        flex: 0.75,
        borderRadius: 20,
        backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
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