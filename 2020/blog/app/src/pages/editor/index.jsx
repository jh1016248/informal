// import React, { useState, useRef } from 'react'
// import { Button, notification, message } from 'antd'
// import 'braft-editor/dist/index.css';
// import { router } from 'umi'
// import { publishArticle } from '@/services/article';
// import { uploadFile } from '@/services/common'


// export default () => {
//   const [editorValue, setEditorValue] = useState('');
//   const titleRef = useRef();
//   const contentRef = useRef();
//   const fileRef = useRef();
  
//   const controls = [
//     'undo', 'redo',
//     'font-size', 'line-height', 
//     'text-color', 'bold', 'italic', 'underline', 'strike-through', 'emoji', 
//     'headings', 'list-ul', 'list-ol', 'blockquote', 'code',
//     'link', 'hr', 'media','clear'
//   ]

//   const handleSubmit = () => {
//     const title = titleRef.current.value;
//     const content = contentRef.current.value; 
//     const formData = {
//       title,
//       content,
//       thumb: '',
//     }
//     if(title === '') {
//       message.warning('请填写标题');
//       titleRef.current.focus();
//       return 
//     }

//     publishArticle(formData).then(res => {
//       notification.success({
//         message: '发布成功'
//       })
//       router.replace(`/article?id=${res.data}`)
//     })
//   }

//   const handleUploadFile = () => {
//     const file = fileRef.current.files[0];
//     const formData = new FormData();
//     formData.append('file', file)
//     uploadFile('postThumb', formData).then(res => {
//       console.log(res)
//     })
//   }
//   return (
//     <div className="editor-page">
//       <div className="editor-header">
//         <div className="logo" onClick={() => { router.goBack() }}></div>
//         <div className="action-box">
//           <Button size="large" onClick={handleSubmit}>发布</Button>
//         </div>
//       </div>
//       <div className="editor-container">
//         <div className="title-editor">
//           <textarea className="editor-box" ref={titleRef} maxLength="50" placeholder="请输入标题"/>
//         </div>

//         <textarea name="" id="" style={{ width: '100%' }} rows="10" ref={ contentRef }></textarea>

//         <input type="file" ref={fileRef} onChange={ handleUploadFile }/>
//       </div>

//     </div>
//   )
// }

import React, { useState, useRef } from 'react'
import { Button, notification, message, Popover } from 'antd'
import { router } from 'umi'
import { publishArticle } from '@/services/article';
import EditorContainer from './components/editor-container';
import { uploadFile } from '@/services/common'


export default () => {
  const [visibleImgPanel, setVisibleImgPanel] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const fileRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const handleSubmit = () => {
    const title = titleRef.current.value;
    const content = contentRef.current.getContent(); 
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
      <div class="panel">
        { imgUrl === '' ? 
          <div className="select-btn">
            点击此处添加图片
            <input type="file" className="thumb-file-input" ref={fileRef} onChange={ handleUploadFile }/>
          </div> :
          <div className="preview-box">
            <img src={ imgUrl } alt="" class="preview-image"/>
            <div className="delete-btn"></div>
          </div>
         }
        
      </div>
    )
  }

  return (
    <div className="editor-page">
      <div className="editor-header">
        <div className="logo" onClick={() => { router.goBack() }}></div>
        <div className="action-box">
          <Button onClick={handleSubmit}>发布</Button>
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
        <EditorContainer ref={ contentRef }/>
      </div>
    </div>
  )
}