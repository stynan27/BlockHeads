import loginReducer from './login';
import { configureStore } from '@reduxjs/toolkit';


export default configureStore({
    reducer: {
      authModalVisible: loginReducer,

    },
  })