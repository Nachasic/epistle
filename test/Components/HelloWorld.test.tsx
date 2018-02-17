import { shallow } from 'enzyme'
import HelloWolrd, { IHelloWorldProps } from '../../src/Components/HelloWorld'

describe('<HelloWorld/> tests', (): void => {
    it('should be okay', (): void => {
        expect(HelloWolrd).toBeDefined()
    })
})
