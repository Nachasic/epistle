import * as React from 'react'

import Line from '../Line'
import AtomSequence from './AtomSequence'
import LineDirector from './LineDirector'

import Grid from 'material-ui/Grid'
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    ExpansionPanelActions
  } from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Replay from 'material-ui-icons/Replay'

import * as styles from '../Styles/LineEditor.css'

export interface ILineEditorProps {
    line: Epistle.IEpistleLine,
    children?: string,
    onChange: (line: Epistle.IEpistleLine) => any
}

interface ILineEditorState {
    editingAtoms: Epistle.ILineAtom[],
    mode: 'ATOMS' | 'LINE' | 'PREVIEW'
}

export default class LineEditor extends React.PureComponent<ILineEditorProps, ILineEditorState> {
    public props: ILineEditorProps

    constructor (props: ILineEditorProps) {
        super(props)

        this.state = {
            editingAtoms: [],
            mode: 'LINE'
        }
    }

    private ReportLine (line: Epistle.IEpistleLine): void {
        this.props.onChange(line)
    }

    render () {
        const handleLineSequenceChange = (line: Epistle.IEpistleLine) => this.ReportLine(line)
        const handleAtomSelectionChange = () => null
        const handleAtomDirectionChange = () => null
        const replayBtnHandler = (event: React.MouseEvent<HTMLButtonElement>): boolean => {
            event.preventDefault()
            linePreview.Replay()
            return false
        }
        let linePreview: Line

        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Line ref={(component) => linePreview = component} line={this.props.line} />
                    </ExpansionPanelSummary>
                    <Divider />
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={12} className={styles.sequenceEditor}>
                                <AtomSequence
                                    className={styles.sequence}
                                    line={this.props.line}
                                    onLineChange={handleLineSequenceChange}
                                    onAtomSelect={handleAtomSelectionChange}
                                />
                                <IconButton className={styles.replayBtn} onClick={replayBtnHandler}><Replay /></IconButton>
                            </Grid>
                            <Divider />
                            <Grid item xs={12}>
                                <LineDirector
                                    atoms={[]}
                                    onChange={handleAtomDirectionChange}
                                />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}
