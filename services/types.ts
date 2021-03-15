export const SET_AR_STATE = 'SET_AR_STATE'
export const SET_FIRST_POINT = 'SET_FIRST_POINT'
export const SET_SECOND_POINT = 'SET_SECOND_POINT'
export const SET_RETICLE_POINT = 'SET_RETICLE_POINT'

export interface ReduxState {
    ar: ArState
}

export interface ArState {
    isActive: boolean
    points: {
        first?: number[]
        second?: number[]
        reticle?: number[]
    }
}

export interface ReduxAction {
    type: string
    payload: any
}
