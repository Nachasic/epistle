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
    editingAtomId: string,
    parsedAtoms: IAtomExchange[],
    selectedAtomIds: string[]
}

export default class AtomSequence extends React.PureComponent<IAtomSequenceProps, IAtomSequenceState> {
    public props: IAtomSequenceProps

    constructor (props: IAtomSequenceProps) {
        super(props)

        const state: IAtomSequenceState = {
            editingAtomId: '',
            parsedAtoms: [],
            selectedAtomIds: []
        }

        if (props.line.line.length) {
            state.parsedAtoms = this.parseAtoms(props.line.line)
        }

        this.state = state
    }

    private parseAtoms (atoms: Epistle.ILineAtom[]): IAtomExchange[] {
        const parsedAtoms: IAtomExchange[] = atoms.map((atom: Epistle.ILineAtom): IAtomExchange => ({
            id: shortid.generate() as string,
            atom
        }))

        return parsedAtoms
    }

    // private updateLine (): void {
    //     // gather the changes in atoms and update line
    //     return
    // }

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

    // private insertNewAtomAfterId (id: string, tail: string): void {
    //     // catch a tail into a new atom
    //     // insert new atom
    //     // update state.editingAtomId
    //     this.updateLine()
    // }

    private renderAtoms () {
        const onChange = () => null // update line
        const onClick = (id: string) => this.updateAtomSelection(id) // update atom selection
        const onSpace = () => null // insert new atom after current one
        const onDelete = () => null // delete current atom and focus on a previous one
        const onEnterEdit = () => null
        const onEnterView = () => null

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
                onEnterView
            }

            return <LineAtom key={atom.id} {...props} />
        })
    }

    shouldComponentUpdate (nextProps: Readonly<IAtomSequenceProps>, nextState: Readonly<IAtomSequenceState>): boolean {
        const differentProps: boolean = nextProps.line !== this.props.line
            || nextProps.onAtomSelect !== this.props.onAtomSelect
            || nextProps.onLineChange !== this.props.onLineChange
        const differentState: boolean = nextState.selectedAtomIds.join(' ') !== this.state.selectedAtomIds.join(' ')
            || nextState.parsedAtoms !== this.state.parsedAtoms
            || nextState.editingAtomId !== this.state.editingAtomId

        return differentProps || differentState
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
