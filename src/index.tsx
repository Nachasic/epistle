import * as React from 'react'
import * as ReactDOM from 'react-dom'

const App: React.StatelessComponent<any> = () => (
    <span>Hello World!</span>
)

ReactDOM.render(<App/>, document.querySelector('body'))
