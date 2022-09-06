import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from './authReducer'
import statisticsReducer from "./statisticsReducer";


const store = configureStore({
    reducer: {
        auth: authReducer,
        statistics: statisticsReducer
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch


export default store