// type MethodDecorator = (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) =>
//     TypedPropertyDescriptor<any> | void;

type AssertFn = (...args: any[]) => void;

export default class TSContract {
    private static isCustomContractInterruptionCb: boolean = false;

    static contractInterruptionCb (message: string): void {
        console.warn(message);
    }

    static setupContractInterruptionCb (cb: (message: string) => void): void {
        if (TSContract.isCustomContractInterruptionCb) {
            console.warn('Custom contract interruption callback already setted, break');
            return;
        }
        TSContract.contractInterruptionCb = cb;
        TSContract.isCustomContractInterruptionCb = true;
    }
}

export const assert = (expression: boolean, errorMessage: string): void => {
    if (!expression) {
        TSContract.contractInterruptionCb(errorMessage);
    }
}

/**
 * Executes assertion after the method is executed providing the result
 * as an argument.
 * 
 * Use anonymous function instead of arrow function to access class properties
 * in the assertion.
 */
export const Postcondition = (assertFn: AssertFn): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
        const originalValue = descriptor.value

        const newValue = (...args) => {
            const result = originalValue.apply(this, args)
            assertFn.call(this, result)
            return result
        }
        descriptor.value = newValue;
        return descriptor;
    };
}

/**
 * Executes assertion before the method is executed providing method's arguments.
 * 
 * Use anonymous function instead of arrow function to access class properties
 * in the assertion.
 */
export const Precondition = (assertFn: AssertFn): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
        const originalValue = descriptor.value;
        function newValue (...args) {
            assertFn.apply(this, args);
            return originalValue.apply(this, args);
        }
        descriptor.value = newValue;
        return descriptor;
    };
}
