import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiState from "../../../Enums/ApiState";
import axios from "axios";
import { QueueDto } from "../../../dtos/QueueDto";
import apiEndpoints from "../../../helpers/api-endpoints";

export interface BuildState {
    builds: QueueDto;
    state: ApiState;
    activeRequest: number | null;
    responseStatus: number | null; 
    errorMessage: string | null;   
}

const initialState: BuildState = { 
    builds: {} as QueueDto,
    state: ApiState.Idle, 
    activeRequest: null, 
    responseStatus: null, 
    errorMessage: null    
};

export const getQueueItems = createAsyncThunk<
QueueDto,
    void,
    { rejectValue: string }
>(
    'queue',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<QueueDto>( 
                apiEndpoints.Information.GetQueueItemList,
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
            console.log("API Yanıtı:", response.data); 
            return response.data; 
        } catch (error: any) {
            const status = error.response ? error.response.status : 500;
            const message = error.response?.data?.message || "Bir hata meydana geldi";
            return rejectWithValue(message);
        }
    }
);

const GetQueueItemList = createSlice({
    name: 'getQueueItems',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getQueueItems.pending, (state) => {
            state.state = ApiState.Pending;
            state.responseStatus = null; 
            state.errorMessage = null;   
        });
        builder.addCase(getQueueItems.fulfilled, (state, action) => {
            console.log("Queue verisi Redux'a geldi:", action.payload);
            state.builds = action.payload;
            state.state = ApiState.Fulfilled;
            state.responseStatus = 200;  
            state.errorMessage = null;   
        });
        builder.addCase(getQueueItems.rejected, (state, action) => {
            state.state = ApiState.Rejected;
            state.errorMessage = action.payload || "Bilinmeyen bir hata oluştu";
            state.responseStatus = action.meta.requestStatus === 'rejected' ? 500 : null;
        });
    },
    reducers: {
        resetBuildState: (state) => {
            state.builds = {} as QueueDto;
            state.state = ApiState.Idle;
            state.responseStatus = null;
            state.errorMessage = null;
        },
    },
});

export const { resetBuildState } = GetQueueItemList.actions;

export default GetQueueItemList.reducer;
