import IRange from '../data/IRange'
import { IRank } from '../data/ranks'
import ranks from '../data/ranks'

/**
 * Returns the entity from `entities` whose encompassing range (denoted by `lowerBound` and
 * `upperbound`) includes `val`. It is lower-bound inclusive. For example, for ranges (A -> 0-6)
 * and (B -> 6-12), 6 will map to B.
 *
 * @param val the numeric value trying to be matched to an entity
 * @param entities a list of `IRange` implementors
 */
export function findRangeEntity(val: number, entities: IRange[]): IRange {
    for (let entity of entities) {
        if (val >= entity.lowerBound && val < entity.upperBound) {
            return entity
        }
    }

    throw new Error(`Couldn't find corresponding entity with range encompassing value ${val}`)
}

export function findRankFromValue(value: number): IRank {
    if (value < 0 || value > ranks.length) {
        throw new Error(`Cannot get rank of value ${value} from list of ${ranks.length} ranks`)
    }

    for (let rank of ranks) {
        if (rank.value === value) return rank
    }
}
