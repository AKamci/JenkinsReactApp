import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import Endpoints from '../../../helpers/api-endpoints';
import { WelcomeUserDto } from '../../../dtos/WelcomeUserDto';

interface WelcomeUserState {
    message: WelcomeUserDto | null;
    state: ApiState;
    responseStatus: number | null;
    errorMessage: string | null;
}

const initialState: WelcomeUserState = {
    message: null,
    state: ApiState.Idle,
    responseStatus: null,
    errorMessage: null
};

export const GetGlobalSystemMessage = createAsyncThunk<
    WelcomeUserDto,
    void,
    { state: WelcomeUserState }
>(
    'getWelcomeUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<WelcomeUserDto>(Endpoints.Welcome.GetWelcomeUser, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            console.log('Welcome User Response:', response.data);
            return response.data;
        } catch (error: any) {
            const status = error.response ? error.response.status : 500;
            const message = error.response?.data?.message || "An error occurred";
            return rejectWithValue({ status, message });
        }
    }
);

const WelcomeUserSlice = createSlice({
    name: 'welcomeUser',
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

export default WelcomeUserSlice.reducer;
