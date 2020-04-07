import styles from './index.css';

function BasicLayout({ location, children }) {
  const normPage = () => {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to my blog!</h1>
        <div className="wrap">
          <div className="container">
            {children}
          </div>
        </div>
      </div>
    )
  }
  return location.pathname === '/login' ? children : normPage()
  
}

export default BasicLayout;
