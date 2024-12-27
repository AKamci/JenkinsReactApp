import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiState from "../../../Enums/ApiState";
import axios from "axios";
import { JobDto } from "../../../dtos/JobDto";
import apiEndpoints from "../../../helpers/api-endpoints";

export interface BuildState {
    builds: JobDto[];
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

export const getLastBuildsForInformation = createAsyncThunk<
    JobDto[],
    void,
    { rejectValue: string }
>(
    'job/getLastBuildsForNotification',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<JobDto[]>(
                apiEndpoints.Information.GetLastBuildsForInformation,
                {
                    auth: {
                        username: import.meta.env.VITE_JENKINS_USERNAME,
                        password: import.meta.env.VITE_JENKINS_TOKEN,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Bir hata meydana geldi";
            return rejectWithValue(message);
        }
    }
);

const GetLastBuildsForInformationSlice = createSlice({
    name: 'getLastBuildsForInformation',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getLastBuildsForInformation.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(getLastBuildsForInformation.fulfilled, (state, action) => {
            state.builds = action.payload;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(getLastBuildsForInformation.rejected, (state, action) => {
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

export const { resetBuildState } = GetLastBuildsForInformationSlice.actions;

export default GetLastBuildsForInformationSlice.reducer;
