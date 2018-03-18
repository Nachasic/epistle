import TSContracts, { Precondition, Postcondition, assert } from '../src/renderer/TSContracts'

describe('Decorator tests', () => {
    const FOO: string = 'foo'
    const BAR: string = 'bar'
    const interrupt = jest.fn()
    const ERROR_MSG: string = 'ERROR'

    class TestClass {
        private foo: string = FOO
        private bar: string = BAR

        @Postcondition((result: string) => assert(result.length > 0, ERROR_MSG))
        public operation (bar: string): string {
            if (bar.length === 0) {
                return ''
            }
            return bar + ' lol'
        }

        @Precondition((bar: string) => assert(bar.length > 0, ERROR_MSG))
        public getFoo (bar: string): string {
            return this.foo
        }
    }
    const test: TestClass = new TestClass()

    TSContracts.setupContractInterruptionCb((msg: string) => {
        interrupt(msg)
    })

    describe('@Postcondition tests', () => {
        beforeEach(() => {
            interrupt.mockReset()
        })

        it('should maintain the scope', () => {
            const result = test.operation('test')

            expect(interrupt).not.toBeCalled()
            expect(result).toEqual('test lol')
        })

        it('should raise an error on false assertion', () => {
            const result = test.operation('')

            expect(interrupt).toBeCalledWith(ERROR_MSG)
        })
    })

    describe('@Precondition tests', () => {
        beforeEach(() => {
            interrupt.mockReset()
        })

        it('should maintain the scope', () => {
            const result = test.getFoo('test')

            expect(interrupt).not.toBeCalled()
            expect(result).toEqual(FOO)
        })

        it('should raise an error on false assertion', () => {
            const result = test.getFoo('')

            expect(interrupt).toBeCalledWith(ERROR_MSG)
        })
    })
})
