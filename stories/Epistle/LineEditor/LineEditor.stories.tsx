import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from '@dump247/storybook-state'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import '../../../src/renderer/Stylesheets/fonts.scss'

import LineAtom, { ILineEditorAtomProps as IAtomProps} from '../../../src/renderer/Components/Epistle/LineEditor/LineAtom'

const styles = {
    root: {
        flexGrow: 1,
        fontFamily: 'Roboto'
    },
    paper: {
        padding: '16px'
    },
    demo: {
        padding: '16px',
        textAlign: 'center',
        backgroundColor: '#eee',
        fontSize: '1.5em',
        fontFamily: 'monospace'
    }
}

const beautifulWrapping = (element, header, annotation) =>
    <div style={styles.root}>
        <Grid container spacing={16}>
            <Grid item xs={12}>
                <Paper style={styles.paper}>
                    <Typography variant="display1" gutterBottom>{header}</Typography>
                    <Typography gutterBottom noWrap>
                        {annotation}
                    </Typography>
                    <div style={styles.demo}>
                        {element}
                    </div>
                </Paper>
            </Grid>
        </Grid>
    </div>

storiesOf('Epistle line editor components', module)
    .add('Line atom', withState<any>({
        atom: {
            type: 'WORD',
            value: 'helloworld'
        }
    }, (store) => {
        const changeCallback = (atom: Epistle.ILineAtom) => {
            store.set({ atom })
            action('atom-changed')
        }
        return beautifulWrapping(
            <LineAtom
                {...store.state}
                onChange={changeCallback}
                onClick={action('clicked')}
                onDelete={action('atom-deleted')}
                id="testline1"
            />,
            'Line atom',
            <p>
            A sigle atom of the Epistle line, usually represents a single word or a pause.<br/>
            On click it should just report that it's clicked.<br/>
            On double click it should allow user to edit the body.<br/>
            </p>
        )
    }))
