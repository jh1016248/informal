import { router } from 'umi'

const Articles = (props) => {
    const list = props.list;
    const renderList = () => {
        return list.map(item => {
            return (
                <article className="item" key={ item._id }>
                    <div className="article-container">
                        <h2 className="title"  onClick={() => { router.push(`/article?id=${item._id}`) }}>{item.title}</h2>
                        <div className="describe">{item.describe}</div>
                    </div>
                    <div className="article-thumb">
                        <img src={item.thumb} alt=""/>
                    </div>
                </article>
            )
        })
    }
    return (
        <div className="article-list">
            {renderList()}
        </div>
    )
}

export default Articles;