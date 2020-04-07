import CommentForm from './CommentForm'
import { useState } from 'react'

export default ({ data, articleId, onSuccess }) => {
    const [showComment, setShowComment] = useState(false);

    return (
        <div className="comment-item">
            <div className="avatar">
                <img src="https://cdn.boblog.com/Gravatar-Logo.jpg?imageView2/1/w/128" alt=""/>
            </div>
            <div className="content-box">
                <div className="meta-box">
                    <div className="username">{ data.authorName }</div>
                </div>
                <div className="content">{ data.content }</div>
                <div className="reply-stat">
                    <time className="time">{ data.createTime }</time>
                    <div className="action-box">
                        <div className="like-action"></div>
                        <div className="comment-action" onClick={ () => { setShowComment(!showComment) } }>回复</div>
                    </div>
                </div> 
                {showComment ? 
                    <CommentForm
                        showAvatar={false}
                        articleId={articleId}
                        replyId={ data._id }
                        replyUserName={ data.authorName }
                        replyUserId={ data.author }
                        onSuccess={onSuccess}></CommentForm> : null}
            </div>
        </div>
    )
}
