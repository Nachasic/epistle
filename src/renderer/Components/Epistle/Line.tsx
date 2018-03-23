import * as React from 'react'
import * as shortid from 'shortid'
import * as styles from './Styles/Line.css'

export const paceMappings = new Map<Epistle.TLineAtomPace, number> ([
    ['X-SLOW', 1000],
    ['SLOW', 500],
    ['NORMAL', 250],
    ['FAST', 125],
    ['X-FAST', 50]
])

export interface ILineProps {
    line: Epistle.IEpistleLine,
    ref?: (line: Line) => any,
    done?: () => any
}

interface ILineState {
    queue: Epistle.TLineExecutionQueue | null,
    pause: boolean,
    queueProgress: number
}

export default class Line extends React.PureComponent<ILineProps, ILineState> {
    private tick
    public props: ILineProps

    constructor (props: ILineProps) {
        super(props)
        this.state = {
            queue: props.line ? Line.ParseLine(props.line.line) : null,
            pause: false,
            queueProgress: 0
        }
    }

    private MakeTick (): void {
        const { queueProgress, pause, queue } = this.state
        let timeout: number
        const lineLength = queue.length

        clearTimeout(this.tick)

        if (queueProgress < lineLength - 1 && !pause) {
            timeout = queue[queueProgress + 1].timeout
            this.setState({
                queueProgress: queueProgress + 1
            })

            this.tick = setTimeout(this.MakeTick.bind(this), timeout)
        } else if (queueProgress === lineLength - 1 && !pause) {
            this.setState({
                pause: true
            })

            if (this.props.done) {
                this.props.done()
            }
        }
    }

    /**
     * Converts a series of line atoms into execution queue.
     * 
     * @param atoms ILineAtom[]
     * @returns TLineExecutionQueue 
     */
    public static ParseLine (atoms: Epistle.ILineAtom[]): Epistle.TLineExecutionQueue {
        const breakWord = (word: string, mode: Epistle.TLineAtomArticulation = 'PAIR'): string[] => {
            if (!word.length) {
                return []
            }

            if (word.length === 1) {
                return [word]
            }

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

        return atoms.reduce((accumulator: Epistle.TLineExecutionQueue, atom: Epistle.ILineAtom, index: number) => {
            let bodies: Epistle.TLineExecutionQueue = []
            const spaceOperation: Epistle.ILineExecutionOperation = {
                key: shortid.generate() as string,
                timeout: paceMappings.get(atom.pace),
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

                if (index !== atoms.length - 1) {
                    bodies.push(spaceOperation)
                }

                return [...accumulator, ...bodies]
            }
            // TODO: Implement insertions
            // if (atom.type === 'PAUSE') {
            const pause: Epistle.ILineExecutionOperation = {
                key: shortid.generate() as string,
                timeout: paceMappings.get('X-SLOW'),
                effect: 'NONE',
                body: ''
            }
            return [...accumulator, pause]
        }, [])
    }

    public TogglePause () {
        clearTimeout(this.tick)

        this.setState({
            pause: !this.state.pause
        })
    }

    public Replay () {
        this.setState({
            queueProgress: 0,
            pause: false
        })
        clearTimeout(this.tick)
        this.tick = setTimeout(this.MakeTick.bind(this), 100)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.line) {
            this.setState({
                queue: Line.ParseLine(nextProps.line.line),
            })

            this.Replay()
        }
    }

    componentDidMount () {
        this.Replay()
    }

    renderQueue () {
        const queue: Epistle.TLineExecutionQueue = this.state.queue
        const progress: number = this.state.queueProgress

        return queue.map((operation: Epistle.ILineExecutionOperation, index: number) =>
            <span
                className={index <= progress
                    ? styles[`effect-${operation.effect}`] + styles.VISIBLE
                    : styles[`effect-${operation.effect}`]}
                key={operation.key}
            >
                {operation.body}
            </span>
        )
    }

    render () {
        return <p className={styles.line}>{this.renderQueue()}</p>
    }
}
