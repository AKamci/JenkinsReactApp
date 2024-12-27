import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import Endpoints from '../../../helpers/api-endpoints';
import { GlobalSystemMessageDto } from '../../../dtos/GlobalSystemMessageDto';

interface GlobalSystemMessageState {
    message: GlobalSystemMessageDto | null;
    state: ApiState;
    responseStatus: number | null;
    errorMessage: string | null;
}

const initialState: GlobalSystemMessageState = {
    message: null,
    state: ApiState.Idle,
    responseStatus: null,
    errorMessage: null
};

export const GetGlobalSystemMessage = createAsyncThunk<
    GlobalSystemMessageDto,
    void,
    { state: GlobalSystemMessageState }
>(
    'getGlobalSystemMessage',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<GlobalSystemMessageDto>(Endpoints.Notification.GetNotification, {
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

const GlobalSystemMessageSlice = createSlice({
    name: 'globalSystemMessage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetGlobalSystemMessage.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null;
            state.errorMessage = null;
        });
        builder.addCase(GetGlobalSystemMessage.fulfilled, (state, action) => {
            state.message = action.payload;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;
            state.errorMessage = null;
        });
        builder.addCase(GetGlobalSystemMessage.rejected, (state, action) => {
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
});

export default GlobalSystemMessageSlice.reducer;
