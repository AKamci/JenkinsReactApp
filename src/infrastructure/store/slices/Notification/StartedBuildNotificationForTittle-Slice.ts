import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobDto } from "../../../dtos/JobDto";

interface StartedBuildNotificationState {
  buildingJobs: JobDto[];
}

const initialState: StartedBuildNotificationState = {
  buildingJobs: [],
};

const startedBuildNotificationForTittleSlice = createSlice({
  name: "startedBuildNotificationForTittle",
  initialState,
  reducers: {
    addBuildingJobForTittle: (state, action: PayloadAction<JobDto>) => {
      const jobExists = state.buildingJobs.some(job => 
        job.url === action.payload.url && 
        job.name === action.payload.name
      );
      if (!jobExists) {
        state.buildingJobs.push(action.payload);
      }
    },
    removeBuildingJobForTittle: (state, action: PayloadAction<JobDto>) => {
      state.buildingJobs = state.buildingJobs.filter(
        job => !(job.url === action.payload.url && job.name === action.payload.name)
      );
    },
  }
});

export const { addBuildingJobForTittle, removeBuildingJobForTittle } = startedBuildNotificationForTittleSlice.actions;
export default startedBuildNotificationForTittleSlice.reducer;
