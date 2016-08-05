export const EDITOR_CONTENT_CHANGE = "app/Editor/EDITOR_CONTENT_CHANGE";
export function editorContentChange(newContent) {
    return {
        type: EDITOR_CONTENT_CHANGE,
        content: newContent
    }
}

export const TOGGLE_PLACEHOLDER = "app/Editor/TOGGLE_PLACEHOLDER";
export function togglePlaceholder(show) {
    return {
        type: TOGGLE_PLACEHOLDER,
        show
    }
}
