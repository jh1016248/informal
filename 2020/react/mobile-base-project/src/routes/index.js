import App from '../App';
import Test from '../pages/test';

export default [
  {
    path: "/",
    component: App,
    routes: [
      {
        path: "test",
        exact: true,
        component: Test
      },
    ]
  }
]