const ranks: IRank[] = [
    {
        name: 'Ronin',
        lowerBound: 0,
        upperBound: 5
    },
    {
        name: 'Ashigaru',
        lowerBound: 6,
        upperBound: 11
    } // To be continued
]

interface IRank {
    name: string
    lowerBound: number
    upperBound: number
}

export default ranks
