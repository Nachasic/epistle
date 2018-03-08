import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography';
import '../src/renderer/Stylesheets/fonts.scss'

import Line from '../src/renderer/Components/Epistle/Line'
import * as Fixtures from './Fixtures/Line.fixtures'

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

storiesOf('Epistle line rendering component', module)
    .add('Hello World', () => beautifulWrapping(
        <Line line={Fixtures.testLine} />,
        'Basic case',
        `
            An example of basic usage with no effects and simple direction.
        `
    ))

    .add('Pace direction and pauses', () => beautifulWrapping(
        <Line line={Fixtures.surprisedLine} />,
        'Pacing direction and pauses',
        `
            Epistle dialogue format allows for control of pacing
            for the delivery of each line.
        `
    ))