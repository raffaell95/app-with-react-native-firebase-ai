import { getApp } from '@react-native-firebase/app'
import {getAI, getGenerativeModel} from '@react-native-firebase/ai'

const app = getApp()

const ai = getAI(app)

export const model = getGenerativeModel(ai, {
    model: 'gemini-2.5-flash'
})