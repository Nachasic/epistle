import * as React from 'react'
import { shallow } from 'enzyme'

import LineAtom, { ILineEditorAtomProps, ILineEditorAtomState } from '../../../../src/renderer/Components/Epistle/LineEditor/LineAtom'

import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'

describe('Line Atom editor tests', () => {
    it('should be okay', () => {
        expect(LineAtom).toBeDefined()
    })

    describe('Editing mode', () => {
        const changeCallback: Function = jest.fn()
        const deleteCallback: Function = jest.fn()
        const props: ILineEditorAtomProps = {
            id: 'basicID',
            onChange: (atom: Epistle.ILineAtom) => changeCallback(atom),
            onDelete: deleteCallback
        }
        let wrapper

        beforeEach(() => {
            wrapper = shallow(<LineAtom {...props} />)
        })

        it('should render in editing mode when is not provided with an atom', () => {
            const { mode } = wrapper.state()

            expect(mode).toEqual('EDIT')
        })

        it('should initially have an empty input field', () => {
            const input = wrapper.find(TextField)

            expect(input.length).toEqual(1)
            expect(input.props().value).toEqual('')
        })

        it('should allow to edit current atom value if there is one', () => {
            const newProps: ILineEditorAtomProps = {
                id: 'basicID',
                atom: {
                    type: 'WORD',
                    value: 'Hello'
                },
                onChange: (atom: Epistle.ILineAtom) => changeCallback(atom),
                onDelete: deleteCallback
            }
            const newWrapper = wrapper.setProps(newProps)
            const input = newWrapper.find(TextField)

            expect(input.props().value).toEqual(newProps.atom.value)
        })

        it('should fire onChange calback once value is changed', () => {
            const input = wrapper.find(TextField)
            const NEW_VALUE = 'Some updated value'
            const expectedAtom: Epistle.ILineAtom = {
                type: 'WORD',
                value: NEW_VALUE
            }

            input.simulate('change', { target: { value: NEW_VALUE } })
            expect(changeCallback).toHaveBeenCalledWith(expectedAtom)
        })
    })

    describe('Viewing mode', () => {
        const changeCallback: Function = jest.fn()
        const deleteCallback: Function = jest.fn()
        const props: ILineEditorAtomProps = {
            id: 'basicID',
            onChange: (atom: Epistle.ILineAtom) => changeCallback(atom),
            onDelete: deleteCallback,
            atom: {
                type: 'WORD',
                value: 'Hello'
            }
        }
        let wrapper

        beforeEach(() => {
            wrapper = shallow(<LineAtom {...props} />)
        })

        it('should render in Viewing mode when provided with an atom', () => {
            const { mode } = wrapper.state()

            expect(mode).toEqual('VIEW')
        })

        it('should render a chip with text in viewing mode', () => {
            const chip = wrapper.find(Chip)

            expect(chip.length).toEqual(1)
            expect(chip.props().label).toEqual(props.atom.value)
        })

        it('should enter editing mode when clicked', () => {
            const chip = wrapper.find(Chip)

            chip.simulate('click')
            expect(wrapper.state().mode).toEqual('EDIT')
        })

        it('should enter editing mode when asked to', () => {
            wrapper.instance().Edit()
            expect(wrapper.state().mode).toEqual('EDIT')
        })
    })
})
