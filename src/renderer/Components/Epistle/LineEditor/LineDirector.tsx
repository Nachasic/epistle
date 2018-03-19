import * as React from 'react'
import { Theme, withStyles, WithStyles } from 'material-ui/styles'
import TSContracts, { Precondition, Postcondition, assert } from '../../../TSContracts'

import i18n, { i18nGroup } from 'es2015-i18n-tag'
import Scopes from '../../../i18n/Scopes'

import Typography from 'material-ui/Typography'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'
import Grid from 'material-ui/Grid'

import * as styles from '../Styles/LineDirector.css'

// Errors
TSContracts.setupContractInterruptionCb((errorMsg: string) => { throw new Error(errorMsg) })
const ERR_REDUCED_ATOM_PRODUCTION: string = 'Failed to produce reduced atom interface properly'

interface ILineDirectorReducedProps {
    pace?: Epistle.TLineAtomPace | 'MULTIPLE',
    articulation?: Epistle.TLineAtomArticulation | 'MULTIPLE'
}

interface ILineDirectorProps {
    atoms: Epistle.ILineAtom[],
    onChange: (atoms: Epistle.ILineAtom[]) => any
}

interface ILineDirectorState {
    enabled: boolean,
    reducedAtom: ILineDirectorReducedProps
}

@i18nGroup(Scopes.LINE_EDITOR)
export default class LineDirector extends React.PureComponent<ILineDirectorProps, ILineDirectorState> {
    public props: ILineDirectorProps

    constructor (props: ILineDirectorProps) {
        super(props)

        this.state = {
            enabled: props.atoms.length > 0,
            reducedAtom: {}
        }
    }

    @Precondition((atoms: Epistle.ILineAtom[]) => assert(atoms.length >= 0, ERR_REDUCED_ATOM_PRODUCTION))
    private parseAtoms (atoms: Epistle.ILineAtom[]): ILineDirectorReducedProps {
        const reducedProps: ILineDirectorReducedProps = {
            pace: atoms[0].pace || 'NORMAL',
            articulation: atoms[0].articulation || 'PAIR'
        }

        return atoms.reduce((accumulator: ILineDirectorReducedProps, atom: Epistle.ILineAtom): ILineDirectorReducedProps => {
            if (atom.pace && atom.pace !== accumulator.pace) {
                accumulator.pace = 'MULTIPLE'
            }
            if (atom.articulation && atom.articulation !== accumulator.articulation) {
                accumulator.articulation = 'MULTIPLE'
            }
            return accumulator
        }, reducedProps)
    }

    private reportAtoms (reducedProps: ILineDirectorReducedProps): Epistle.ILineAtom[] {
        const atoms: Epistle.ILineAtom[] = this.props.atoms

        return atoms.map((atom: Epistle.ILineAtom): Epistle.ILineAtom => {
            const reportAtom: Epistle.ILineAtom = {
                type: atom.type,
                value: atom.value,
                pace: reducedProps.pace === 'MULTIPLE' ? atom.pace : reducedProps.pace,
                articulation: reducedProps.articulation === 'MULTIPLE' ? atom.articulation : reducedProps.articulation
            }

            return reportAtom
        })
    }

    componentDidMount () {
        const { atoms } = this.props
        const reducedAtom: ILineDirectorReducedProps = atoms.length ? this.parseAtoms(atoms) : {}

        this.setState({
            reducedAtom,
            enabled: atoms.length > 0
        })
    }

    componentWillReceiveProps (nextProps: ILineDirectorProps) {
        const { atoms } = nextProps
        const reducedAtom: ILineDirectorReducedProps = atoms.length ? this.parseAtoms(atoms) : {}

        this.setState({
            reducedAtom,
            enabled: atoms.length > 0
        })
    }

    render () {
        const { pace, articulation } = this.state.reducedAtom
        const setPace = (event, value: Epistle.TLineAtomPace) => {
            const newAtoms: Epistle.ILineAtom[] = this.reportAtoms({
                pace: value,
                articulation
            })

            this.props.onChange(newAtoms)
        }
        const setArticulation = (event, value: Epistle.TLineAtomArticulation) => {
            const newAtoms: Epistle.ILineAtom[] = this.reportAtoms({
                pace,
                articulation: value
            })

            this.props.onChange(newAtoms)
        }

        return (
            <Grid container>
                <Grid item xs={12} sm={6} >
                    <FormControl key="pace" component="fieldset">
                        <FormLabel component="legend">{i18n`Pacing`}</FormLabel>
                        <FormHelperText>{i18n`How fast do you want text to appear?`}</FormHelperText>
                        <RadioGroup
                            aria-label={i18n`Pacing`}
                            name="pacing"
                            value={pace}
                            onChange={setPace}
                        >
                            <FormControlLabel disabled={!this.state.enabled} value="X-FAST" control={<Radio className={styles.radio} />} label={i18n`Extra fast`} />
                            <FormControlLabel disabled={!this.state.enabled} value="FAST" control={<Radio className={styles.radio} />} label={i18n`Fast`} />
                            <FormControlLabel disabled={!this.state.enabled} value="NORMAL" control={<Radio className={styles.radio} />} label={i18n`Normal`} />
                            <FormControlLabel disabled={!this.state.enabled} value="SLOW" control={<Radio className={styles.radio} />} label={i18n`Slow`} />
                            <FormControlLabel disabled={!this.state.enabled} value="X-SLOW" control={<Radio className={styles.radio} />} label={i18n`Extra Slow`} />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl key="articulation" component="fieldset">
                        <FormLabel component="legend">{i18n`Articulation`}</FormLabel>
                        <FormHelperText>{i18n`The articulation in which text appears.`}</FormHelperText>
                        <RadioGroup
                            aria-label={i18n`Articulation`}
                            name="articulation"
                            value={articulation}
                            onChange={setArticulation}
                        >
                            <FormControlLabel disabled={!this.state.enabled} value="LETTER" control={<Radio className={styles.radio} />} label={i18n`Letter-by-letter`} />
                            <FormControlLabel disabled={!this.state.enabled} value="PAIR" control={<Radio className={styles.radio} />} label={i18n`By pairs of letters`} />
                            <FormControlLabel disabled={!this.state.enabled} value="WORD" control={<Radio className={styles.radio} />} label={i18n`By whole word`} />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }
}
