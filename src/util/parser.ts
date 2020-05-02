export function parseNonZeroTrailingFloatFromString(str: string): Foo | Bar {
    const dayString = str.substr(str.lastIndexOf(' ') + 1)
    const maybeNumber = parseFloat(dayString)

    if (isNaN(maybeNumber)) {
        return { error: 'please enter a valid positive or negative number.' }
    }

    if (maybeNumber === 0) {
        return { error: 'please enter a non-zero number.' }
    }

    return { number: maybeNumber }
}

type Foo = { number: number; error?: string }
type Bar = { number?: number; error: string }
