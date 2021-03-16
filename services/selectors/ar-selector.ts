import { ReduxState } from '../types'

export const getFirstPoint = (state: ReduxState) => state.ar.points.first
export const getSecondPoint = (state: ReduxState) => state.ar.points.second
export const getReticlePoint = (state: ReduxState) => state.ar.points.reticle
export const getDistance = (state: ReduxState) => {
    const first = state.ar.points.first
    const second = state.ar.points.second
    if (!first || !second) return 0
    return Math.sqrt(Math.pow(first[0] - second[0], 2) + Math.pow(first[1] - second[1], 2) + Math.pow(first[2] - second[2], 2))
}
