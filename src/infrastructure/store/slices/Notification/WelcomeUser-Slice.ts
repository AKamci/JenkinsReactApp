import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiState from "../../../Enums/ApiState";
import Endpoints from '../../../helpers/api-endpoints';
import { WelcomeUserDto } from '../../../dtos/WelcomeUserDto';
import { UserDetailsDto } from '../../../dtos/UserDetailsDto';

interface WelcomeUserState {
    message: WelcomeUserDto | null;
    userDetails: UserDetailsDto | null;
    state: ApiState;
    responseStatus: number | null;
    errorMessage: string | null;
}

const initialState: WelcomeUserState = {
    message: null,
    userDetails: null,
    state: ApiState.Idle,
    responseStatus: null,
    errorMessage: null
};

export const GetWelcomeUser = createAsyncThunk<
    { welcomeUser: WelcomeUserDto; userDetails: UserDetailsDto },
    void,
    { state: WelcomeUserState }
>(
    'getWelcomeUser',
    async (_, { rejectWithValue }) => {
        try {
            const welcomeResponse = await axios.get<WelcomeUserDto>(Endpoints.Welcome.GetWelcomeUser, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            const userDetailsResponse = await axios.get<UserDetailsDto>(
                Endpoints.Welcome.GetUserDetails(welcomeResponse.data.name),
                {
                    auth: {
                        username: import.meta.env.VITE_JENKINS_USERNAME,
                        password: import.meta.env.VITE_JENKINS_TOKEN,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            return {
                welcomeUser: welcomeResponse.data,
                userDetails: userDetailsResponse.data
            };
        } catch (error: any) {
            const status = error.response ? error.response.status : 500;
            const message = error.response?.data?.message || "Bir hata oluştu";
            console.error('Hata:', message);
            return rejectWithValue({ status, message });
        }
    }
);

const WelcomeUserSlice = createSlice({
    name: 'welcomeUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetWelcomeUser.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null;
            state.errorMessage = null;
        });
        builder.addCase(GetWelcomeUser.fulfilled, (state, action) => {
            state.message = action.payload.welcomeUser;
            state.userDetails = action.payload.userDetails;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;
            state.errorMessage = null;
        });
        builder.addCase(GetWelcomeUser.rejected, (state, action) => {
            state.state = ApiState.Rejected;
            if (action.payload) {
                state.responseStatus = (action.payload as any).status;
                state.errorMessage = (action.payload as any).message;
            } else {
                state.responseStatus = null;
                state.errorMessage = "Bilinmeyen bir hata oluştu";
            }
        });
    },
});

export default WelcomeUserSlice.reducer;
