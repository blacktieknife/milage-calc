import {
    createStore,
    compose,
    combineReducers,
} from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers';

const store = createStore(
    (state, action) => state,
    compose(lazyReducerEnhancer(combineReducers))
);

export default store;