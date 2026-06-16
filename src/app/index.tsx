import { StyleSheet, View } from "react-native"
import { ProportionSelect, TProportion } from "../shared/components/ProportionSelect"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "../shared/components/Button"
import { IImagePreviewRef, ImagePreview } from "../shared/components/ImagePreview"
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { GenerateNewMessageAndImage, IMessageAndImageResult } from "../shared/services/GenerateNewMessageAndImage"

export default function Page() {
    const imagePreviewRef = useRef<IImagePreviewRef>(null)
    const insets = useSafeAreaInsets()

    const [proportion, setProportion] = useState<TProportion>('9/16')
    const [messageAndImage, setMessageAndImage] = useState<IMessageAndImageResult | null>(null)

    const handleShareImage = useCallback(async () => {
        const imageAsBase64 = imagePreviewRef.current?.getImage()
        if (!imageAsBase64) return

        const file = new FileSystem.File(FileSystem.Paths.cache, "motiva-image.png")
        file.create({ overwrite: true })
        file.write(imageAsBase64)

        await Sharing.shareAsync(file.uri)

        file.delete()
    }, [])

    const handleRegenerate = useCallback(() => {
        GenerateNewMessageAndImage
            .get()
            .then(result => {
                if (!result) return
                setMessageAndImage(result)
            })
    }, [])

    useEffect(() => {
        handleRegenerate()
    }, [])

    return <View style={{
        gap: 8,
        flex: 1,
        alignItems: 'center',
        paddingTop: insets.top + 8,
        paddingLeft: insets.left + 8,
        paddingRight: insets.right + 8,
        paddingBottom: insets.bottom + 8
    }}>
        <ProportionSelect value={proportion} onChange={setProportion} />

        <View style={styles.imageContainer}>
            {messageAndImage && (
                <ImagePreview
                    ref={imagePreviewRef}
                    proportion={proportion}
                    message={messageAndImage.message}
                    imageUrl={messageAndImage.imageUrl}
                />
            )}

            {!messageAndImage && (
                <View style={{ ...styles.placeholder, aspectRatio: proportion }} />
            )}
        </View>

        <View style={styles.footerContainer}>
            <Button text="Gerar novamente" onPress={handleRegenerate} />
            <Button primary text="Compartilhar" onPress={() => handleShareImage} />
        </View>
    </View>
}


const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerContainer: {
        gap: 8,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholder: {
        width: '90%',
        maxHeight: '95%',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#d2d2d2'
    }
})