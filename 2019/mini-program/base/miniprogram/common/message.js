import Pubsub from './pubsub';

let Message = new Pubsub();

let KEYS = {
    PAY_SUCCESS_CALLBACK: 'PAY_SUCCESS_CALLBACK',
    PAY_FAIL_CALLBACK: 'PAY_FAIL_CALLBACK',
    PAY_CANCEL_CALLBACK: 'PAY_CANCEL_CALLBACK',
};

export {
    Message,
    KEYS
};