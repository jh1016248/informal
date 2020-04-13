import BraftEditor from 'braft-editor'
import React, { useRef, useState, useEffect } from 'react'
import 'braft-editor/dist/index.css';

const EditorContainer = ({ content, parant }) => {
  const inputRef = useRef();
  useEffect(() => {
    if(parant) {
      parant.getContent = () => {
        return inputRef.current.value
      }
    }
  }, [])

  return (
    <textarea ref={inputRef}></textarea>
  )
}

export default EditorContainer;