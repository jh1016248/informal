import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      <div className="wrap">
        <div className="container">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
