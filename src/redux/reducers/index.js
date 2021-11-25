import { combineReducers } from 'redux';

import subscriptions from './subscriptions';

const rootReducer = combineReducers({ subscriptions });

export default rootReducer;
