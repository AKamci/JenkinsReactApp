import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
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

export const GetMockTestResult = createAsyncThunk<
    { url: string; data: TestResultDto }, 
    { url: string }, 
    { state: TestResultState }
>(
    'getTestResult',
    async ({ url }, { rejectWithValue }) => {
        try {
            const response = await axios.get<TestResultDto>('http://127.0.0.1:5000/test-results', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return { url, data: response.data };
        } catch (error: any) {
            const status = error.response ? error.response.status : 500; 
            const message = error.response?.data?.message || "An error occurred";
            return rejectWithValue({ status, message });
        }
    }
);

const GetMockTestResultSlice = createSlice({
    name: 'getTestResult',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(GetMockTestResult.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(GetMockTestResult.fulfilled, (state, action) => {
            state.data = {
                ...state.data,
                [action.payload.url]: action.payload.data
            };
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(GetMockTestResult.rejected, (state, action) => {
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

export const { setActiveRequest, resetTestResultState } = GetMockTestResultSlice.actions;
export default GetMockTestResultSlice.reducer;