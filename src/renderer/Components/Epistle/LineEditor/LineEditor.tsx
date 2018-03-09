import * as React from 'react'

export interface ILineEditorProps {
    line: Epistle.IEpistleLine,
    children?: string
}

interface ILineEditorState {
    editingAtoms: Epistle.ILineAtom[],
    mode: 'ATOMS' | 'LINE' | 'PREVIEW'
}

export default class LineEditor extends React.PureComponent<ILineEditorProps, ILineEditorState> {
    public props: ILineEditorProps

    constructor (props: ILineEditorProps) {
        super(props)

        this.state = {
            editingAtoms: [],
            mode: 'LINE'
        }
    }

    render () {
        return null
    }
}
