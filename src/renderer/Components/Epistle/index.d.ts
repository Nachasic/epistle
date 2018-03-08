declare namespace Epistle {
    export type TDeliveryType = 'ACCENTED' | 'NORMAL' | 'AGRESSIVE'
    export type TLineAtomType = 'WORD' | 'PAUSE' | 'INSERTION'
    export type TLineAtomPace = 'X-SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'X-FAST'
    export type TLineAtomArticulation = 'WORD' | 'PAIR' | 'LETTER'
    export type TLineAtomEffect = 'NONE' | 'BOUNCE' | 'STOMP'

    export interface ILineAtom {
        type: TLineAtomType,
        value: string,
        pace?: TLineAtomPace,
        articulation?: TLineAtomArticulation,
        effect?: TLineAtomEffect
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

    export interface ILineExecutionOperation {
        key: string,
        timeout: number,
        effect: TLineAtomEffect,
        body: string
    }
    
    export type TLineExecutionQueue = ILineExecutionOperation[]
}
