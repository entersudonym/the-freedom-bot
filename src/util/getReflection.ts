import { RegressionReflections } from '../data/reflections'

export function getReflection(): string {
    const index = Math.floor(Math.random() * RegressionReflections.length)
    return RegressionReflections[index]
}
