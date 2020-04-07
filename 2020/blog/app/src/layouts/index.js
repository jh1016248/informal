import styles from './index.css';

function BasicLayout({ location, children }) {
  const customerPages = ['/login', '/editor']
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
  return customerPages.includes(location.pathname) ? children : normPage()
  
}

export default BasicLayout;
