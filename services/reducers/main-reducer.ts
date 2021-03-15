import { ReduxAction, ReduxState, SET_RETICLE_POINT } from '../types'
import arReducer from './ar-reducer'

const initState: any = {
    ar: undefined
}

export default function mainReducer(state: ReduxState = initState, action: ReduxAction): ReduxState {
    __DEV__ && action.type !== SET_RETICLE_POINT && console.debug('MAIN REDUCER CALLED with action ' + action.type)

    return {
        ar: arReducer(state.ar, action)
    }
}
