import * as React from 'react'
import * as ReactDOM from 'react-dom'
import i18n, { i18nConfig, i18nGroup } from 'es2015-i18n-tag'

import translations, { locale } from './i18n/Transations/ru-RU'

import './Stylesheets/fonts.scss'

import WelcomeScreen from './Containers/WelcomeScreen'

i18nConfig({
    locales: locale,
    translations
})

class App extends React.PureComponent<any, any> {
    render () {
        return (
            <div lang="ru-RU">
                <WelcomeScreen />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
