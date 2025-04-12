import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      if (!response.ok) {
        throw new Error('Ошибка загрузки пользователей');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${id}`);
      if (!response.ok) {
        throw new Error('Пользователь не найден');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);