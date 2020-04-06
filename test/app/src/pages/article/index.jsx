import { useEffect, useState } from 'react'; 
import { getArticleDetail } from '@/services/article';
import Comment from '../components/comment';

export default (props) => {
    const id = props.location.query.id;
    const [detail, setDetail] = useState({});
    const getArticle = () => {
        getArticleDetail({id}).then(res => {
            setDetail(res.data)
        })
    }
    useEffect(() => {
        getArticle()
    }, [])
    return (
        <>
           <article className="article-container">
                <h1 className="title">{detail.title}</h1>
                <div>{detail.content}</div>

                <Comment id={id}></Comment>
            </article>
        </>
    )
}