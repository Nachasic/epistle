import * as React from 'react'
import { Theme, withStyles, WithStyles } from 'material-ui/styles'

import Typography from 'material-ui/Typography'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'
import Grid from 'material-ui/Grid'

const styles = (theme: Theme) => ({
    radio: {
        width: '36px',
        height: '36px'
    }
})
interface ILineDirectorProps {

}

export type TPropsWithStyles = ILineDirectorProps & WithStyles<'radio'>

interface ILineDirectorState {

}

// TODO: Implement theming https://material-ui-next.com/guides/typescript/

export class LineDirector extends React.PureComponent<TPropsWithStyles, ILineDirectorState> {
    public props: TPropsWithStyles

    constructor (props: TPropsWithStyles) {
        super(props)
    }

    render () {
        const { classes } = this.props

        return (
            <Grid container>
                <Grid item xs={12} sm={6} >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Pacing</FormLabel>
                        <RadioGroup
                            aria-label="pacing"
                            name="pacing"
                            value="NORMAL"
                        >
                            <FormControlLabel value="X-FAST" control={<Radio className={classes.radio} />} label="Extra fast" />
                            <FormControlLabel value="FAST" control={<Radio className={classes.radio} />} label="Fast" />
                            <FormControlLabel value="NORMAL" control={<Radio className={classes.radio} />} label="Normal" />
                            <FormControlLabel value="SLOW" control={<Radio className={classes.radio} />} label="Slow" />
                            <FormControlLabel value="X-SLOW" control={<Radio className={classes.radio} />} label="Extra Slow" />
                        </RadioGroup>
                        <FormHelperText>How fast do you want text to appear?</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Articulation</FormLabel>
                        <RadioGroup
                            aria-label="articulation"
                            name="articulation"
                            value="PAIR"
                        >
                            <FormControlLabel value="LETTER" control={<Radio className={classes.radio} />} label="Letter-by-letter" />
                            <FormControlLabel value="PAIR" control={<Radio className={classes.radio} />} label="By pairs of letters" />
                            <FormControlLabel value="WORD" control={<Radio className={classes.radio} />} label="By whole word" />
                        </RadioGroup>
                        <FormHelperText>The articulation in which text appears.</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)<ILineDirectorProps>(LineDirector)
