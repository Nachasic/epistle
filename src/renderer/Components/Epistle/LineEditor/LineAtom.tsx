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
    editmode?: boolean,
    atom?: Epistle.ILineAtom,
    onChange: (id: string, atom: Epistle.ILineAtom) => any,
    onClick: (id: string) => any,
    onSpace: (atom: Epistle.ILineAtom, id: string, tail: string) => any,
    onEnterEdit?: (id: string) => any,
    onEnterView?: () => any,
    onDelete: (id: string) => any
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
            mode: props.editmode || !props.atom ? 'EDIT' : 'VIEW'
        }
    }

    private renderChip () {
        let doubleClicked: boolean = false
        const atom: Epistle.ILineAtom = this.props.atom ? this.props.atom : defaultAtom
        const handleDoubleClick = () => {
            doubleClicked = true
            // this.Edit()
            this.props.onEnterEdit(this.props.id)
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

    private renderIntput () {
        const atom: Epistle.ILineAtom = this.props.atom ? this.props.atom : defaultAtom
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
            const value = event.target.value.replace(/\s+/g, ' ') // Deal with multiple spaces
            const words = value.split(' ')
            const newAtom: Epistle.ILineAtom = {
                ...atom,
                value: words[0]
            }

            if (words.length > 1) {
                this.props.onSpace(newAtom, this.props.id, words[words.length - 1])
                // this.View()
            } else {
                this.props.onChange(this.props.id, newAtom)
            }
        }
        const handleUnfocus = (event: React.FormEvent<HTMLInputElement>) => {
            if (event.currentTarget && event.currentTarget.value) {
                // return this.View()
                return null
            }

            return this.props.onDelete(this.props.id)
        }
        const inputProperties = {
            onBlur: handleUnfocus,
            className: styles.inputField
        }

        return (
            <TextField
                className={styles.input}
                autoFocus
                value={atom.value}
                onChange={handleChange}
                margin="dense"
                inputProps={inputProperties}
            />
        )
    }

    // public Edit (): void {
    //     if (this.props.onEnterEdit) {
    //         this.props.onEnterEdit(this.props.id)
    //     }
    //     this.setState({ mode: 'EDIT' })
    // }

    // public View (): void {
    //     if (this.props.onEnterView) {
    //         this.props.onEnterView()
    //     }
    //     this.setState({ mode: 'VIEW' })
    // }

    // componentWillMount () {
    //     if (nextProps.editmode) {
    //         this.setState({ mode: 'EDIT' })
    //     }
    // }

    componentWillReceiveProps (nextProps: ILineEditorAtomProps) {
        if (nextProps.editmode) {
            return this.setState({ mode: 'EDIT' })
        }

        return this.setState({ mode: 'VIEW' })
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
