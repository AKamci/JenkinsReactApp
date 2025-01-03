import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import Endpoints from '../../../helpers/api-endpoints';
import { BaseDto } from '../../../dtos/BaseDto';

export interface JobState {
    jobs: BaseDto;
    state: ApiState;
    responseStatus: number | null;
    errorMessage: string | null;
}

export interface GroupedJobState {
    [groupName: string]: JobState;
}

const initialState: GroupedJobState = {};

export const GetRepositoryJob = createAsyncThunk<
    { groupName: string; jobs: BaseDto }, 
    { jobName: string; groupName: string, apiSettings:string[] },
    { state: GroupedJobState }
>(
    'getRepositoryJob',
    async ({ jobName, groupName, apiSettings }, { rejectWithValue }) => {
        try {
            const response = await axios.get<BaseDto>(Endpoints.Job.GetRepository_Name_Url(jobName, apiSettings), {
                auth: {
                    username: import.meta.env.VITE_JENKINS_USERNAME,
                    password: import.meta.env.VITE_JENKINS_TOKEN,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return { groupName, jobs: response.data };
        } catch (error: any) {
            const status = error.response ? error.response.status : 500;
            const message = error.response?.data?.message || "An error occurred";
            return rejectWithValue({ groupName, status, message });
        }
    }
);

const GetRepositoryJobSlice = createSlice({
    name: 'getRepositoryJob',
    initialState,
    reducers: {
        resetJobState: (state, action: PayloadAction<string>) => {
            const groupName = action.payload;
            if (state[groupName]) {
                state[groupName] = {
                    jobs: {} as BaseDto,
                    state: ApiState.Idle,
                    responseStatus: null,
                    errorMessage: null,
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GetRepositoryJob.pending, (state, action) => {
            const groupName = action.meta.arg.groupName;
            if (!state[groupName]) {
                state[groupName] = {
                    jobs: {} as BaseDto,
                    state: ApiState.Idle,
                    responseStatus: null,
                    errorMessage: null,
                };
            }
            state[groupName].state = ApiState.Pending;
            state[groupName].responseStatus = null;
            state[groupName].errorMessage = null;
        });
        builder.addCase(GetRepositoryJob.fulfilled, (state, action) => {
            const { groupName, jobs } = action.payload;
            state[groupName].jobs = jobs;
            state[groupName].state = ApiState.Fulfilled;
            state[groupName].responseStatus = 200;
            state[groupName].errorMessage = null;
        });
        builder.addCase(GetRepositoryJob.rejected, (state, action) => {
            const groupName = action.meta.arg.groupName;
            if (state[groupName]) {
                state[groupName].state = ApiState.Rejected;
                if (action.payload) {
                    state[groupName].responseStatus = (action.payload as any).status;
                    state[groupName].errorMessage = (action.payload as any).message;
                } else {
                    state[groupName].responseStatus = null;
                    state[groupName].errorMessage = "Unknown error occurred";
                }
            }
        });
    },
});

export const { resetJobState } = GetRepositoryJobSlice.actions;

export default GetRepositoryJobSlice.reducer;
