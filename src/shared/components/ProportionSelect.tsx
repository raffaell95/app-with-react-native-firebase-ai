import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Theme } from "../themes/Theme"


export type TProportion = '9/16' | '4/6' | '1/1' | '6/4' | '16/9'

interface IProportionSelectProps {
    value: TProportion
    onChange(value: TProportion): void
}

export const ProportionSelect = ({ value, onChange }: IProportionSelectProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Proporções</Text>

            <View style={styles.buttonContainer}>

                {(['9/16', '4/6', '1/1', '6/4', '16/9'] as const).map(proportion => (
                    <TouchableOpacity
                        key={proportion}
                        onPress={() => onChange(proportion)}
                        style={value === proportion ? styles.buttonPrimary : styles.button}>
                        <Text>{proportion}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
        padding: 8,
        alignItems: 'center'
    },
    title: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.default
    },
    buttonContainer: {
        gap: 8,
        flexDirection: 'row'
    },
    button: {
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: Theme.colors.paper,
        borderWidth: 2,
        borderColor: Theme.colors.paper
    },
    buttonPrimary: {
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderColor: Theme.colors.primary,
        backgroundColor: Theme.colors.primaryWithOpacity
    }
})
