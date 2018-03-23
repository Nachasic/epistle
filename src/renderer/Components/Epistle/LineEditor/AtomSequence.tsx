import * as React from 'react'
import * as shortid from 'shortid'

import LineAtom, { ILineEditorAtomProps as IAtomProps } from './LineAtom'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'

import { Theme, withStyles, WithStyles } from 'material-ui/styles'
import * as styles from '../Styles/AtomSequence.css'

interface IAtomSequenceProps {
    line: Epistle.IEpistleLine,
    className?: string,
    onLineChange: (line: Epistle.IEpistleLine) => any,
    onAtomSelect: (selectedAtoms: Epistle.ILineAtom[]) => any,
}

const style = (theme: Theme) => ({
    plusBtn: {
        width: '37px',
        height: '37px'
    }
})

export type TPropsWithStyle = IAtomSequenceProps & WithStyles<'plusBtn'>

// Dedicated interface for exchangind atom data between line editor components
export interface IAtomExchange {
    id: string,
    atom: Epistle.ILineAtom
}

export interface IAtomSequenceState {
    scheduledAtomUpdateIndex: number,
    editingAtomId: string,
    parsedAtoms: IAtomExchange[],
    selectedAtomIds: string[]
}

export class AtomSequence extends React.PureComponent<TPropsWithStyle, IAtomSequenceState> {
    public props: TPropsWithStyle

    constructor (props: TPropsWithStyle) {
        super(props)

        const state: IAtomSequenceState = {
            scheduledAtomUpdateIndex: null,
            editingAtomId: '',
            parsedAtoms: [],
            selectedAtomIds: []
        }

        this.state = state
    }

    private parseAtoms (atoms: Epistle.ILineAtom[]): IAtomExchange[] {
        const oldParsedAtoms: IAtomExchange[] = this.state && this.state.parsedAtoms
        const parsedAtoms: IAtomExchange[] = atoms.map((atom: Epistle.ILineAtom, index: number): IAtomExchange => {
            const exchangeId: string = oldParsedAtoms.length && oldParsedAtoms[index]
                ? oldParsedAtoms[index].id
                : shortid.generate() as string

            return {
                id: exchangeId,
                atom
            }
        })
        return parsedAtoms
    }

    private updateLineByAtom (id: string, atom: Epistle.ILineAtom): void {
        const newLine: Epistle.IEpistleLine = {
            ...this.props.line,
            line: this.state.parsedAtoms.map((value: IAtomExchange): Epistle.ILineAtom => {
                if (value.id === id) {
                    return { ...atom }
                }
                return { ...value.atom }
            })
        }

        this.props.onLineChange(newLine)
    }

    private updateLineByAtomExchangeList (list: IAtomExchange[]): void {
        const newAtoms: Epistle.ILineAtom[] = list.map((value: IAtomExchange): Epistle.ILineAtom => ({ ...value.atom }))
        const newLine: Epistle.IEpistleLine = {
            ...this.props.line,
            line: newAtoms
        }

        this.props.onLineChange(newLine)
    }

    private insertAtomAfterAtomId (atom: Epistle.ILineAtom, predecessorId: string, predecessor: Epistle.ILineAtom): void {
        const newParsedAtoms: IAtomExchange[] = [...this.state.parsedAtoms]
        const newAtomExchange: IAtomExchange = {
            id: shortid.generate(),
            atom
        }
        const predecessorIndex: number = newParsedAtoms.findIndex((value: IAtomExchange) => value.id === predecessorId)
        const targetIndex: number = predecessorIndex >= 0
            ? predecessorIndex + 1
            : newParsedAtoms.length
        newParsedAtoms[predecessorIndex] = {
            id: predecessorId,
            atom: predecessor
        }
        newParsedAtoms.splice(targetIndex, 0, newAtomExchange)

        this.setState({
            parsedAtoms: newParsedAtoms,
            scheduledAtomUpdateIndex: targetIndex
        })
        this.updateLineByAtomExchangeList(newParsedAtoms)
    }

    private deleteAtom (id: string): void {
        let deletedIndex: number
        const newParsedAtoms: IAtomExchange[] = this.state.parsedAtoms.filter((value: IAtomExchange, index: number): boolean => {
            const isDeleted: boolean = value.id === id

            if (isDeleted) {
                deletedIndex = index
            }

            return !isDeleted
        })

        if (!newParsedAtoms.length) {
            return
        }

        this.setState({
            parsedAtoms: newParsedAtoms,
            scheduledAtomUpdateIndex: deletedIndex - 1
        })
        this.updateLineByAtomExchangeList(newParsedAtoms)
        this.updateAtomSelection(id)
    }

