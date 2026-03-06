import { View, Animated, Text, StyleSheet, Dimensions, Image } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";


export default function MovieDetails({ movie }) {
    return (
        movie &&
        <View style={{ padding: 0, backgroundColor: "#0e1b07" }}>

            {movie.thumb &&
                <Image
                    style={{ width: "100%", aspectRatio: 16 / 9, }}
                    source={{ uri: `https://${movie.thumb}` }}
                    resizeMode="cover"

                />
            }



            <View style={{ padding: "10" }}>
                <Icon name="cards-heart-outline" size={30} color="black" style={{ position: "absolute", top: 10, right: 10, color: "#9e7967" }} />

                <Text style={{ fontSize: 20, paddingRight: 30, color: "#f7e8e1" }}>{movie.title} ({movie.year})</Text>
                <Text style={{ marginTop: 10, fontSize: 15, color: "#924622" }}>{movie.overview}</Text>
            </View>

        </View >
    );
}