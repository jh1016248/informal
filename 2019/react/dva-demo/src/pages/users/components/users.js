import { connect } from 'dva';
import { Table, Pagination, Button, Popconfirm } from 'antd';
import styles from './users.css';
import { PAGE_SIZE } from '../constants';
import { routerRedux } from 'dva/router';
import UserEditModal from './UserEditModal'

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
    function deleteHandle(id) {
        dispatch({
            type: 'users/remove',
            payload: id
        })
    }

    function changePagination(page) {
        dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }));
    }

    function handleOk(id, values) {
        dispatch({
            type: 'users/editUser',
            payload: { id, values }
        })
    }
    function createHandle(values) {
        dispatch({
            type: 'users/create',
            payload: values
        })
    }
    const colums = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="">{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: 'Operation',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
                    <UserEditModal record={record} handleOk={handleOk.bind(null, record.id)}>
                        <a>Edit</a>
                    </UserEditModal>
                    <Popconfirm title="Confirm to delete?" onConfirm={deleteHandle.bind(null, record.id)}>
                        <a href="">Delete</a>
                    </Popconfirm>
                </span>
            )
        }
    ];

    return (
        <div className={styles.normal}>
            <div  className={styles.create}>
                <UserEditModal record={{}} handleOk={createHandle}>
                    <Button>创建用户</Button>
                </UserEditModal>
            </div>
            <div>
                <Table
                    loading={loading}
                    columns={colums}
                    dataSource={dataSource}
                    rowKey={record => record.id}
                    pagination={false}>
                </Table>
                <Pagination
                    className='ant-table-pagination'
                    total={total}
                    onChange={changePagination}
                    current={current}
                    pageSize={PAGE_SIZE}></Pagination>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { list, total, page } = state.users;
    return {
        list,
        total,
        page,
        loading: state.loading.models.users,
    }
};

export default connect(mapStateToProps)(Users);