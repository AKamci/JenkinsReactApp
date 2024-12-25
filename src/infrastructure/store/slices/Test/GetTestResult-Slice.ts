import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import Endpoints from '../../../helpers/api-endpoints';
import { TestResultDto } from '../../../dtos/TestResultDto';

export interface TestResultState {
    data: { [url: string]: TestResultDto };
    state: ApiState;
    activeRequest: number | null;
    responseStatus: number | null; 
    errorMessage: string | null;   
}

const initialState: TestResultState = { 
    state: ApiState.Idle, 
    activeRequest: null, 
    data: {},  
    responseStatus: null, 
    errorMessage: null    
};

export const GetTestResult = createAsyncThunk<TestResultDto, { url: string }, { state: TestResultState }>(
    'getTestResult',
    async ({ url }, { rejectWithValue }) => {
        try {
            const response = await axios.get<TestResultDto>(Endpoints.Test.GetTest(url), {
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

const GetTestResultSlice = createSlice({
    name: 'getTestResult',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(GetTestResult.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(GetTestResult.fulfilled, (state, action) => {
            state.data = {
                ...state.data,
                [action.meta.arg.url]: action.payload
            };
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(GetTestResult.rejected, (state, action) => {
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
        resetTestResultState: (state) => {
            state.data = {}; 
            state.state = ApiState.Idle;
            state.responseStatus = null;
            state.errorMessage = null;
        },
    },
});

export const { setActiveRequest, resetTestResultState } = GetTestResultSlice.actions;
export default GetTestResultSlice.reducer;