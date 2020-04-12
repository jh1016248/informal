import { useEffect, useState } from 'react'; 
import { router } from 'umi'
import { Button, Popconfirm, notification } from 'antd';
import { getArticles, deleteArticle } from '@/services/article';

export default (props) => {
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

  const handleDelete = async id => {
    const res = await deleteArticle({ id })
    if(res.code === 200) {
      notification.success({
        message: '成功',
        description: '删除成功'
      })
      getList()
    }
  }

  const RenderList = () => (
    articleList.map(item => (
      <article className="item align-center pt10" key={ item._id }>
          <div className="article-container">
              <h2 className="title">
                <span onClick={() => { router.push(`/article?id=${item._id}`) }}>{item.title}</span>
              </h2>
          </div>
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => handleDelete(item._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">删除</Button>
          </Popconfirm>
      </article>
  )))
  return (
    <div className="article-list article-admin-list">
      <RenderList></RenderList>
    </div>
  );
}
