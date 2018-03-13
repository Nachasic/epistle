import * as React from 'react'

import { debounce } from '../../../Utils'

import TextField from 'material-ui/TextField'
import ButtonBase from 'material-ui/ButtonBase'
import Modal from 'material-ui/Modal'

import * as styles from '../Styles/LineAtom.css'

const DOUBLE_CLICK_DEBOUNCE_TIME: number = 250

export interface ILineEditorAtomProps {
    id: string,
    selected?: boolean,
    atom?: Epistle.ILineAtom,
    onChange: (atom: Epistle.ILineAtom) => any,
    onClick: (id: string) => any,
    onSpace: (tail: string) => any,
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
                this.props.onClick(this.props.id)
            }
        }, DOUBLE_CLICK_DEBOUNCE_TIME)
        return (
            <ButtonBase
                className={this.props.selected ? `${styles.button} ${styles.selected}` : styles.button}
                onDoubleClick={handleDoubleClick}
                onClick={handleClick}
            >
                {atom.value}
            </ButtonBase>
        )
    }

    renderIntput () {
        const atom: Epistle.ILineAtom = this.props.atom ? this.props.atom : defaultAtom

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
            const value = event.target.value.replace(/\s+/g, ' ') // Deal with multiple spaces
            const words = value.split(' ')

            this.props.onChange({
                ...atom,
                value: words[0]
            })

            if (words.length > 1) {
                this.props.onSpace(words[words.length - 1])
                this.setState({ mode: 'VIEW' })
            }
        }
        const handleUnfocus = (event: React.FormEvent<HTMLInputElement>) => {
            if (event.currentTarget && event.currentTarget.value) {
                return this.setState({ mode: 'VIEW' })
            }

            return this.props.onDelete()
        }
        const inputProperties = {
            onBlur: handleUnfocus
        }

        return (
            <TextField
                autoFocus
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
