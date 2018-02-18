import * as React from 'react'
import * as ReactDOM from 'react-dom'
import i18n, { i18nConfig, i18nGroup } from 'es2015-i18n-tag'

import HelloWorld from './Components/HelloWorld'

i18nConfig({
    locales: 'ru-RU',    
    translations: {
        "Greeting": "Приветосик!",
        "Hello World from ${0}!": "${0} передает миру привет!"
    }
})

class App extends React.PureComponent<any,any> {
    render () {
        return (
            <div lang="ru-RU">
                <HelloWorld name="Nachasic" />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
