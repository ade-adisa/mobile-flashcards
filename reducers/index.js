import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions'

//This is a Reducer below, takes Action and State and returns new state
function entries (state = {}, action) {
    switch(action.type) {
        case RECEIVE_ENTRIES :
            return {
                ...state,
                ...action.entries
            }
        case ADD_ENTRY :
            return {
                ...state,
                ...action.entry
            }
        default :
            return state
    }
}

export default entries