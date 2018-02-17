import * as React from 'react'

export interface IHelloWorldProps {
    name?: string
}

export default class HelloWorld extends React.PureComponent<IHelloWorldProps, {}> {
    public props: IHelloWorldProps

    render () {
        return (
            <h1>{this.props.name ? `${this.props.name} says `: ''}Hello, world!</h1>
        )
    }
}
