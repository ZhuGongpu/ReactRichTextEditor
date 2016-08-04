import {fromJS} from 'immutable';
import {EDITOR_CONTENT_CHANGE} from "./actions";

export default(state = fromJS({}), action) => {
    switch (action.type) {
        case EDITOR_CONTENT_CHANGE:
            return state.set('content', action.content);
        default:
            return state;
    }
}
