import App from '../App';
import Test from '../pages/test';
import Test2 from '../pages/test2';

export default [
  {
    path: "/test",
    exact: true,
    component: Test
  },
  {
    path: "/test2",
    exact: true,
    component: Test2
  },
]