import { useEffect, useState } from 'react'; 
import { getArticleDetail } from '@/services/article';
import Comment from '../components/comment';

export default (props) => {
    const id = props.location.query.id;
    const [detail, setDetail] = useState({});
    useEffect(() => {
        getArticleDetail({ id }).then(res => {
            setDetail(res.data)
        })
    }, [id])
    return (
        <div className="article-container">
            <h1 className="title">{detail.title}</h1>
            <div className="container-main" dangerouslySetInnerHTML={{__html: detail.content}}></div>
            {/* <Comment articleId={id}></Comment> */}
        </div>
    )
}