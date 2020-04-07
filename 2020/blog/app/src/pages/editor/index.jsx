import React, { useState } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css';

export default () => {
  const [editorValue, setEditorValue] = useState(BraftEditor.createEditorState(null));

  return (
    <BraftEditor value={editorValue} onChange={setEditorValue}/>
  )
}