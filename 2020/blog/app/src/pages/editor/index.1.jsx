import React, { useState, useRef } from 'react'
import BraftEditor from 'braft-editor'
import { Button, notification, message } from 'antd'
import 'braft-editor/dist/index.css';
import { router } from 'umi'
import { publishArticle } from '@/services/article';

export default () => {
  const [editorValue, setEditorValue] = useState(BraftEditor.createEditorState(null));
  const titleRef = useRef();
  const controls = [
    'undo', 'redo',
    'font-size', 'line-height', 
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'emoji', 
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code',
    'link', 'hr', 'media','clear'
  ]

  const handleSubmit = () => {
    const title = titleRef.current.value;
    const content = editorValue.toHTML(); 
    const formData = {
      title,
      content,
      thumb: '',
    }
    if(title === '') {
      message.warning('请填写标题');
      titleRef.current.focus();
      return 
    }

    publishArticle(formData).then(res => {
      notification.success({
        message: '发布成功'
      })
      router.replace(`/article?id=${res.data}`)
    })
  }
  return (
    <div className="editor-page">
      <div className="editor-header">
        <div className="logo" onClick={() => { router.goBack() }}></div>
        <div className="action-box">
          <Button size="large" onClick={handleSubmit}>发布</Button>
        </div>
      </div>
      <div className="editor-container">
        <div className="title-editor">
          <textarea className="editor-box" ref={titleRef} maxLength="50" placeholder="请输入标题"/>
        </div>
        <BraftEditor placeholder="请输入" controls={controls} value={editorValue} onChange={setEditorValue}/>
      </div>
    </div>
  )
}