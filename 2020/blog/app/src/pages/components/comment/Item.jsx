import CommentForm from './CommentForm'
import { useState } from 'react'

const Item = ({ replyId = '', data, articleId, onSuccess }) => {
    const [showComment, setShowComment] = useState(false);

    const RenderChildren = ({replyId = '', list}) => {
        return (
            <div className="comment-children">
                {
                    list.map(item => (
                        <Item 
                            replyId={ replyId }
                            key={item._id}
                            data={item} 
                            articleId={articleId}
                            onSuccess={onSuccess}/>
                    ))
                }
            </div>
        )
    }

    return (
        <div className="comment-item">
            <div className="avatar">
                <img src={ data.user && data.user.avatar } alt=""/>
            </div>
            <div className="content-box">
                <div className="meta-box">
                    <div className="username">{ 
                        data.user && data.user.account 
                    }</div>
                </div>
                <div className="content">{  (data.replyUserName ? `回复${data.replyUserName}: ` : '') + data.content }</div>
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
                        className={ data.replyId ?  'children-comment-form'  : '' }
                        replyId={ replyId || data._id }
                        replyUserName={ data.authorName }
                        replyUserId={ data.author }
                        onSuccess={onSuccess}></CommentForm> : null}
                { data.children && data.children.length ? 
                    <RenderChildren replyId={data._id} list={data.children}></RenderChildren> :null }
            </div>
        </div>
    )
}
export default Item