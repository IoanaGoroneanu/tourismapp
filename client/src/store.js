import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./components/features/user";
import searchReducer from "./components/features/search";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk';

const reducers = combineReducers({
    user:userReducer,
    search:searchReducer
})

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore(
    {
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== 'production',
      middleware: [thunk]
    }
);

export default store;