import * as React from 'react'
import { shallow, mount } from 'enzyme'

import AtomSequence, { IAtomSequenceProps, IAtomExchange } from '../../../../src/renderer/Components/Epistle/LineEditor/AtomSequence'
import * as LineFixtures from '../Line.fixtures'
import { calculatePhraseBody } from '../Line.test'

import LineAtom from '../../../../src/renderer/Components/Epistle/LineEditor/LineAtom'
import IconButton from 'material-ui/IconButton'

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
            onAtomSelect: (data: IAtomExchange[]) => atomSelectCallback(data)
        }
        const lineBody: string = calculatePhraseBody(props.line)

        beforeEach(() => {
            wrapper = shallow(<AtomSequence {...props} />)
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
})