    private reportSelectedAtoms (ids: string[]): void {
        if (this.props.onAtomSelect) {
            const atoms: Epistle.ILineAtom[] = this.state.parsedAtoms.reduce((accumulator: Epistle.ILineAtom[], value: IAtomExchange): Epistle.ILineAtom[] => {
                if (ids.indexOf(value.id) >= 0 && value.atom.value) {
                    return [...accumulator, value.atom]
                }
                return accumulator
            }, [])

            this.props.onAtomSelect(atoms)
        }
    }

    private updateAtomSelection (id: string): void {
        this.setState((prevState: Readonly<IAtomSequenceState>, props: Readonly<IAtomSequenceProps>): IAtomSequenceState => {
            const currentIds = prevState.selectedAtomIds
            const selectedAtomIds: string[] = currentIds.indexOf(id) >= 0
                ? currentIds.filter(gotId => gotId !== id)
                : [...currentIds, id]

            this.reportSelectedAtoms(selectedAtomIds)
            return {
                ...prevState,
                selectedAtomIds
            }
        })
    }

    private setEditing (id: string) {
        if (this.state.editingAtomId !== id) {
            this.setState({ editingAtomId: id })
        }
    }

    private unsetEditing () {
        this.setState({ editingAtomId: '' })
    }

    private isAtomFirstInLine (id: string): boolean {
        const index: number = this.state.parsedAtoms.findIndex((value: IAtomExchange) => value.id === id)

        return index === 0
    }

    private getLastAtomExchange (): IAtomExchange {
        return this.state.parsedAtoms[this.state.parsedAtoms.length - 1]
    }

    private renderAtoms () {
        const onChange = (id: string, atom: Epistle.ILineAtom) => this.updateLineByAtom(id, atom) // update line
        const onClick = (id: string) => this.updateAtomSelection(id) // update atom selection
        const onSpace = (atom: Epistle.ILineAtom, id: string, tail: string) => { // insert new atom after this one
            const newAtom: Epistle.ILineAtom = {
                type: 'WORD',
                value: tail
            }
            this.insertAtomAfterAtomId(newAtom, id, atom)
        }
        const onDelete = (id: string) => this.deleteAtom(id) // delete current atom and focus on a previous one
        const onEnterEdit = (id: string) => this.setEditing(id)
        const onBlur = (id: string) => {
            if (this.state.editingAtomId === id) {
                this.unsetEditing()
            }
        }

        return this.state.parsedAtoms.map((atom: IAtomExchange) => {
            const props: IAtomProps = {
                id: atom.id,
                atom: atom.atom,
                selected: this.state.selectedAtomIds.indexOf(atom.id) >= 0,
                onChange,
                onClick,
                onSpace,
                onDelete,
                onEnterEdit,
                onBlur,
                editmode: this.state.editingAtomId === atom.id
            }

            return <LineAtom key={atom.id} {...props} />
        })
    }

    componentDidUpdate () {
        const indexToEdit: number = this.state.scheduledAtomUpdateIndex
        const atomExchangeList: IAtomExchange[] = this.state.parsedAtoms
        const state: IAtomSequenceState = { ...this.state }

        if (indexToEdit !== null) {
            state.scheduledAtomUpdateIndex = null
            state.editingAtomId = atomExchangeList[indexToEdit]
                ? atomExchangeList[indexToEdit].id
                : atomExchangeList[atomExchangeList.length - 1].id
        }

        this.setState(state)
    }

    componentWillReceiveProps (nextProps: IAtomSequenceProps): void {
        const parsedAtoms = this.parseAtoms(nextProps.line.line)

        this.setState({parsedAtoms})
    }

    componentWillMount () {
        if (this.props.line.line.length) {
            this.setState({ parsedAtoms: this.parseAtoms(this.props.line.line) })
        }
    }

    render () {
        const appendAtom = () => {
            const lastAtomExchange: IAtomExchange = this.getLastAtomExchange()
            const newAtom: Epistle.ILineAtom = {
                type: 'WORD',
                value: ''
            }
            this.insertAtomAfterAtomId(newAtom, lastAtomExchange.id, lastAtomExchange.atom)
        }

        return (
            <div className={this.props.className}>
                {this.renderAtoms()}
                <IconButton
                    color="primary"
                    aria-label="Add"
                    onClick={appendAtom}
                    className={this.props.classes.plusBtn}
                >
                    <AddIcon />
                </IconButton>
            </div>
        )
    }
}

export default withStyles(style)<IAtomSequenceProps>(AtomSequence)
