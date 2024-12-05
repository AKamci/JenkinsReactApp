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
      console.log(action.payload)
      state.selectedProjects = action.payload;
    },
    addSelectedProject(state, action: PayloadAction<JobDto>) {
      if (!state.selectedProjects.some(project => project.name === action.payload.name)) {
        state.selectedProjects.push(action.payload);
      }
    },
    removeSelectedProject(state, action: PayloadAction<string>) {
      console.log("Removed Group")
      console.log("Action Payload:", action.payload);
      console.log("Before Removal:", state.selectedProjects);
      state.selectedProjects = state.selectedProjects.filter(
        project => project.name !== action.payload
      );
      console.log(state.selectedProjects)
    },
    clearSelectedProjects(state) {
      state.selectedProjects = [];
    },
  },
});

export const {
  setSelectedProjects,
  addSelectedProject,
  removeSelectedProject,
  clearSelectedProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;