export const EDITOR_CONTENT_CHANGE = "app/Editor/EDITOR_CONTENT_CHANGE";

export function editorContentChange(newContent){
  return {
    type: EDITOR_CONTENT_CHANGE, content: newContent
  }
}
