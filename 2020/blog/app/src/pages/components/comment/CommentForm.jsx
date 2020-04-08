import { useRef, useEffect } from 'react';
import { sendComment } from '@/services/comment';
import { useState } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

const CommentForm = ({ 
        onSuccess, 
        articleId, 
        userAvatar,
        showAvatar = true,
        className = '',
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
            inputRef.current.innerHTML = '';
        })
    }

    const handleKeyDown = (e) => {
        if(e.ctrlKey && e.keyCode === 13) {
            submit()
        }
    }
    const RenderAvatar = () => (
        <div className="avatar-box">
            <img src={ userAvatar } className="avatar" alt=""/>
        </div>
    )

    const RenderActionBox = () => (
        <div className="action-box">
            <div className="flex1"></div>
            <Button  type="primary" onClick={ () => { submit() }}>send</Button>
        </div>
    )

    return (
        <div className={`comment-form ${ className }`}>
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


export default connect(state => {
    return {
        userAvatar: state.users.userInfo.avatar
    }
})(CommentForm)