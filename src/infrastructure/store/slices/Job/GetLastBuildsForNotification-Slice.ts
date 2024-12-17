import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiState from "../../../Enums/ApiState";
import axios from "axios";
import { NotificationBuildDto } from "../../../dtos/NotificationBuildDto";

export interface BuildState {
    builds: NotificationBuildDto[];
    state: ApiState;
    activeRequest: number | null;
    responseStatus: number | null; 
    errorMessage: string | null;   
}

const initialState: BuildState = { 
    builds: [],
    state: ApiState.Idle, 
    activeRequest: null, 
    responseStatus: null, 
    errorMessage: null    
};

export const getLastBuildsForNotification = createAsyncThunk<
NotificationBuildDto[],
    void,
    { rejectValue: string }
>(
    'job/getLastBuildsForNotification',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<{ builds: NotificationBuildDto[] }>(
                'http://localhost:8080/api/json?tree=builds[number,url,result,timestamp,duration]{0,10}',
                {
                    auth: {
                        username: "admin",
                        password: "110ab84a7c0f09acbbd4aa6affd5c13c3c",
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data.builds;
        } catch (error: any) {
            const status = error.response ? error.response.status : 500;
            const message = error.response?.data?.message || "Bir hata meydana geldi";
            return rejectWithValue(message);
        }
    }
);

const GetLastBuildsForNotificationSlice = createSlice({
    name: 'getLastBuildsForNotification',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getLastBuildsForNotification.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(getLastBuildsForNotification.fulfilled, (state, action) => {
            state.builds = action.payload;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(getLastBuildsForNotification.rejected, (state, action) => {
            state.state = ApiState.Rejected;
            state.errorMessage = action.payload || "Bilinmeyen bir hata oluştu";
            state.responseStatus = action.meta.requestStatus === 'rejected' ? 500 : null;
        });
    },
    reducers: {
        resetBuildState: (state) => {
            state.builds = [];
            state.state = ApiState.Idle;
            state.responseStatus = null;
            state.errorMessage = null;
        },
    },
});

export const { resetBuildState } = GetLastBuildsForNotificationSlice.actions;

export default GetLastBuildsForNotificationSlice.reducer;
