import { useEffect, useState } from 'react'; 
import { router } from 'umi'
import { getArticles } from '@/services/article';

export default (props) => {
  const categoryId = props.history.location.query.categoryId || '';
  const [articleList, setArticleList] = useState([]);
  const getList = () => {
    getArticles({ page: 0, size: 10, categoryId }).then(res => {
      if(res.code === 200) {
        setArticleList(res.data)
      }
    })
  }
    
  useEffect(() => {
    getList();
  }, [categoryId])

  const RenderList = () => (articleList.map(item => (
      <article className="item" key={ item._id }>
          <div className="article-container">
              <h2 className="title"  onClick={() => { router.push(`/article?id=${item._id}`) }}>{item.title}</h2>
              <div className="describe">{item.describe}</div>
          </div>
          <div className="article-thumb">
              <img src={item.thumb} alt=""/>
          </div>
      </article>
  )))
  return (
    <div className="article-list">
      <RenderList></RenderList>
    </div>
  );
}
