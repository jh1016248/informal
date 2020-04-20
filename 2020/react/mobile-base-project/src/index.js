import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
import routes from './routes/index';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import AnimationRoute from './routes/animationRoute';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Router>
        <AnimationRoute>
          { renderRoutes(routes) }
        </AnimationRoute>
      </Router>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// 模块热替换的 API
if (module.hot) {
    module.hot.accept();
}