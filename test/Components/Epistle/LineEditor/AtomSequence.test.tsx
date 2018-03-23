import * as React from 'react'
import { shallow, mount } from 'enzyme'

import AtomSequence, { TPropsWithStyle as IAtomSequenceProps, IAtomExchange } from '../../../../src/renderer/Components/Epistle/LineEditor/AtomSequence'
import * as LineFixtures from '../Line.fixtures'
import { calculatePhraseBody } from '../Line.test'

import LineAtom from '../../../../src/renderer/Components/Epistle/LineEditor/LineAtom'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

describe('Line editor atom sequence tests', () => {
    it('should be OK', () => {
        expect(AtomSequence).toBeDefined()
    })

    describe('Basic line rendering', () => {
        let wrapper
        const changeCallback: Function = jest.fn()
        const atomSelectCallback: Function = jest.fn()
        const props: IAtomSequenceProps = {
            line: {
                lineId: 'BasicLine1',
                line: LineFixtures.basicLine
            },
            onLineChange: (line: Epistle.IEpistleLine) => changeCallback(line),
            onAtomSelect: (data: IAtomExchange[]) => atomSelectCallback(data),
            classes: {
                plusBtn: ''
            }
        }
        const lineBody: string = calculatePhraseBody(props.line)

        beforeEach(() => {
            wrapper = mount(<AtomSequence {...props} />)
        })

        it('should render atoms for given line', () => {
            const atoms = wrapper.find(LineAtom)

            expect(atoms.length).toEqual(props.line.line.length)
        })

        it('present a whole phrase via atoms', () => {
            const atoms = wrapper.find(LineAtom)
            const gotPhrase = atoms.map(item => item.props().atom.value).join(' ')

            expect(gotPhrase).toEqual(lineBody)
        })

        it('should render "add new atom" button at the end', () => {
            const addAtomBtn = wrapper.find(IconButton)

            expect(addAtomBtn.length).toEqual(1)
        })
    })

    describe('Line editing', () => {
        let wrapper
        const changeCallback: jest.Mock<any> = jest.fn()
        const atomSelectCallback: jest.Mock<any> = jest.fn()
        const props: IAtomSequenceProps = {
            line: {
                lineId: 'BasicLine2',
                line: LineFixtures.basicLine
            },
            onLineChange: (line: Epistle.IEpistleLine) => changeCallback(line),
            onAtomSelect: (data: IAtomExchange[]) => atomSelectCallback(data),
            classes: {
                plusBtn: ''
            }
        }
        const lineBody: string = calculatePhraseBody(props.line)

        beforeAll(() => {
            wrapper = mount(<AtomSequence {...props} />)
        })

        beforeEach(() => {
            wrapper.setProps({
                ...props,
                line: {
                    lineId: 'BasicLine2',
                    line: LineFixtures.basicLine
                }
            })
            changeCallback.mockReset()
            atomSelectCallback.mockReset()
        })

        it('should create new atom when + button is pressed', () => {
            const addAtomBtn = wrapper.find(IconButton)
            const expectedLineUpdate: Epistle.IEpistleLine = {
                ...props.line,
                line: [
                    ...props.line.line,
                    {
                        type: 'WORD',
                        value: ''
                    }
                ]
            }

            addAtomBtn.simulate('click')
            const atoms = wrapper.find(LineAtom)
            expect(changeCallback).toHaveBeenCalledWith(expectedLineUpdate)
            expect(atoms.length).toEqual(expectedLineUpdate.line.length)
        })

        it('should register line changes', () => {
            const lastAtom = wrapper.findWhere(n =>
                n.props().atom === props.line.line[props.line.line.length - 1]).last()
            const newAtoms: Epistle.ILineAtom[] = [...props.line.line]
            const TEST_VALUE: string = 'TEST'
            newAtoms[newAtoms.length - 1] = {
                type: 'WORD',
                pace: 'SLOW',
                value: TEST_VALUE
            }
            const expectedLineUpdate: Epistle.IEpistleLine = {
                ...props.line,
                line: newAtoms
            }
            lastAtom.simulate('doubleclick')

            const inputField = wrapper.find('input[type="text"]')

            inputField.simulate('change', { target: { value: TEST_VALUE } })

            expect(changeCallback).toHaveBeenLastCalledWith(expectedLineUpdate)
        })

        it('should remove atom with backspace while editing, if the value is empty', () => {
            const lastAtom = wrapper.findWhere(n =>
                n.props().atom === props.line.line[props.line.line.length - 1]).last()
            const firstAtom = wrapper.find(LineAtom).first()
            const newAtoms: Epistle.ILineAtom[] = [...props.line.line]
            newAtoms.pop()
            const expectedLineUpdate: Epistle.IEpistleLine = {
                ...props.line,
                line: newAtoms
            }
            const updatedLine: Epistle.IEpistleLine = {
                ...props.line,
                line: [...newAtoms, {
                    type: 'WORD',
                    pace: 'SLOW',
                    value: ''
                }]
            }

            lastAtom.simulate('doubleclick')

            const inputField = wrapper.find('input[type="text"]')

            inputField.simulate('change', { target: { value: '' } })

            expect(changeCallback).toHaveBeenCalledWith(updatedLine)

            wrapper.setProps({
                ...props,
                line: updatedLine
            })
            inputField.simulate('blur')

            expect(changeCallback).toHaveBeenLastCalledWith(expectedLineUpdate)
        })

        it('should create new atom once you enter a space while editing existing atom', () => {
            const lastAtom = wrapper.find(LineAtom).last()
            const updatedLine: Epistle.IEpistleLine = {
                ...props.line,
                line: [...props.line.line, {
                    type: 'WORD',
                    value: 'test'
                }]
            }

            lastAtom.simulate('doubleclick')

            const inputField = wrapper.find('input[type="text"]')

            inputField.simulate('change', { target: { value: 'World! test' } })

            expect(changeCallback).toHaveBeenCalledWith(updatedLine)
        })
    })

    describe('Line atoms selection', () => {
        let wrapper
        let firstAtom
        const changeCallback: jest.Mock<any> = jest.fn()
        const atomSelectCallback: jest.Mock<any> = jest.fn()
        const props: IAtomSequenceProps = {
            line: {
                lineId: 'BasicLine2',
                line: LineFixtures.basicLine
            },
            onLineChange: (line: Epistle.IEpistleLine) => changeCallback(line),
            onAtomSelect: (data: IAtomExchange[]) => atomSelectCallback(data),
            classes: {
                plusBtn: ''
            }
        }
        const lineBody: string = calculatePhraseBody(props.line)

        beforeAll(() => {
            wrapper = mount(<AtomSequence {...props} />)
            firstAtom = wrapper.find(LineAtom).first()
            jest.useFakeTimers()
        })

        afterEach(() => {
            atomSelectCallback.mockReset()
        })

        it('should select atoms on click and report selection', () => {
            const expectedReport: Epistle.ILineAtom = props.line.line[0]
            const numberOfCalls = atomSelectCallback.mock.calls.length

            firstAtom.simulate('click')
            jest.runAllTimers()

            const gotReport = atomSelectCallback.mock.calls[0][0][0].atom
            expect(gotReport).toEqual(expectedReport)
        })

        it('should deselect selected atoms and report new selection', () => {
            const expectedReport: Epistle.ILineAtom[] = []

            firstAtom.simulate('click')
            jest.runAllTimers()

            expect(atomSelectCallback).toHaveBeenCalledWith(expectedReport)
        })
    })
})
