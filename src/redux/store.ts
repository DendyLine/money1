import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import tradePriceReducer from './tradePriceSlice'

export const store = configureStore({
  reducer: {
    trade: tradePriceReducer
  }
});
type TAppDispatch = typeof store.dispatch
export type TAppState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;
