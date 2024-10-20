import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const initialState = {
  data: [],
  filters: {
    age: null,
    gender: null,
    dateRange: null,
  },
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("data/fetch", async () => {
  try {
    const response = await axios.get(`${API_URL}/api/data`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const selectFilteredData = (state) => {
  const { data, filters } = state.data;
  let filteredData = data;

  // Apply age filter
  if (filters.age) {
    filteredData = filteredData.filter((item) => item.age === filters.age);
  }

  // Apply gender filter
  if (filters.gender) {
    filteredData = filteredData.filter(
      (item) => item.gender === filters.gender
    );
  }

  // Apply date range filter
  if (filters.dateRange) {
    const [startDate, endDate] = filters.dateRange;
    const startDateObj = new Date(startDate);
    const startDay = startDateObj.getDate();
    const endDateObj = new Date(endDate);
    const endDay = endDateObj.getDate();

    filteredData = filteredData.filter((item) => {
      const [day] = item.day.split("/");
      const extractedDay = day;

      const isWithinRange = extractedDay >= startDay && extractedDay <= endDay;

      return isWithinRange;
    });
  }

  return filteredData;
};

export const { setFilters, clearFilters } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
