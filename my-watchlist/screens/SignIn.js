import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Routes from "../navigation/Routes";
import { appStyles, COLORS } from "../shared/AppStyles";

export default function SignIn() {

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigation = useNavigation();

    const validateUsername = (value) => {
        if (value === undefined || value.length === 0) {
            setUsernameError("You should enter a name");
            return false;
        } else {
            setUsernameError("");
            return true;
        }
    };

    const validatePassword = (value) => {
        if (value === undefined || value.length === 0) {
            setPasswordError("You should enter a password");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const signInForm = () => {
        let isFormValid = true;

        if (!validateUsername(username)) {
            isFormValid = false;
        }

        if (!validatePassword(password)) {
            isFormValid = false;
        }

        if (!isFormValid) {
            alert("Please fill out the username and password fields!");
            return isFormValid;
        }

        if (username != "user" || password != "user") {
            alert("Invalid username or password!");
            isFormValid = false;
        }
        return isFormValid;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                value={username}
                onChangeText={(text) => {
                    setUsername(text);
                }}
                placeholder="Enter your username"
                placeholderTextColor={COLORS.font}
                cursorColor={COLORS.font}
                style={[
                    appStyles.input,
                    usernameError ? styles.inputError : null
                ]
                }
                maxLength={30}
                keyboardType="default"
            />
            {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

            <Text style={styles.label}>Password:</Text>
            <TextInput
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                }}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.font}
                cursorColor={COLORS.font}
                style={[
                    appStyles.input,
                    passwordError ? styles.inputError : null
                ]}
                maxLength={30}
                secureTextEntry={true}
                keyboardType="default"
            />
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

            <TouchableOpacity
                onPress={() => {
                    if (signInForm()) {
                        navigation.navigate(Routes.TRENDING);
                    }
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: COLORS.primary
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.font,
        marginBottom: 5,
        marginTop: 20
    },
    inputError: {
        borderColor: COLORS.error,
        borderWidth: 2,
    },
    error: {
        fontSize: 15,
        color: COLORS.error,
        marginTop: 2,
        marginBottom: 5
    },
    button: {
        borderRadius: 3,
        borderColor: COLORS.font,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        marginTop: 20,
        padding: 5,
        alignItems: "center"

    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.font
    }
});
