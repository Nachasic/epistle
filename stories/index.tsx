import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Line from '../src/renderer/Components/Epistle/Line'

const testLine: Epistle.IEpistleLine = {
    lineId: 'testLine',
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

storiesOf('Epistle line rendering component', module)
    .add('Hello World', () => <Line line={testLine} />)
