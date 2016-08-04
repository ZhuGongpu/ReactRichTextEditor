import {
    createSelector
} from "reselect";

const selectEditorDomain = () => state => state.get('editor')

const selectEditor = () => createSelector(
    selectEditorDomain(),
    (substate) => substate.toJS()
)

export const selectEditorContent = () => createSelector(
    selectEditorDomain(),
    (substate) => substate.get('content')
)

export default selectEditor;
