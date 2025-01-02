import axios from 'axios';
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import ApiEndpoints from '../../../helpers/api-endpoints';
import { JobDto } from '../../../dtos/JobDto';


export interface JobForControlState {
    data: JobDto;
    state: ApiState;
    activeRequest: number | null;
    responseStatus: number | null; 
    errorMessage: string | null;   
}

const initialState = { 
    state: ApiState.Idle, 
    activeRequest: null, 
    data: {} as JobDto, 
    responseStatus: null, 
    errorMessage: null    
} as JobForControlState;



export const getAllJobForControl = createAsyncThunk<JobDto, void, { state: JobForControlState }>(
    'getAllJobForControl',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<JobDto>(ApiEndpoints.Job.GetAllForControl, {
                auth: {
                    username: import.meta.env.VITE_JENKINS_USERNAME,
                    password: import.meta.env.VITE_JENKINS_TOKEN,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
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

const getAllJobForControlSlice = createSlice({
    name: 'getJobForControl',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllJobForControl.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(getAllJobForControl.fulfilled, (state, action) => {
            console.log(action.payload);
            state.data = action.payload;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(getAllJobForControl.rejected, (state, action) => {
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
            state.data = {} as JobDto; 
            state.state = ApiState.Idle;
            state.responseStatus = null;
            state.errorMessage = null;
        },
    },
});

export const { setActiveRequest, resetJobState } = getAllJobForControlSlice.actions;

export default getAllJobForControlSlice.reducer;
