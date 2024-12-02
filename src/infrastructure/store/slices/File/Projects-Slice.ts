import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobDto } from "../../../dtos/JobDto";

interface ProjectState {
  selectedProjects: JobDto[];
}

const initialState: ProjectState = {
  selectedProjects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProjects(state, action: PayloadAction<JobDto[]>) {
      state.selectedProjects = action.payload;
    },
  },
});

export const { setSelectedProjects } = projectsSlice.actions;
export default projectsSlice.reducer;