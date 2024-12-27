import axios from 'axios';
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import ApiEndpoints from '../../../helpers/api-endpoints';
import { JobDto } from '../../../dtos/JobDto';


export interface JobState {
    data: JobDto[];
    state: ApiState;
    activeRequest: number | null;
    responseStatus: number | null; 
    errorMessage: string | null;   
}

const initialState = { 
    state: ApiState.Idle, 
    activeRequest: null, 
    data: [] as JobDto[], 
    responseStatus: null, 
    errorMessage: null    
} as JobState;



export const getAllBuildingJobs = createAsyncThunk<JobDto[], void, { state: JobState }>(
    'getAllBuildingJobs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<JobDto[]>(ApiEndpoints.Job.GetAllBuildingJobs, {
                auth: {
                    username: import.meta.env.VITE_JENKINS_USERNAME,
                    password: import.meta.env.VITE_JENKINS_TOKEN,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                transformResponse: [(data) => {
                    const parsedData = JSON.parse(data);
                    return parsedData;
                }],
                withCredentials: true,
            });
            return response.data;
        }catch (error: any) {
            const status = error.response ? error.response.status : 500; 
            const message = error.response?.data?.message || 
                            (status === 0 ? "CORS Error: Unable to reach server" : "An error occurred");
            return rejectWithValue({ status, message });
        }
    }
);

const getAllBuildingJobsSlice = createSlice({
    name: 'getAllBuildingJobs',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllBuildingJobs.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(getAllBuildingJobs.fulfilled, (state, action) => {
            state.data = action.payload;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(getAllBuildingJobs.rejected, (state, action) => {
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
            state.data = [] as JobDto[]; 
            state.state = ApiState.Idle;
            state.responseStatus = null;
            state.errorMessage = null;
        },
    },
});

export const { setActiveRequest, resetJobState } = getAllBuildingJobsSlice.actions;

export default getAllBuildingJobsSlice.reducer;
