// TODO: Make this less opinionated and handle error-generation in the caller.

// Parses trailing number from a string, probably message content
export function parseNonZeroNumberFromString(
    str: string,
    parseFn: (str: string) => number,
    ensurePositive?: boolean
): Foo | Bar {
    const dayString = str.substr(str.lastIndexOf(' ') + 1)
    const maybeNumber = parseFn(dayString)

    if (isNaN(maybeNumber)) {
        return { error: 'enter a valid number.' }
    }

    if (ensurePositive && maybeNumber < 0) {
        return { error: 'enter a positive number.' }
    }

    if (maybeNumber === 0) {
        return { error: 'enter a non-zero number.' }
    }

    return { number: maybeNumber }
}

type Foo = { number: number; error?: string }
type Bar = { number?: number; error: string }
