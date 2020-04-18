const ranks: IRank[] = [
    {
        name: 'Ronin',
        value: 0,
        lowerBound: 0
    },
    {
        name: 'Ashigaru',
        value: 1,
        lowerBound: 6
    },
    {
        name: 'Lictor',
        value: 2,
        lowerBound: 12
    },
    {
        name: 'Hoplite',
        value: 3,
        lowerBound: 18
    },
    {
        name: 'Janissary',
        value: 4,
        lowerBound: 28
    },
    {
        name: 'Kenin',
        value: 5,
        lowerBound: 38
    },
    {
        name: 'Samurai',
        value: 6,
        lowerBound: 48
    },
    {
        name: 'Imperator',
        value: 7,
        lowerBound: 58
    },
    {
        name: 'Gurkha',
        value: 8,
        lowerBound: 78
    },
    {
        name: 'Medjay',
        value: 9,
        lowerBound: 108
    },
    {
        name: 'Sohei',
        value: 10,
        lowerBound: 148
    },
    {
        name: 'Praetorian',
        value: 11,
        lowerBound: 198
    },
    {
        name: 'Kheshig',
        value: 12,
        lowerBound: 258
    },
    {
        name: 'Spartan',
        value: 13,
        lowerBound: 318
    },
    {
        name: 'Varangian',
        value: 14,
        lowerBound: 388
    },
    {
        name: 'Yamabushi',
        value: 15,
        lowerBound: 458
    },
    {
        name: 'Legatus',
        value: 16,
        lowerBound: 538
    },
    {
        name: 'Navarch',
        value: 17,
        lowerBound: 618
    },
    {
        name: 'Polemarch',
        value: 18,
        lowerBound: 708
    },
    {
        name: 'Strategos',
        value: 19,
        lowerBound: 808
    }
]

interface IRank {
    name: string
    value: number
    lowerBound: number
}

export default ranks
