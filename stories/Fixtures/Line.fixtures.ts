export const testLine: Epistle.IEpistleLine = {
    lineId: 'testLine',
    line: [
        {
            type: 'WORD',
            value: 'Hello,',
            pace: 'FAST'
        },
        {
            type: 'WORD',
            value: 'World!',
            articulation: 'LETTER',
            pace: 'SLOW'
        }
    ]
}

export const surprisedLine: Epistle.IEpistleLine = {
    lineId: 'surprisedLine',
    line: [
        {
            type: 'WORD',
            value: 'Holy',
            pace: 'NORMAL',
            articulation: 'PAIR'
        },
        {
            type: 'WORD',
            value: 'SHIT...',
            pace: 'SLOW',
            articulation: 'LETTER'
        },
        {
            type: 'PAUSE',
            value: '',
            pace: 'SLOW'
        },
        {
            type: 'WORD',
            value: 'Is',
            pace: 'X-FAST',
            articulation: 'LETTER'
        },
        {
            type: 'WORD',
            value: 'this',
            pace: 'X-FAST',
            articulation: 'LETTER'
        },
        {
            type: 'WORD',
            value: 'for',
            pace: 'X-FAST',
            articulation: 'LETTER'
        },
        {
            type: 'WORD',
            value: 'real?',
            pace: 'X-FAST',
            articulation: 'LETTER'
        },
        {
            type: 'PAUSE',
            value: '',
            pace: 'SLOW'
        },
        {
            type: 'WORD',
            value: 'Fuck!',
            pace: 'X-FAST',
            articulation: 'WORD'
        }
    ]
}
