/* tslint:disable no-invalid-template-strings */
import Scopes from '../Scopes'

export const locale: string = 'ru'
export const ICON: string = '🇷🇺'

const ruRU: TLocaleProfile = {
    [Scopes.WELCOME_SCREEN]: {
        'I am a localized button!': 'Я локализованная кнопка!'
    },
    [Scopes.HELLO_WORLD]: {
        'Hello World from ${0}!': '${0} передает миру привет!'
    }
}

export default ruRU
