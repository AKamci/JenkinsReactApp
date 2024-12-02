import axios from 'axios';
import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import Endpoints from '../../../Helpers/Api-Endpoints';
import { JobDto } from '../../../dtos/JobDto';


export interface JobState {
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
} as JobState;

export const getAllJob = createAsyncThunk<JobDto, void, { state: JobState }>(
    'getAllJob',
    async (_, { rejectWithValue }) => {
        console.log("Fetching all jobs");
        
        try {
            const response = await axios.get<JobDto>(Endpoints.Job.GetAll_NameColor, {
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
            state.data = {} as JobDto; 
            state.state = ApiState.Idle;
            state.responseStatus = null;
            state.errorMessage = null;
        },
    },
});

export const { setActiveRequest, resetJobState } = getAllJobSlice.actions;

export default getAllJobSlice.reducer;
