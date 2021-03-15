import { ArState, ReduxAction, SET_RETICLE_POINT, SET_FIRST_POINT, SET_SECOND_POINT } from '../types'

const initState: ArState = {
    isActive: false,
    points: {
        first: undefined,
        second: undefined,
        reticle: undefined
    }
}

export default function arReducer(state: ArState = initState, action: ReduxAction) {
    switch (action.type) {
        case SET_FIRST_POINT: {
            const copy = { ...state }
            copy.points.first = action.payload
            return copy
        }
        case SET_SECOND_POINT: {
            const copy = { ...state }
            copy.points.second = action.payload
            return copy
        }
        case SET_RETICLE_POINT: {
            const copy = { ...state }
            copy.points.reticle = action.payload
            return copy
        }
        default:
            return state
    }
}
