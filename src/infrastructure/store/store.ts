import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import GetJobSlice from './slices/Job/GetJob-Slice';
import GetAllJob  from './slices/Job/GetAllJob-Slice';
import Projects  from './slices/File/Projects-Slice';
import  GetRepositoryJob  from './slices/Job/GetRepositoryJob-Slice';


const store = configureStore({
	reducer: {
		getJob: GetJobSlice,
		getRepositoryJob: GetRepositoryJob,
		getAllJob: GetAllJob,
		getProjectName: Projects,

	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
