import { configureStore } from '@reduxjs/toolkit'
// import postsSlice from './features/postsSlice'
import userSlice from './features/userSlice'
import appApi from "./services/appApi";
import storage from 'redux-persist/lib/storage'; 
import {combineReducers} from 'redux';
import thunk from "redux-thunk";
import {persistReducer} from "redux-persist"
// import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig ={
  key:'root',
  storage,
  blacklist : [appApi.reducerPath]
}
const reducers = combineReducers({
      user:userSlice,
    //   post: postsSlice,
      [appApi.reducerPath]: appApi.reducer,
})
const persistedReducer = persistReducer(persistConfig,reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware : [thunk,appApi.middleware],
})



export default store;