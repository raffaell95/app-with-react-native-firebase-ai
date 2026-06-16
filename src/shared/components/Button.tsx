import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { Theme } from "../themes/Theme"


interface IButtonProps {
    text: string
    primary?: boolean
    onPress: () => void
}

export const Button = ({text, primary, onPress}: IButtonProps) => {

    return (
        <TouchableOpacity onPress={onPress} style={primary ? styles.buttonPrimary : styles.button}>
            <Text style={primary ? styles.textPrimary : styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: Theme.colors.paper
    },
    buttonPrimary: {
        borderRadius: 4,
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: Theme.colors.primary
    },
    text: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.bold
    },
    textPrimary: {
        color: Theme.colors.textPrimary,
        fontFamily: Theme.fonts.bold
    }
})