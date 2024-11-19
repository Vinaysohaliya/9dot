import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loadFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const filterStatus = localStorage.getItem('filterStatus') || 'All';
  return { tasks, filteredTasks: tasks, filterStatus };
};

const saveToLocalStorage = (tasks, filterStatus) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('filterStatus', filterStatus);
};

const initialState = loadFromLocalStorage();

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:5000/api/tasks'); 
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  const response = await axios.post('http://localhost:5000/api/tasks', taskData);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updatedData }) => {
  const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedData);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`http://localhost:5000/api/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilterStatus(state, action) {
      const status = action.payload;
      state.filterStatus = status;
      state.filteredTasks = status === 'All'
        ? state.tasks
        : state.tasks.filter(task => task.status === status);

      saveToLocalStorage(state.tasks, state.filterStatus);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.filteredTasks = action.payload;

        saveToLocalStorage(state.tasks, state.filterStatus);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.filteredTasks.push(action.payload);

        saveToLocalStorage(state.tasks, state.filterStatus);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          state.filteredTasks[index] = action.payload;
        }

        saveToLocalStorage(state.tasks, state.filterStatus);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        state.filteredTasks = state.filteredTasks.filter(task => task.id !== action.payload);

        saveToLocalStorage(state.tasks, state.filterStatus);
      });
  }
});

export const { setFilterStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
