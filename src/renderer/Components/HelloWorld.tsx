import * as React from 'react'
import i18n, { i18nGroup } from 'es2015-i18n-tag'

export interface IHelloWorldProps {
    lang?: string,
    name?: string
}

@i18nGroup('')
export default class HelloWorld extends React.PureComponent<IHelloWorldProps, {}> {
    public props: IHelloWorldProps
    public i18n: Function

    render () {
        return (
            <h1>{this.i18n`Hello World from ${this.props.name}!`}</h1>
        )
    }
}
