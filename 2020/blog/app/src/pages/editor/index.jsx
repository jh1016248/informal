import React, { useState, useRef, useEffect } from 'react'
import { Button, notification, message, Popover } from 'antd'
import { router } from 'umi'
import { publishArticle } from '@/services/article';
import EditorContainer from './components/editor-container';
import EditorContainer1 from './components/editor-container1';
import Categorys from '../components/categorys';
import { uploadFile } from '@/services/common'


export default (props) => {
  const [visibleImgPanel, setVisibleImgPanel] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const fileRef = useRef();
  const titleRef = useRef();
  const parant = {}

  const [list, setList] = useState([]);

  const handleSubmit = () => {
    const title = titleRef.current.value;
    console.log(parant)
    let content = parant.getContent(); 
    const formData = {
      title,
      content,
      thumb: imgUrl,
      categoryId: parant.getId()
    }
    console.log(formData)
    return 
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
  const handleUploadFile = () => {
      const file = fileRef.current.files[0];
      const formData = new FormData();
      formData.append('file', file)
      uploadFile('postThumb', formData).then(res => {
        if(res.code === 200) {
          setImgUrl(res.data);
        }
      })
  }
  const UploadImgPanel = () => {
    return (
      <div className="panel">
        { imgUrl === '' ? 
          <div className="select-btn">
            点击此处添加图片
            <input type="file" className="thumb-file-input" ref={fileRef} onChange={ handleUploadFile }/>
          </div> :
          <div className="preview-box">
            <img src={ imgUrl } alt="" className="preview-image"/>
            <div className="delete-btn"></div>
          </div>
         }
        
      </div>
    )
  }

  const handleCategory = (e) => {
    console.log(e)
  }

  const RenderCategoryPanel = () => {
    return (
      <div>
        <Categorys  parant={ parant } pathname="" canRemoveCategory={false} handleCategory={ handleCategory }></Categorys>
        <Button onClick={ handleSubmit }>确认发布</Button>
      </div>
    )
  }

  return (
    <div className="editor-page">
      <div className="editor-header">
        <div className="logo" onClick={() => { router.goBack() }}></div>
        <div className="action-box">
          <Popover
            content={ <RenderCategoryPanel /> }
            trigger="click"
            title="选择分类" >
            <Button>发布</Button>
          </Popover>
          <Popover
            content={ <UploadImgPanel></UploadImgPanel> }
            trigger="click"
            title="添加封面大图"
            visible={visibleImgPanel}
            onVisibleChange={ setVisibleImgPanel } >
            <span className="toggle-btn"></span>
          </Popover>
        </div>
      </div>
      <div className="editor-container">
        <div className="title-editor">
          <textarea className="editor-box" ref={titleRef} maxLength="50" placeholder="请输入标题"/>
        </div>
        <EditorContainer1 parant={ parant }/>
      </div>
    </div>
  )
}