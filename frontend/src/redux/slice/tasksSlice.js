import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstances';

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
  try {
    const response = await axiosInstance.get('tasks/');
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch tasks!');
    throw error;  
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('tasks/', taskData);
    toast.success('Task added successfully!');
    return response.data;
  } catch (error) {
    toast.error('Failed to add task!');
    return rejectWithValue(error.message);  
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`tasks/${id}`, updatedData);
    toast.success('Task updated successfully!');
    return response.data;
  } catch (error) {
    toast.error('Failed to update task!');
    return rejectWithValue(error.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`tasks/${id}`);
    toast.success('Task deleted successfully!');
    return id;
  } catch (error) {
    toast.error('Failed to delete task!');
    return rejectWithValue(error.message);
  }
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
