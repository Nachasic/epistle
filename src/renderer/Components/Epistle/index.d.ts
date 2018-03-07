declare namespace Epistle {
    export type TDeliveryType = 'ACCENTED' | 'NORMAL' | 'AGRESSIVE'

    export interface ILineAtom {
        type: 'WORD' | 'PAUSE' | 'INSERTION',
        value: string,
        pace?: 'X-SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'X-FAST'
        articulation?: 'WORD' | 'SYLLABLE' | 'LETTER',
        effect?: 'NONE' | 'BOUNCE' | 'STOMP'
    }

    export interface ILineInsertion {
        class: string,
        required?: boolean
    }

    export interface IEpistleLine {
        lineId: string,
        line: ILineAtom[],
        insertions?: ILineInsertion[],
        delivery?: TDeliveryType[]
    }
}
