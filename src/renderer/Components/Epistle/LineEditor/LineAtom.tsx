import * as React from 'react'

import { debounce } from '../../../Utils'

import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'
import Modal from 'material-ui/Modal'

export interface ILineEditorAtomProps {
    id: string,
    atom?: Epistle.ILineAtom,
    onChange: (atom: Epistle.ILineAtom) => any,
    onClick: (atom: Epistle.ILineAtom) => any,
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

    renderChip () {
        let doubleClicked: boolean = false
        const atom: Epistle.ILineAtom = this.props.atom ? this.props.atom : defaultAtom
        const handleDoubleClick = () => {
            doubleClicked = true
            this.setState({ mode: 'EDIT' })
        }
        const handleClick = debounce(() => {
            if (!doubleClicked) {
                this.props.onClick(atom)
            }
        }, 250)
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
        const handleUnfocus = (event: React.FormEvent<HTMLInputElement>) => {
            if (event.currentTarget && event.currentTarget.value) {
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
