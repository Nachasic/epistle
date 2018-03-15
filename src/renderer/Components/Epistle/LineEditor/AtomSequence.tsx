import * as React from 'react'
import * as shortid from 'shortid'

import LineAtom, { ILineEditorAtomProps as IAtomProps } from './LineAtom'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'

import * as styles from '../Styles/AtomSequence.css'

export interface IAtomSequenceProps {
    line: Epistle.IEpistleLine,
    onLineChange: (line: Epistle.IEpistleLine) => any,
    onAtomSelect: (selectedAtoms: IAtomExchange[]) => any
}

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

export default class AtomSequence extends React.PureComponent<IAtomSequenceProps, IAtomSequenceState> {
    public props: IAtomSequenceProps

    constructor (props: IAtomSequenceProps) {
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

    private updateAtomSelection (id: string): void {
        this.setState((prevState: Readonly<IAtomSequenceState>, props: IAtomSequenceProps): IAtomSequenceState => {
            const currentIds = prevState.selectedAtomIds
            const selectedAtomIds: string[] = currentIds.indexOf(id) >= 0
                ? currentIds.filter(gotId => gotId !== id)
                : [...currentIds, id]

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

    private renderAtoms () {
        const onChange = (id: string, atom: Epistle.ILineAtom) => this.updateLineByAtom(id, atom) // update line
        const onClick = (id: string) => this.updateAtomSelection(id) // update atom selection
        const onSpace = (atom: Epistle.ILineAtom, id: string, tail: string) => {
            const newAtom: Epistle.ILineAtom = {
                type: 'WORD',
                value: tail
            }
            this.insertAtomAfterAtomId(newAtom, id, atom)
        } // insert new atom after current one
        const onDelete = (id: string) => null // delete current atom and focus on a previous one
        const onEnterEdit = (id: string) => this.setEditing(id)
        // const onEnterView = this.unsetEditing.bind(this) // this.setState({ editingAtomId: '' })

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
                // onEnterView,
                editmode: this.state.editingAtomId === atom.id
            }

            return <LineAtom key={atom.id} {...props} />
        })
    }

    componentDidUpdate () {
        const indexToEdit: number = this.state.scheduledAtomUpdateIndex
        const atomExchangeList: IAtomExchange[] = this.state.parsedAtoms

        if (indexToEdit !== null) {
            this.setState({
                scheduledAtomUpdateIndex: null,
                editingAtomId: atomExchangeList[indexToEdit]
                    ? atomExchangeList[indexToEdit].id
                    : atomExchangeList[atomExchangeList.length - 1].id
            })
        }
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
        const appendAtom = () => null

        return (
            <div>
                {this.renderAtoms()}
                <span className={styles.plusBtn}>
                    <IconButton
                        color="primary"
                        aria-label="Add"
                        onClick={appendAtom}
                    >
                        <AddIcon />
                    </IconButton>
                </span>
            </div>
        )
    }
}
