/* tslint:disable no-invalid-template-strings */
/* tslint:disable object-literal-key-quotes */
import Scopes from '../Scopes'

export const locale: string = 'ru'
export const ICON: string = '🇷🇺'

const ruRU: TLocaleProfile = {
    [Scopes.WELCOME_SCREEN]: {
        'I am a localized button!': 'Я локализованная кнопка!'
    },
    [Scopes.HELLO_WORLD]: {
        'Hello World from ${0}!': '${0} передает миру привет!'
    },
    [Scopes.LINE_EDITOR]: {
        'Pacing': 'Темп',
        'Extra fast': 'Очень быстро',
        'Fast': 'Быстро',
        'Normal': 'Обычно',
        'Slow': 'Медленно',
        'Extra Slow': 'Очень медленно',
        'How fast do you want text to appear?': 'Как быстро текст должен появляться?',
        'Articulation': 'Артикуляция',
        'Letter-by-letter': 'Буква-по-букве',
        'By pairs of letters': 'По паре букв',
        'By whole word': 'По целому слову',
        'The articulation in which text appears.': 'Как артикулировать появление текста?'
    }
}

export default ruRU
