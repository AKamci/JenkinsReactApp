import axios from 'axios';
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import ApiEndpoints from '../../../helpers/api-endpoints';
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



export const getAllJob = createAsyncThunk<BaseDto, void, { state: BaseState }>(
    'getAllJob',
    async (_, { rejectWithValue }) => {
        console.log("Fetching all jobs");
        
        try {
            const response = await axios.get<BaseDto>(ApiEndpoints.Job.GetAll_Name, {
                auth: {
                    username: import.meta.env.VITE_JENKINS_USERNAME,
                    password: import.meta.env.VITE_JENKINS_TOKEN,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log("Status:", response.status);
            return response.data;
        }catch (error: any) {
            const status = error.response ? error.response.status : 500; 
            const message = error.response?.data?.message || 
                            (status === 0 ? "CORS Error: Unable to reach server" : "An error occurred");
            console.error("Error status:", status, "Message:", message);
            return rejectWithValue({ status, message });
        }
    }
);

const getAllJobSlice = createSlice({
    name: 'getJob',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllJob.pending, (state, action) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(getAllJob.fulfilled, (state, action) => {
            console.log("Müşteri verisi Redux'a geldi:", action.payload);
            state.data = action.payload;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(getAllJob.rejected, (state, action) => {
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

export const { setActiveRequest, resetJobState } = getAllJobSlice.actions;

export default getAllJobSlice.reducer;
