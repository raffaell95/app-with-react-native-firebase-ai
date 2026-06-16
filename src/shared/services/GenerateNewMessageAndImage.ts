import { createClient } from 'pexels'
import { model } from './firebase'


const pexelsClient = createClient(process.env.EXPO_PUBLIC_PEXELS_API_KEY)

export interface IMessageAndImageResult {
    message: string
    imageUrl: string
}

export const GenerateNewMessageAndImage = {
    async get(imageDetails: string): Promise<IMessageAndImageResult> {
        const image = await pexelsClient.photos.random()
        if ('error' in image) return undefined

        const text = await model.generateContent(
            `Gere uma frase curta, motivadora e sempre positiva. A frase deve ter no minimo 12 palavras e no máximo 24 palavras, ser clara, inspiradora e fácil de compartilhar em redes sociais. A mensagem deve combinar de alguma forma com os detalhes que descreve essa imagem "${image.alt || 'Imagem generica de uma paisagem'}"`
        )

        return {
            message: text.response.text(),
            imageUrl: image.src.original
        }
    }
}