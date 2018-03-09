import * as React from 'react'

import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'
import Modal from 'material-ui/Modal'

export interface ILineEditorAtomProps {
    id: string,
    atom?: Epistle.ILineAtom,
    onChange: (atom: Epistle.ILineAtom) => any,
    onDelete: Function
}

export interface ILineEditorAtomState {
    mode: 'VIEW' | 'EDIT'
}

const defaultAtom: Epistle.ILineAtom = {
    type: 'WORD',
    value: ''
}

export default class LineAtom extends React.PureComponent<ILineEditorAtomProps, ILineEditorAtomState> {
    public props: ILineEditorAtomProps

    constructor (props: ILineEditorAtomProps) {
        super(props)

        this.state = {
            mode: props.atom ? 'VIEW' : 'EDIT'
        }
    }

    public Edit (): void {
        this.setState({ mode: 'EDIT' })
    }

    renderDirectionsEditor (isOpen: boolean, onClose: Function) {
        return null
    }

    renderChip () {
        const atom: Epistle.ILineAtom = this.props.atom ? this.props.atom : defaultAtom
        const handleDoubleClick = () => null // Show direction editor
        const handleClick = () => this.setState({ mode: 'EDIT' })
        return (
            <Chip
                onDoubleClick={handleDoubleClick}
                onClick={handleClick}
                label={atom.value}
            />
        )
    }

    renderIntput () {
        let input: HTMLInputElement
        const atom: Epistle.ILineAtom = this.props.atom ? this.props.atom : defaultAtom

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
            const value = event.target.value

            this.props.onChange({
                ...atom,
                value
            })
        }
        const handleUnfocus = () => {
            if (input && input.value) {
                return this.setState({ mode: 'VIEW' })
            }

            return this.props.onDelete()
        }
        const inputProperties = {
            onBlur: handleUnfocus,
            ref: field => { input = field }
        }

        return (
            <TextField
                multiline
                autoFocus
                rowsMax="4"
                value={atom.value}
                onChange={handleChange}
                margin="normal"
                inputProps={inputProperties}
            />
        )
    }

    render () {
        switch (this.state.mode) {
        case 'VIEW':
            return this.renderChip()
        default:
            return this.renderIntput()
        }

    }
}
