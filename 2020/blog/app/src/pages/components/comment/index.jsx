import { useState, useEffect } from 'react';
import { getComment } from '@/services/comment';
import CommentForm from './CommentForm';
import Item from './Item'

export default ({ articleId }) => {
    const [list, setList] = useState([]);
    const getList = (articleId) => {
        getComment( articleId ).then(res => {
            setList(res.data)
        })
    }
    useEffect(() => {
        getList(articleId)
    }, [articleId])

    const RenderCommentList = () => (
        <div className="comment-list">
            {list.map(item => 
                <Item data={item} 
                    articleId={articleId}
                    onSuccess={getList} 
                    key={item._id}>
                    </Item>
            )}
        </div>
    )
    return (
        <div className="comment-container">
            <p className="comment-title">评论</p>
            <CommentForm 
                articleId={articleId}
                onSuccess={getList}
                ></CommentForm>
            <RenderCommentList></RenderCommentList>
        </div>
    )
}
