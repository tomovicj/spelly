import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    button: {
        width: "80%",
        padding: 10,
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
    },
    list: {
        width: "80%",
        marginTop: 20,
    },
    listItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
    },
    textXL: {
        fontSize: 24,
    }
});

export default styles;
