import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './CreateSlicer.js'; 

const store = configureStore({
  reducer: {
    user: rootReducer, 
  },
});

export default store;
