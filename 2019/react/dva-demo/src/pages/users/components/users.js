import { connect } from 'dva';
import { Table, Pagination, Popconfirm } from 'antd';
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
        console.warn(`TODO: ${id}`);
    }

    function changePagination(page) {
        dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }));
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
            render: (text, { id }) => (
                <span className={styles.operation}>
                    <UserEditModal>
                        <a>Edit</a>
                    </UserEditModal>
                    <Popconfirm title="Confirm to delete?" onConfirm={deleteHandle.bind(null, id)}>
                        <a href="">Delete</a>
                    </Popconfirm>
                </span>
            )
        }
    ];

    return (
        <div className={styles.normal}>
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