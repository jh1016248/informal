import { useEffect, useState } from "react";
import { router } from 'umi';
import { Tag, Popconfirm, notification } from 'antd';
import { getCategoryList, deleteCategory } from '@/services/category';


export default ({ pathname }) => {
    const [list, setList] = useState([]);

    const getList = async () => {
        const res = await getCategoryList()
        if(res.code === 200) {
            setList(res.data)
        }
    }
    useEffect(() => {
        getList();
    }, [])

    const handleClick = id => {
        if(pathname === '/') {
            router.replace(`/?categoryId=${id}`)
        }
        else {
            router.push(`/?categoryId=${id}`)
        }
    }
    const handleDelete = async (id) => {
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
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => handleDelete(item._id)}
            okText="Yes"
            cancelText="No"
            key={item._id}
            >
                <Tag color="green" key={item._id} onClick={() => { handleClick(item._id) }}>{ item.name }</Tag>
            </Popconfirm>
        ))
    )
    
    return (
        <div className="category-list">
            <RenderList></RenderList>
        </div>
    )
}

