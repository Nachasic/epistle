import * as React from 'react'
import { shallow, mount } from 'enzyme'

import { LineAtom, PropsWithStyle as ILineEditorAtomProps, ILineEditorAtomState } from '../../../../src/renderer/Components/Epistle/LineEditor/LineAtom'

import ButtonBase from 'material-ui/ButtonBase'
import TextField from 'material-ui/TextField'

describe('Line Atom editor tests', () => {
    it('should be okay', () => {
        expect(LineAtom).toBeDefined()
    })

    describe('Editing mode', () => {
        const changeCallback: Function = jest.fn()
        const deleteCallback: Function = jest.fn()
        const clickCallback: Function = jest.fn()
        const spaceCallback: Function = jest.fn()

        const props: ILineEditorAtomProps = {
            id: 'basicID',
            editmode: true,
            onChange: (id: string, atom: Epistle.ILineAtom) => changeCallback(atom),
            onClick: (id: string) => clickCallback(id),
            onSpace: (atom: Epistle.ILineAtom, id: string, tail: string) => spaceCallback(atom, id, tail),
            onDelete: (id: string) => deleteCallback(id),
            classes: {
                selected: 'selected'
            }
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
                onChange: (id: string, atom: Epistle.ILineAtom) => changeCallback(atom),
                onClick: (id: string) => clickCallback(id),
                onSpace: (atom: Epistle.ILineAtom, id: string, tail: string) => spaceCallback(tail),
                onDelete: (id: string) => deleteCallback(id),
                classes: {
                    selected: 'selected'
                }
            }
            const newWrapper = wrapper.setProps(newProps)
            const input = newWrapper.find(TextField)

            expect(input.props().value).toEqual(newProps.atom.value)
        })

        it('should fire onChange calback once value is changed', () => {
            const input = wrapper.find(TextField)
            const NEW_VALUE = 'Some_updated_value'
            const expectedAtom: Epistle.ILineAtom = {
                type: 'WORD',
                value: NEW_VALUE
            }

            input.simulate('change', { target: { value: NEW_VALUE } })
            expect(changeCallback).toHaveBeenCalledWith(expectedAtom)
        })

        it('should fire a callback once space is pressed', () => {
            const input = wrapper.find(TextField)
            const NEW_VALUE: string[] = ['Some', 'value']
            const expectedAtom: Epistle.ILineAtom = {
                type: 'WORD',
                value: NEW_VALUE[0]
            }
            const expectedTail = NEW_VALUE[1]

            input.simulate('change', { target: { value: NEW_VALUE.join(' ') } })
            expect(spaceCallback).toHaveBeenCalledWith(expectedAtom, props.id, expectedTail)
        })
    })

    describe('Viewing mode', () => {
        const changeCallback: jest.Mock<any> = jest.fn()
        const deleteCallback: jest.Mock<any> = jest.fn()
        const clickCallback: jest.Mock<any> = jest.fn()
        const spaceCallback: jest.Mock<any> = jest.fn()
        const onEditCallback: jest.Mock<any> = jest.fn()

        const props: ILineEditorAtomProps = {
            id: 'basicID',
            onChange: (id: string, atom: Epistle.ILineAtom) => changeCallback(atom),
            onClick: (id: string) => clickCallback(id),
            onSpace: (atom: Epistle.ILineAtom, id: string, tail: string) => spaceCallback(tail),
            onEnterEdit: (id: string) => onEditCallback(id),
            onDelete: (id: string) => deleteCallback(id),
            atom: {
                type: 'WORD',
                value: 'Hello'
            },
            classes: {
                selected: 'selected'
            }
        }
        let wrapper

        beforeEach(() => {
            wrapper = mount(<LineAtom {...props} />)
            jest.useFakeTimers()
        })

        afterEach(() => {
            changeCallback.mockReset()
            deleteCallback.mockReset()
            clickCallback.mockReset()
            spaceCallback.mockReset()
            onEditCallback.mockReset()
        })

        it('should render in Viewing mode when provided with an atom', () => {
            const { mode } = wrapper.state()

            expect(mode).toEqual('VIEW')
        })

        it('should render a button with text in viewing mode', () => {
            const chip = wrapper.find(ButtonBase)

            expect(chip.length).toEqual(1)
            expect(chip.text()).toEqual(props.atom.value)
        })

        it('should report to enter editing mode when double-clicked', () => {
            const chip = wrapper.find(ButtonBase)

            chip.simulate('doubleclick')
            expect(onEditCallback).toHaveBeenCalledWith(props.id)
        })

        it('should report it\'s atom when clicked', () => {
            const chip = wrapper.find(ButtonBase)

            chip.simulate('click')
            jest.runAllTimers() // We're debouncing clicks
            expect(clickCallback).toHaveBeenLastCalledWith(props.id)
        })
    })
})
