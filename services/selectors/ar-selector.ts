import { ReduxState } from '../types'

export const getFirstPoint = (state: ReduxState) => state.ar.points.first
export const getSecondPoint = (state: ReduxState) => state.ar.points.second
export const getReticlePoint = (state: ReduxState) => state.ar.points.reticle
