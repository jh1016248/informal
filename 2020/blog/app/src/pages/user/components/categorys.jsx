import { useEffect, useState, useRef } from "react";
import { getCategoryList, addCategory, deleteCategory } from '@/services/category'
import { Tag,Popconfirm, notification, Button, Modal } from 'antd';


export default ({ pathname }) => {
    const [list, setList] = useState([]);
    const [visibleDialog, setVisibleDialog] = useState(false)
    const categoryInput = useRef();

    const getList = async () => {
        const res = await getCategoryList()
        if(res.code === 200) {
            setList(res.data)
        }
    }
    useEffect(() => {
        getList();
    }, [])

    const handleConfirm = async id => {
        const res = await deleteCategory(id)
        if(res.code === 200) {
            notification.success({
                message: '成功',
                description: '删除成功'
              })
              getList()
        }
    }

    const handleOk = async() => {
        console.log('ok')
        const name = categoryInput.current.value;
        if(name !== '') {
            const res = await addCategory(name)
            if(res.code === 200) {
                notification.success({
                    message: '成功',
                    description: '新增分类成功'
                })
                setVisibleDialog(false)
                getList()
            }
        }
    }

    const RenderList = () => (
        list.map(item => (
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => handleConfirm(item._id)}
              okText="Yes"
              key={item._id}
              cancelText="No"
            >
                <Tag color="green">{ item.name }</Tag>
            </Popconfirm>
        ))
    )
    
    return (
        <div className="category-list">
            <RenderList></RenderList>
            <Button onClick={ () => { setVisibleDialog(true) } }>新增</Button>
            <Modal
                title="新增分类"
                visible={visibleDialog}
                onOk={handleOk}
                onCancel={ () => setVisibleDialog(false) }
                >
                <input type="text" style={{width: '100%'}} placeholder="请输入分类名" ref={categoryInput}/>
                </Modal>
        </div>
    )
}

