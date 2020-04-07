import { useEffect, useState } from 'react'; 
import styles from './index.css';
import Articles from './components/articles';
import { getArticles } from '@/services/article';

export default function() {
  const [articleList, setArticleList] = useState([]);
  
  const getList = () => {
    getArticles({ page: 0, size: 10 }).then(res => {
      if(res.code === 200) {
        setArticleList(res.data)
      }
    })
  }
    
  useEffect(() => {
    getList();
  }, [])

  return (
    <div className={styles.normal}>
      <Articles list={articleList}></Articles>
    </div>
  );
}
