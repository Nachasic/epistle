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
        timeout: 250,
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
    }),
    (hashId: string): Epistle.ILineExecutionOperation => ({
        key: hashId,
        timeout: 250,
        effect: 'NONE',
        body: ' '
    })
]
