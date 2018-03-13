import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from '@dump247/storybook-state'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Markdown from 'markdown-to-jsx'
import '../../../src/renderer/Stylesheets/fonts.scss'

import * as Descriptions from './LineEditor.descriptions'

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

const mdOptions = {
    overrides: {
        h1: {
            component: Typography,
            props: {
                variant: 'headline',
                gutterBottom: true
            }
        },
        h2: {
            component: Typography,
            props: {
                variant: 'title',
                gutterBottom: true
            }
        },
        h3: {
            component: Typography,
            props: {
                variant: 'subheading',
                gutterBottom: true
            }
        },
        h4: {
            component: Typography,
            props: {
                variant: 'caption',
                gutterBottom: true
            }
        }
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
        selected: false,
        atom: {
            type: 'WORD',
            value: 'helloworld'
        }
    }, (store) => {
        const clickCallback = (id: string) => {
            store.set({
                selected: !store.state.selected
            })
            return action(store.state.selected ? 'selected' : 'deselected')(id)
        }
        const changeCallback = (atom: Epistle.ILineAtom) => {
            store.set({ atom })
            return action('atom-changed')(atom)
        }
        const spaceCallback = (tail: string) => action('Thrown tail')(tail)

        return beautifulWrapping(
            <LineAtom
                {...store.state}
                onChange={changeCallback}
                onClick={clickCallback}
                onSpace={spaceCallback}
                onDelete={action('atom-deleted')}
                id="testline1"
            />,
            'Line atom',
            <Markdown
                options={mdOptions}
                children={Descriptions.singleAtom}
            />
        )
    }))
