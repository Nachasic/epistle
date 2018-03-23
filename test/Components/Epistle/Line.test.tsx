/* global describe, it, expect */
/* tslint disable one-variable-per-declaration */
import * as React from 'react'
import { shallow } from 'enzyme'

import Line, { paceMappings } from '../../../src/renderer/Components/Epistle/Line'
import * as Fixtures from './Line.fixtures'

export const calculatePhraseBody = (phrase: Epistle.IEpistleLine): string =>
phrase.line
    .filter((atom: Epistle.ILineAtom) => atom.type === 'WORD')
    .map((atom: Epistle.ILineAtom, index: number) => atom.value)
    .join(' ')

describe('<Line> component tests', () => {
    it('should be okay', () => {
        expect(Line).toBeDefined()
    })

    describe('Line parser tests', () => {
        it('should have line parser static method', () => {
            expect(Line.ParseLine).toBeInstanceOf(Function)
        })

        it('should parse basic lines', () => {
            const parsedLine = Line.ParseLine(Fixtures.basicLine)

            expect(parsedLine.length).toEqual(Fixtures.basicLineParsed.length)

            for (const index in parsedLine) {
                if (parsedLine[index]) {
                    const gotOperation: Epistle.ILineExecutionOperation = parsedLine[index]
                    const expectedOperation: Epistle.ILineExecutionOperation =
                        Fixtures.basicLineParsed[index](gotOperation.key)

                    expect(gotOperation).toEqual(expectedOperation)
                }
            }
        })
    })

    describe('Line rendering', () => {
        const calculateDelay = (phrase: Epistle.IEpistleLine): number => {
            const parsedPhrase: Epistle.TLineExecutionQueue = Line.ParseLine(phrase.line)

            return parsedPhrase.reduce((accumulator: number, operation: Epistle.ILineExecutionOperation) => {
                return accumulator + operation.timeout
            }, 0)
        }

        const testPhrase: Epistle.IEpistleLine = Fixtures.slowPhrase
        let wrapper

        beforeEach(() => {
            wrapper = shallow(<Line line={testPhrase} />)
            jest.useFakeTimers()
        })

        afterEach(jest.clearAllTimers)

        it('should render the phrase', () => {
            const expectedText: string = calculatePhraseBody(testPhrase)
            const gotText: string = wrapper.text()

            expect(gotText).toEqual(expectedText)
        })

        it('should begin with a ready-to-update state', () => {
            const state = wrapper.state()
            const gotQueue: Epistle.TLineExecutionQueue = state.queue
            const gotProgress: number = state.queueProgress
            const expectedQueue: Epistle.TLineExecutionQueue = Line.ParseLine(testPhrase.line)
            const expectedProgress: number = 0

            expect(gotProgress).toEqual(expectedProgress)
            // Cannot test for equality of queues since random hash ID's are generated
            expect(gotQueue.length).toEqual(expectedQueue.length)
        })

        it('should end up in a updated state after a delay', () => {
            const expectedDelay: number = calculateDelay(testPhrase)

            const checkState = () => {
                const { queue, queueProgress } = wrapper.state()

                expect(queueProgress + 1).toEqual(queue.length)
                expect(setTimeout).toHaveBeenCalledTimes(queueProgress)
            }

            jest.runAllTimers() // We gotta go back to the FUTURE
            checkState()
        })
    })
})
