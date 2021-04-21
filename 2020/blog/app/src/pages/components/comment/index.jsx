import { useState, useEffect } from 'react';
import { getComment, getReplyList } from '@/services/comment';
import CommentForm from './CommentForm';
import Item from './Item'

export default ({ articleId }) => {
    const [list, setList] = useState([]);
    const getList = () => {
        getComment( articleId ).then(res => {
            if(res.code === 200) {
                res.data.list.forEach(item => {
                    item.replyList = [];
                })
                getReplyList(articleId).then(res2 => {
                    if(res2.code === 200) {
                        let map = {};
                        res2.data.forEach(item => {
                            if(!map[item.replyId]) {
                                map[item.replyId] = [item]
                            }
                            else {
                                map[item.replyId].push(item)
                            }
                        })

                        res.data.list.forEach(item => {
                            if(map[item.id]) {
                                item.replyList = map[item.id]
                            }
                        })
                        setList(res.data.list)
                    }
                })
            }
        })
    }
    useEffect(() => {
        getList()
    }, [])

    const RenderCommentList = () => (
        <div className="comment-list">
            {list.map(item => 
                <Item data={item} 
                    articleId={articleId}
                    onSuccess={getList} 
                    key={item.id}>
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
