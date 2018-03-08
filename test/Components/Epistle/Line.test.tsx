/* global describe, it, expect */

import * as React from 'react'
import Line from '../../../src/renderer/Components/Epistle/Line'
import * as Fixtures from './Line.fixtures'

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
})
