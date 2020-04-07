import Item from './Item'
import { useState, useEffect, useRef } from 'react';
import { getComment, sendComment } from '@/services/comment';

export default (props) => {
    const [list, setList] = useState([]);
    const articleId = props.id;
    const inputRef = useRef()
    const getList = () => {
        getComment( articleId ).then(res => {
            setList(res.data)
        })
    }
    useEffect(() => {
        getList()
    }, [])
    
    const postComment = (msg) => {
        sendComment({ content: msg, articleId, }).then(res => {
            console.log(res)
            getList();
        })
    }

    const handleKeyDown = (e) => {
        console.log(e.keyCode)
        if(e.keyCode === 13) {
            const value = inputRef.current.value;
            if(value !== '') {
                postComment(value)
            }
        }
    }

    const RenderCommentForm = () => {
        return (
            <div className="comment-form">
                <div className="avatar-box">
                    <img src="https://cdn.boblog.com/Gravatar-Logo.jpg?imageView2/1/w/128" className="avatar" alt=""/>
                </div>
                <div className="form-box">
                    <div className="input-box">
                        <input type="text" 
                            placeholder="请输入评论..." 
                            ref={ inputRef } 
                            className="comment-input" 
                            onKeyDown={(e) => { handleKeyDown(e) } }></input>
                    </div>
                </div>
            </div>
        )
    }
    
    const RenderCommentList = () => {
        return (
            <div className="comment-list">
                { list.map(item => <Item data={item} key={item._id}></Item>) }
            </div>
        )
    }

    return (
        <div className="comment-container">
            <p className="comment-title">评论</p>
            <RenderCommentForm></RenderCommentForm>
            <RenderCommentList></RenderCommentList>
        </div>
    )
}
