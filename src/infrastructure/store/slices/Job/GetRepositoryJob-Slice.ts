import axios from 'axios';
import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import Endpoints from '../../../Helpers/Api-Endpoints';
import { JobDto } from '../../../dtos/JobDto';
import { BaseDto } from '../../../dtos/BaseDto';


export interface BaseState {
    data: BaseDto;
    state: ApiState;
    activeRequest: number | null;
    responseStatus: number | null; 
    errorMessage: string | null;   
}

const initialState = { 
    state: ApiState.Idle, 
    activeRequest: null, 
    data: {} as BaseDto, 
    responseStatus: null, 
    errorMessage: null    
} as BaseState;

export const GetRepositoryJob = createAsyncThunk<BaseDto, { jobName: string }, { state: BaseState }>(
    'getJob',
    async ({ jobName }, { rejectWithValue }) => {
        console.log("jobName : ")
        console.log(jobName)
        
        try {
            const response = await axios.get<BaseDto>(Endpoints.Job.GetRepository_Name_Url(jobName), {
                auth: {
                    username: "admin",
                    password: "110ab84a7c0f09acbbd4aa6affd5c13c3c",
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Status:", response.status);
            return response.data;
        } catch (error: any) {
            
            const status = error.response ? error.response.status : 500; 
            const message = error.response?.data?.message || "An error occurred";
            console.error("Error status:", status, "Message:", message);
            return rejectWithValue({ status, message });
        }
    }
);

const GetJobSlice = createSlice({
    name: 'getRepositoryJob',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(GetRepositoryJob.pending, (state, action) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(GetRepositoryJob.fulfilled, (state, action) => {
            console.log("Müşteri verisi Redux'a geldi:", action.payload);
            state.data = action.payload;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(GetRepositoryJob.rejected, (state, action) => {
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
            state.data = {} as BaseDto; 
            state.state = ApiState.Idle;
            state.responseStatus = null;
            state.errorMessage = null;
        },
    },
});

export const { setActiveRequest, resetJobState } = GetJobSlice.actions;

export default GetJobSlice.reducer;
