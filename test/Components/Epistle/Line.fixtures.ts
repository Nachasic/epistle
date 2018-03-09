export const basicLine: Epistle.ILineAtom[] = [
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

export const basicLineParsed = [
    (hashId: string): Epistle.ILineExecutionOperation => ({
        key: hashId,
        timeout: 500,
        effect: 'NONE',
        body: 'He'
    }),
    (hashId: string): Epistle.ILineExecutionOperation => ({
        key: hashId,
        timeout: 500,
        effect: 'NONE',
        body: 'll'
    }),
    (hashId: string): Epistle.ILineExecutionOperation => ({
        key: hashId,
        timeout: 500,
        effect: 'NONE',
        body: 'o,'
    }),
    (hashId: string): Epistle.ILineExecutionOperation => ({
        key: hashId,
        timeout: 500,
        effect: 'NONE',
        body: ' '
    }),
    (hashId: string): Epistle.ILineExecutionOperation => ({
        key: hashId,
        timeout: 500,
        effect: 'NONE',
        body: 'Wo'
    }),
    (hashId: string): Epistle.ILineExecutionOperation => ({
        key: hashId,
        timeout: 500,
        effect: 'NONE',
        body: 'rl'
    }),
    (hashId: string): Epistle.ILineExecutionOperation => ({
        key: hashId,
        timeout: 500,
        effect: 'NONE',
        body: 'd!'
    })
]

export const slowPhrase: Epistle.IEpistleLine = {
    lineId: 'slowPhrase',
    line: [
        {
            type: 'WORD',
            value: 'I',
            pace: 'X-SLOW'
        },
        {
            type: 'WORD',
            value: 'GOT',
            articulation: 'LETTER',
            pace: 'SLOW'
        },
        {
            type: 'WORD',
            value: 'a',
            pace: 'NORMAL'
        },
        {
            type: 'WORD',
            value: 'big',
            articulation: 'LETTER',
            pace: 'FAST'
        },
        {
            type: 'PAUSE',
            value: '',
            pace: 'SLOW'
        },
        {
            type: 'WORD',
            value: 'crab',
            articulation: 'WORD',
            pace: 'SLOW'
        }
    ]
}
