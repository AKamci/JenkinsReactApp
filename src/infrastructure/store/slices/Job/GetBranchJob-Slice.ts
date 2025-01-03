import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import Endpoints from '../../../helpers/api-endpoints';
import { JobDto } from '../../../dtos/JobDto';

export interface JobState {
    data: Record<string, JobDto>; 
    state: ApiState;
    activeRequest: number | null;
    responseStatus: number | null; 
    errorMessage: string | null;   
}

const initialState: JobState = { 
    state: ApiState.Idle, 
    activeRequest: null, 
    data: {},  
    responseStatus: null, 
    errorMessage: null    
};

export const GetBranchJob = createAsyncThunk<JobDto, { jobName: string, jobName2:string, apiSettings:string[] }, { state: JobState }>(
    'getBranchJob',
    async ({ jobName, jobName2, apiSettings }, { rejectWithValue }) => {
        try {
            const response = await axios.get<JobDto>(Endpoints.Job.GetBranch_Name_Url(jobName, jobName2, apiSettings), {
                auth: {
                    username: import.meta.env.VITE_JENKINS_USERNAME,
                    password: import.meta.env.VITE_JENKINS_TOKEN,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error: any) {
            const status = error.response ? error.response.status : 500; 
            const message = error.response?.data?.message || "An error occurred";
            return rejectWithValue({ status, message });
        }
    }
);

const GetBranchJobSlice = createSlice({
    name: 'getJob',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(GetBranchJob.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(GetBranchJob.fulfilled, (state, action) => {
            const jobName2 = action.meta.arg.jobName2;
            state.data[jobName2] = action.payload; 
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(GetBranchJob.rejected, (state, action) => {
            state.state = ApiState.Rejected;
            if (action.payload) {
                state.responseStatus = (action.payload as any).status;  
                state.errorMessage = (action.payload as any).message;   
            } else {
                state.responseStatus = null; 
                state.errorMessage = "Unknown error occurred"; 
            }
        });
    },
    reducers: {
        setActiveRequest: (state, action) => {
            state.activeRequest = action.payload;
        },
        resetJobState: (state) => {
            state.data = {}; 
            state.state = ApiState.Idle;
            state.responseStatus = null;
            state.errorMessage = null;
        },
    },
});

export const { setActiveRequest, resetJobState } = GetBranchJobSlice.actions;
export default GetBranchJobSlice.reducer;