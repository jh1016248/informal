import { useEffect, useState } from "react";
import { router } from 'umi';
import { Tag, Popconfirm, notification } from 'antd';
import { getCategoryList, deleteCategory } from '@/services/category';


export default ({ pathname, handleCategory, canRemoveCategory = true, parant }) => {
    const [list, setList] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const getList = async () => {
        const res = await getCategoryList()
        if(res.code === 200) {
            setList(res.data)
        }
    }
    useEffect(() => {
        if(parant) {
            parant.getId = () => {
              return currentId
            }
          }
        getList();
    }, [])

    const handleClick = id => {
        setCurrentId(id)
        if(typeof handleCategory == 'function') {
            return handleCategory(id)
        }
        if(pathname === '/') {
            router.replace(`/?categoryId=${id}`)
        }
        else {
            router.push(`/?categoryId=${id}`)
        }
    }
    const handleDelete = async (id) => {
        if(!canRemoveCategory) {
            return
        }
        const res = await deleteCategory(id)
        if(res.code === 200) {
            notification.success({
                message: '成功',
                description: '删除成功'
              })
              getList()
        }
    }

    const RenderList = () => (
        list.map(item => (
          canRemoveCategory ? 
            <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => handleDelete(item._id)}
                okText="Yes"
                cancelText="No"
                key={item._id}
                >
                <Tag color="green" key={item._id} onClick={() => { handleClick(item._id) }}>{ item.name }</Tag>
            </Popconfirm>
            :
            <Tag color={ currentId === item._id ? 'green': '' } key={item._id} onClick={() => { handleClick(item._id) }}>{ item.name }</Tag>
        ))
    )
    
    return (
        <div className="category-list">
            <RenderList></RenderList>
        </div>
    )
}

