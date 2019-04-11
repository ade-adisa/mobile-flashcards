import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD } from '../actions'

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
        // case DELETE_ENTRY :
        //   return { entries: state.entries.filter(entry =>
        //     entry.id !== action.key
        //  )}
        case ADD_CARD:
            return {
                ...state,
                [action.key]: {
                ...state[action.key],
                questionsList: [
                    ...state[action.key].questionsList,
                    action.card
                ]
            }
        }
        default:
            return state
    }
}

export default entries