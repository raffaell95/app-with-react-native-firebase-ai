import { Canvas, Group, Image, ImageFormat, Paragraph, Skia, TextAlign, useCanvasRef, useFonts, useImage } from "@shopify/react-native-skia"
import { Theme } from "../themes/Theme"
import { StyleSheet, View } from "react-native"
import { TProportion } from "./ProportionSelect"
import { Ref, useImperativeHandle, useMemo, useState } from "react"

export interface IImagePreviewRef {
    getImage(): Uint8Array | null
}

interface IImagePreviewProps {
    proportion: TProportion
    message: string
    imageUrl: string
    ref?: Ref<IImagePreviewRef>
}

export const ImagePreview = ({ proportion, ref, imageUrl, message}: IImagePreviewProps) => {
    const canvasRef =  useCanvasRef()

    const [size, setSize] = useState<{ width: number, height: number } | null>(null)

    const virtualSizes = useMemo(() => {
        switch (proportion) {
            case '9/16': return { height: 1280, width: 720 }
            case '4/6': return { height: 1080, width: 720 }
            case '1/1': return { height: 720, width: 720 }
            case '6/4': return { height: 720, width: 1080 }
            case '16/9': return { height: 720, width: 1280 }
            default: return { height: 1280, width: 720 }
        }

    }, [proportion])

    const scale = useMemo(() => {
        const scaleX = (size?.width || 0) / virtualSizes.width
        const scaleY = (size?.height || 0) / virtualSizes.height
        const scale = Math.min(scaleX, scaleY)
        return scale
    }, [virtualSizes, size])

    const image = useImage(
        useMemo(() => {

            return `${imageUrl}?fit=crop&h=${virtualSizes.height}&w=${virtualSizes.width}`

        }, [virtualSizes, imageUrl])
    )

    const paragraph = useMemo(() => {

        const paragraph = Skia.ParagraphBuilder
            .Make({ textAlign: TextAlign.Center })
            .pushStyle({
                color: Skia.Color(Theme.colors.textHighlighted),
                fontSize: 48,
                shadows: [
                    {
                        blurRadius: 5,
                        color: Skia.Color(Theme.colors.text)
                    },
                    {
                        blurRadius: 10,
                        color: Skia.Color(Theme.colors.text)
                    },
                    {
                        blurRadius: 15,
                        color: Skia.Color(Theme.colors.text)
                    },
                    {
                        blurRadius: 20,
                        color: Skia.Color(Theme.colors.text)
                    }
                ]
            })
            .addText(message)
            .pop()
            .build()

        paragraph.layout((virtualSizes?.width || 0) - 20)
        return paragraph
    }, [virtualSizes?.width, message])

    const handleExportImage = () => {}

    useImperativeHandle(ref, () => {
        return {
            getImage(){
                const snapshot = canvasRef.current?.makeImageSnapshot()
                if(!snapshot) return null

                const imageAsBytes = snapshot.encodeToBytes(ImageFormat.PNG, 100)
                return imageAsBytes
            }
        }
    }, [])

    return (
        <View
            onLayout={event => setSize(event.nativeEvent.layout)}
            style={{ ...styles.canvasContainer, aspectRatio: proportion }}>
            <Canvas style={styles.canvas} ref={canvasRef}>
                <Group transform={[{scale}]}>
                    <Image
                        image={image}
                        fit="contain"
                        x={0}
                        y={0}
                        width={virtualSizes?.width || 0}
                        height={virtualSizes?.height || 0}
                    />
                    {paragraph && (
                        <Paragraph
                            paragraph={paragraph}
                            x={10}
                            y={(virtualSizes?.height || 0) / 2 - (paragraph.getHeight() / 2)}
                            width={(virtualSizes?.width || 0) - 20}
                        />
                    )}
                </Group>
            </Canvas>
        </View>
    )
}


const styles = StyleSheet.create({
    canvasContainer: {
        width: '90%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    canvas: {
        flex: 1
    }
})