import * as React from 'react'

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

}

export default class AtomSequence extends React.PureComponent<IAtomSequenceProps, IAtomSequenceState> {
    public props: IAtomSequenceProps

    constructor (props: IAtomSequenceProps) {
        super(props)
    }

    render () {
        return null
    }
}
