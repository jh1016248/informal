import { useEffect, useState } from "react";
import { getCategoryList } from '@/services/category'
import { router } from 'umi';
import { Tag } from 'antd';


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

    const RenderList = () => (
        list.map(item => (
            <Tag color="green" key={item._id} onClick={() => { handleClick(item._id) }}>{ item.name }</Tag>
        ))
    )
    
    return (
        <div className="category-list">
            <RenderList></RenderList>
        </div>
    )
}

