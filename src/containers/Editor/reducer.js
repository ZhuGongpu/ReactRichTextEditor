import {fromJS} from 'immutable';
import {EDITOR_CONTENT_CHANGE, TOGGLE_PLACEHOLDER} from "./actions";

export default(state = fromJS({}), action) => {
    switch (action.type) {
        case EDITOR_CONTENT_CHANGE:
            return state.set('content', action.content.html());
        case TOGGLE_PLACEHOLDER:
            return state.set('showPlaceholder', action.show);
        default:
            return state;
    }
}
