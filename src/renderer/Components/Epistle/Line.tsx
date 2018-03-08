import * as React from 'react'
import * as shortid from 'shortid'

const paceMappings = new Map<Epistle.TLineAtomPace, number> ([
    ['X-SLOW', 1000],
    ['SLOW', 500],
    ['NORMAL', 250],
    ['FAST', 125],
    ['X-FAST', 50]
])

export interface ILineProps {
    line: Epistle.IEpistleLine
}

export default class Line extends React.PureComponent<ILineProps, {}> {
    public props: ILineProps

    constructor (props: ILineProps) {
        super(props)
    }

    public static ParseLine (atoms: Epistle.ILineAtom[]): Epistle.TLineExecutionQueue {
        const breakWord = (word: string, mode: Epistle.TLineAtomArticulation = 'PAIR'): string[] => {
            switch (mode) {
            case 'WORD':
                return [word]
            case 'PAIR':
                return word.length % 2 === 0
                    ? word.match(/\S{2}/g)
                    : [...word.match(/\S{2}/g), word[word.length - 1]]
            case 'LETTER':
                return word.match(/\S/g)
            }
        }

        return atoms.reduce((accumulator, atom) => {
            let bodies: Epistle.TLineExecutionQueue = []
            const spaceOperation: Epistle.ILineExecutionOperation = {
                key: shortid.generate() as string,
                timeout: 250,
                effect: 'NONE',
                body: ' '
            }

            if (atom.type === 'WORD') {
                bodies = breakWord(atom.value, atom.articulation)
                    .map((value) => {
                        const operation: Epistle.ILineExecutionOperation = {
                            key: shortid.generate() as string,
                            timeout: paceMappings.get(atom.pace),
                            effect: atom.effect || 'NONE',
                            body: value
                        }

                        return operation
                    })

                return [...accumulator, ...bodies, spaceOperation]
            }
            // TODO: Implement insertions
            // if (atom.type === 'PAUSE') {
            const operations: Epistle.ILineExecutionOperation = {
                key: shortid.generate() as string,
                timeout: paceMappings.get('X-SLOW'),
                effect: 'NONE',
                body: ''
            }
            return [operations]
        }, [])
    }

    render () {
        return <p>Hey pal</p>
    }
}
