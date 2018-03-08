import * as React from 'react'
import Scopes from '../i18n/Scopes'
import { i18nGroup } from 'es2015-i18n-tag'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import HelloWorld from '../Components/HelloWorld'
import Line from '../Components/Epistle/Line'

@i18nGroup(Scopes.WELCOME_SCREEN)
export default class WelcomeScreen extends React.PureComponent<any, any> {
    public i18n: Function

    render () {
        const line: Epistle.IEpistleLine = {
            lineId: '67',
            line: [
                {
                    type: 'WORD',
                    value: 'Hello,',
                    pace: 'SLOW'
                },
                {
                    type: 'WORD',
                    value: 'World!',
                    pace: 'SLOW'
                }
            ]
        }
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Line line={line} />
                    <Button color="primary">{this.i18n`I am a localized button!`}</Button>
                    <HelloWorld name="Nachasic" />
                </Grid>
            </Grid>
        )
    }
}
