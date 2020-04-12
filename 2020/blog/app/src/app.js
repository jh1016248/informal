import { notification } from 'antd'

notification.config({
  duration: 2,
})
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
