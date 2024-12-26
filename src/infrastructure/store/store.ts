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
import ThemeSlice from './slices/GeneralSettings/Theme-Slice';
import  GetQueueItems  from './slices/Information/GetInQueueItem-Slice';
import FeatureCount from './slices/File/FeatureCount-Slice';
import GetAllJobForSearch from './slices/Job/GetAllJobForSearch-Slice';
import GetSearchedItems from './slices/File/SelectedSearchedItem-Slice';
import GetAllBuildingJobs from './slices/Information/GetAllBuildingJobs-Slice';
import GetLastBuildsForInformation from './slices/Information/GetLastBuildsForInformation-Slice';
import GetStartedBuildNotification from './slices/Notification/StartedBuildNotification-Slice';
import GetTestResult from './slices/Test/GetTestResult-Slice';
import GetMockTestResult from './slices/Test/MockTest-Slice';
import TestOpenClose from './slices/Test/TestOpenClose-Slice';

const store = configureStore({
	reducer: {
		getJob: GetJobSlice,
		getRepositoryJob: GetRepositoryJob,
		getBranchJob: GetBranchJob,
		getAllJob: GetAllJob,
		getProjectName: Projects,
		getApiSettings: ApiSettings,
		getSelectedBranchList: SelectedBranchList,
		generalTheme: ThemeSlice,
		getQueueItems: GetQueueItems,
		getFeatureCount: FeatureCount,
		getAllJobForSearch: GetAllJobForSearch,
		getSearchedItems: GetSearchedItems,
		getAllBuildingJobs: GetAllBuildingJobs,
		getLastBuildsForInformation: GetLastBuildsForInformation,
		getStartedBuildNotification: GetStartedBuildNotification,
		getTestResult: GetTestResult,
		getMockTestResult: GetMockTestResult,
		getTestOpenClose: TestOpenClose,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
		immutableCheck: false
	}).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
