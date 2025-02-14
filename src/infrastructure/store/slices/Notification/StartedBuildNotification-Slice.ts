import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobDto } from "../../../dtos/JobDto";

interface StartedBuildNotificationState {
  buildingJobs: JobDto[];
}

const initialState: StartedBuildNotificationState = {
  buildingJobs: [],
};

const startedBuildNotificationSlice = createSlice({
  name: "startedBuildNotification",
  initialState,
  reducers: {
    addBuildingJob: (state, action: PayloadAction<JobDto>) => {
      const jobExists = state.buildingJobs.some(job => 
        job.url === action.payload.url && 
        job.name === action.payload.name
      );
      if (!jobExists) {
        state.buildingJobs.push(action.payload);
      }
    },
    removeBuildingJob: (state, action: PayloadAction<JobDto>) => {
      state.buildingJobs = state.buildingJobs.filter(
        job => !(job.url === action.payload.url && job.name === action.payload.name)
      );
    },
  }
});

export const { addBuildingJob, removeBuildingJob } = startedBuildNotificationSlice.actions;
export default startedBuildNotificationSlice.reducer;
