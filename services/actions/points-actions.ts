import { ReduxAction, SET_FIRST_POINT, SET_RETICLE_POINT, SET_SECOND_POINT } from '../types'

export const setPoint = (point: 'first' | 'second' | 'reticle', data: number[] | undefined): ReduxAction => {
    const type = point === 'first' ? SET_FIRST_POINT : point === 'second' ? SET_SECOND_POINT : SET_RETICLE_POINT
    return {
        type: type,
        payload: data
    }
}
