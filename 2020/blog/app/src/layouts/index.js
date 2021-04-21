import styles from './index.less';
import Link from 'umi/link';
import CONFIG from '@/config';
import { useEffect } from 'react';
import { Card } from 'antd';
import { Avatar, Button } from 'antd';
import { connect } from 'dva';
import Categorys from '../pages/components/categorys';
import { router } from 'umi';


function BasicLayout({ location, children, user, dispatch }) {
  useEffect(() => {
    if(location.pathname === '/login' || location.pathname === '/register') {
      return
    }
    if(localStorage.token) {
      dispatch({
        type: 'users/getUserInfo'
      })
    }
  }, [])

  const handleLogout = () => {
    router.push('/admin')
  }

  const RenderUser = () => (
    <span className={`${styles.action} ${styles.account}`}>
      <Button type="primary" style={{ marginRight: '10px' }} onClick={() => { router.push('/editor') }}>写文章</Button>
      <span onClick={() => { handleLogout() }}>
        <Avatar size="small" className={styles.avatar} src={user.avatar} alt="avatar" />
        <span className={styles.name}>{user.account}</span>
      </span>
    </span>
  )
  const RenderLoginBox = () => (
    <div className={styles.action}>
      <Link to="/login">登录</Link>
      {/* <Link to="/register">注册</Link> */}
    </div>
  )
  const normPage = () => {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to my blog!</h1>
        <div className={styles.header}>
            <div className="wrap flex mt15 align-center">
                <Link to="/" className="logo dib"><img src={ require('../assets/logo.png') } alt="贴乎"/></Link>
                {user.id ? <RenderUser />: <RenderLoginBox /> }
            </div>
        </div>
        <div className="wrap flex mt20">
          <div className="page-container">
            {children}
          </div>
          { location.pathname === '/admin' ? null : 
            <div className="page-side">
            <Card title="分类" bordered={false}>
              <Categorys location={location}></Categorys>
            </Card>
          </div> }
        </div>
      </div>
    )
  }
  return CONFIG.customerPages.includes(location.pathname) ? children : normPage()
  
}

const mapStateToProps = state => {
  return {
    user: state.users.userInfo
  }
}

export default connect(mapStateToProps)(BasicLayout);
