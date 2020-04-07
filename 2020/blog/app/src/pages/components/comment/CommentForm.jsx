import { useRef, useEffect } from 'react';
import { sendComment } from '@/services/comment';
import { useState } from 'react';
import { Button } from 'antd'

const CommentForm = ({ 
        onSuccess, 
        articleId, 
        showAvatar = true,
        replyId = '',
        replyUserId = '',
        replyUserName = '',
     }) => {
    const inputRef = useRef()
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        const focus = () => {
            setIsFocus(true)
        }
        const blur = () => {
            setIsFocus(false)
        }
        inputRef.current.addEventListener('focus', focus)
        inputRef.current.addEventListener('blur', blur)
        // return focus
    }, [])

    const submit = () => {
        const value = inputRef.current.innerHTML;
        if(value === '') {
            return
        }
        sendComment({ content: value, articleId, replyId, replyUserId, replyUserName }).then(res => {
            console.log(res)
            onSuccess();
        })
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            submit()
        }
    }
    const RenderAvatar = () => (
        <div className="avatar-box">
            <img src="https://cdn.boblog.com/Gravatar-Logo.jpg?imageView2/1/w/128" className="avatar" alt=""/>
        </div>
    )

    const RenderActionBox = () => (
        <div className="action-box">
            <div className="flex1"></div>
            <Button  type="primary" onClick={ submit() }>send</Button>
        </div>
    )

    return (
        <div className="comment-form">
            {showAvatar ? RenderAvatar() : null}
            <div className="form-box">
                <div className="input-box">
                    <div type="text" 
                        placeholder={ replyUserName ? `回复${replyUserName}` : "请输入评论..."  }
                        ref={ inputRef } 
                        className="comment-input" 
                        contentEditable="true"
                        onKeyDown={(e) => { handleKeyDown(e) } }></div>
                </div>
                { isFocus || (inputRef.current && inputRef.current.innerHTML) ? RenderActionBox() : null }
            </div>
        </div>
    )
}

export default CommentForm