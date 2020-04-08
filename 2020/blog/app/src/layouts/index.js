import styles from './index.less';
import Link from 'umi/link';
import CONFIG from '@/config';
import { useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';


function BasicLayout({ location, children, user, dispatch }) {
  useEffect(() => {
    if(location.pathname === '/login' || location.pathname === '/register') {
      return
    }
    dispatch({
      type: 'users/getUserInfo'
    })
  }, [])

  const handleLogout = () => {
    router.push('/login')
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
    <div className={styles.fr}>
      <Link to="/login">登录</Link>
      <Link to="/register">注册</Link>
    </div>
  )
  const normPage = () => {
    return (
      <div className={styles.normal, 'min-scroll'}>
        <h1 className={styles.title}>Yay! Welcome to my blog!</h1>
        <div className={styles.header}>
            <div className="wrap flex mt15">
                <Link to="/" className="logo dib pt10"><img src={ require('../assets/logo.png') } alt="贴乎"/></Link>

                {user._id ? <RenderUser />: <RenderLoginBox /> }
            </div>
        </div>
        <div className="wrap">
          <div className="page-container">
            {children}
          </div>
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
