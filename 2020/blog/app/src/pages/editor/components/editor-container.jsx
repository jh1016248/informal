import BraftEditor from 'braft-editor'
import React, { useState, useEffect } from 'react'
import 'braft-editor/dist/index.css';

const EditorContainer = ({ content = null, editorRef }) => {
  const [editorValue, setEditorValue] = useState(BraftEditor.createEditorState(content));
  useEffect(() => {
    editorRef.current = {
      getContent() {
        return editorValue.toHTML()
      }
    }
  }, [editorValue])

  const controls = [
    'undo', 'redo',
    'font-size', 'line-height', 
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'emoji', 
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code',
    'link', 'hr', 'media','clear'
  ]
  return (
    <BraftEditor placeholder="请输入" controls={controls} value={editorValue} onChange={setEditorValue}/>
  )
}

export default EditorContainer;