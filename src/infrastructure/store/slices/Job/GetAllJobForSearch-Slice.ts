import axios from 'axios';
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import ApiEndpoints from '../../../helpers/api-endpoints';
import { JobDto } from '../../../dtos/JobDto';


export interface JobForSearchState {
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
} as JobForSearchState;



export const getAllJobForSearch = createAsyncThunk<JobDto, void, { state: JobForSearchState }>(
    'getAllJobForSearch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<JobDto>(ApiEndpoints.Job.GetAllForSearch, {
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

const getAllJobForSearchSlice = createSlice({
    name: 'getJob',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllJobForSearch.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(getAllJobForSearch.fulfilled, (state, action) => {
            state.data = action.payload;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(getAllJobForSearch.rejected, (state, action) => {
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

export const { setActiveRequest, resetJobState } = getAllJobForSearchSlice.actions;

export default getAllJobForSearchSlice.reducer;
