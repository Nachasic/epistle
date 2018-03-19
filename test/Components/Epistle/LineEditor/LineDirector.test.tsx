import * as React from 'react'
import { shallow, mount } from 'enzyme'

import LineDirector from '../../../../src/renderer/Components/Epistle/LineEditor/LineDirector'

import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'

describe('<LineDirector> tests', () => {
    const changeCallback: jest.Mock<any> = jest.fn()
    const atoms: Epistle.ILineAtom[] = [
        {
            type: 'WORD',
            value: 'Hello'
        },
        {
            type: 'WORD',
            value: 'Hello',
            pace: 'SLOW'
        }
    ]

    it('should be OK', () => {
        expect(LineDirector).toBeDefined()
    })

    describe('Controls rendering', () => {
        const wrapper = mount(<LineDirector atoms={[]} onChange={changeCallback} />)

        it('should render pace controls', () => {
            const controls = wrapper.find(FormControl)
            const paceControls = controls.at(0).find(RadioGroup)
            const options = paceControls.props().children

            expect(controls.length).toEqual(2)
            expect(options.length).toEqual(5)
        })

        it('should render articulation controls', () => {
            const controls = wrapper.find(FormControl)
            const paceControls = controls.at(1).find(RadioGroup)
            const options = paceControls.props().children

            expect(options.length).toEqual(3)
        })

        it('should render disabled controls when supplied with empty atom list', () => {
            const options = wrapper.find(FormControlLabel)

            options.forEach((option) => {
                expect(option.props().disabled).toBeTruthy()
            })
        })

        it('should render enabled controls when supplied with non-empty atom list', () => {
            wrapper.setProps({ atoms })
            const options = wrapper.find(FormControlLabel)

            options.forEach((option) => {
                expect(option.props().disabled).toBeFalsy()
            })
        })
    })
})
