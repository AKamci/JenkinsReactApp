import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import GetJobSlice from './slices/Job/GetJob-Slice';
import GetAllJob  from './slices/Job/GetAllJob-Slice';
import Projects  from './slices/File/Projects-Slice';
import ApiSettings  from './slices/File/ApiSettings-Slice';
import  GetRepositoryJob  from './slices/Job/GetRepositoryJob-Slice';
import  GetBranchJob  from './slices/Job/GetBranchJob-Slice';
import SelectedBranchList from './slices/File/SelectedBranchList-Slice';
import GetLastBuildsForNotification from './slices/Job/GetLastBuildsForNotification-Slice';

const store = configureStore({
	reducer: {
		getJob: GetJobSlice,
		getRepositoryJob: GetRepositoryJob,
		getBranchJob: GetBranchJob,
		getAllJob: GetAllJob,
		getProjectName: Projects,
		getApiSettings: ApiSettings,
		getSelectedBranchList: SelectedBranchList,
		getLastBuildsForNotification: GetLastBuildsForNotification,

	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
