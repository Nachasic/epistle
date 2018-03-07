import * as React from 'react'
import Scopes from '../i18n/Scopes'
import { i18nGroup } from 'es2015-i18n-tag'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button';

@i18nGroup(Scopes.WELCOME_SCREEN)
export default class WelcomeScreen extends React.PureComponent<any, any> {
    public i18n: Function

    render () {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Button color="primary">{this.i18n`Create new project`}</Button>
                </Grid>
            </Grid>
        )
    }
}
