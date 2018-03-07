import * as React from 'react'

export interface ILineProps {
    line: Epistle.IEpistleLine
}

export default class Line extends React.PureComponent<ILineProps, {}> {
    public props: ILineProps

    render () {
        return <p>Hey pal</p>
    }
}
