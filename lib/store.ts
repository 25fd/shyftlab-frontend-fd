import { configureStore} from "@reduxjs/toolkit";

import studentReducer from "@/lib/state/slices/student";

const reducer = {
    students: studentReducer
}

const store = configureStore({
    reducer
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;