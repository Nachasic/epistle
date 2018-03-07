import * as React from 'react'
import i18n, { i18nGroup } from 'es2015-i18n-tag'
import Scopes from '../i18n/Scopes'

export interface IHelloWorldProps {
    name?: string
}

@i18nGroup(Scopes.HELLO_WORLD)
export default class HelloWorld extends React.PureComponent<IHelloWorldProps, {}> {
    public props: IHelloWorldProps
    public i18n: Function

    render () {
        return (
            <h1>{this.i18n`Hello World from ${this.props.name}!`}</h1>
        )
    }
}
