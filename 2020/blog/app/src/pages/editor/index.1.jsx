import React, { useState, useRef } from 'react'
import { Button, notification, message } from 'antd'
import 'braft-editor/dist/index.css';
import { router } from 'umi'
import { publishArticle } from '@/services/article';
import EditorContainer from './components/editor-container';

export default () => {
  const titleRef = useRef();
  const editorRef = useRef();

  const handleSubmit = () => {
    const title = titleRef.current.value;
    const content = editorRef.current.toHTML(); 
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
        <EditorContainer editorRef={ editorRef }/>
      </div>
    </div>
  )
}