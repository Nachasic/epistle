import * as React from 'react'
import { shallow } from 'enzyme'
import { createMount } from 'material-ui/test-utils'

import LineDirector from '../../../../src/renderer/Components/Epistle/LineEditor/LineDirector'
import { IAtomExchange } from '../../../../src/renderer/Components/Epistle/LineEditor/AtomSequence'

import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'

describe('<LineDirector> tests', () => {
    const changeCallback: jest.Mock<any> = jest.fn()
    const atoms: IAtomExchange[] = [
        {
            id: 'atom1',
            atom: {
                type: 'WORD',
                value: 'Hello'
            }
        }, {
            id: 'atom2',
            atom: {
                type: 'WORD',
                value: 'Hello',
                pace: 'SLOW'
            }
        }
    ]

    it('should be OK', () => {
        expect(LineDirector).toBeDefined()
    })

    describe('Controls rendering', () => {
        let mount
        let wrapper

        beforeAll(() => {
            mount = createMount()
            wrapper = mount(<LineDirector atoms={[]} onChange={changeCallback} />)
        })

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

    describe('Controls functionality', () => {
        let mount
        let wrapper
        let controls

        beforeAll(() => {
            mount = createMount()
            wrapper = mount(<LineDirector atoms={atoms} onChange={changeCallback} />)
            controls = wrapper.find(FormControl)
        })

        it('should render enabled controls with selected value if pacing or articulation is consistent in the selection', () => {
            const articulationControls = controls.at(1).find(RadioGroup)
            const articulationValue = articulationControls.props().value

            expect(articulationValue).toEqual('PAIR')
        })

        it('should render empty enabled controls if pacing or articulation is inconsistent in the selection', () => {
            const paceControls = controls.at(0).find(RadioGroup)
            const paceValue = paceControls.props().value

            expect(paceValue).toEqual('MULTIPLE')
        })

        // it('should report changes with whole exchange list once the pacing is set', () => {
        //     const paceControls = controls.at(0).find(RadioGroup)
        //     const extraFastPacingOption = paceControls.find(FormControlLabel).at(0).childAt(0)
        //     const expectedExchangeReport = atoms.map((exchange: IAtomExchange): IAtomExchange => ({
        //         ...exchange,
        //         atom: {
        //             ...exchange.atom,
        //             pace: 'X-FAST'
        //         }
        //     }))

        //     extraFastPacingOption.simulate('click')
        //     expect(changeCallback).toHaveBeenLastCalledWith(expectedExchangeReport)
        // })
    })
})
