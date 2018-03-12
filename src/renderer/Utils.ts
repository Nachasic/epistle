export const debounce = (callback, wait, context = this) => {
    let timeout = null
    let callbackArgs = null

    const later = () => callback.apply(context, callbackArgs)

    return () => {
        callbackArgs = arguments
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function * entries (object: any) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            yield [key, object[key]]
        }
    }
}
