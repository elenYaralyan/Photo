import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  data: [],
  loading: false,
  status: ""
}

export const getPhotosAsync = createAsyncThunk("photo/getPhoto", async (url) => {
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    return data

  }
  throw new Error("Something went wrong")
})

export const deletePhotoAsync = createAsyncThunk("photo/deletePhoto", async ({ API_URL, item }) => {
  const response = await fetch(`${API_URL}/${item.id}`, { method: "DELETE" })
  if (response.ok) {
    const data = await response.json()
    return data
  }
  throw new Error("Something went wrong")
})

export const addPhotoAsync = createAsyncThunk("photo/addPhoto", async ({ API_URL, item },) => {
  const response = await fetch(API_URL, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(item)
  })
  if (response.ok) {
    const data = await response.json()
    return data
  }
  throw new Error('REQUEST ERROR !!!')
})

export const editPhotoAsync = createAsyncThunk("photo/editPhoto", async ({ API_URL, edited }) => {
  const response = await fetch(`${API_URL}/${edited.id}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(edited),
  })
  if (response.ok) {
    const data = await response.json()
    return data
  }
})

const setErr = (state) => {
  state.status = "rejected"
  state.loading = false
}
const pending = (state, action) => {
  state.status = "loading"
  state.loading = true
}

const mainSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotosAsync.pending, pending)
      .addCase(getPhotosAsync.fulfilled, (state, action) => {
        state.status = "resolved"
        state.loading = false
        state.data = action.payload
      })
      .addCase(getPhotosAsync.rejected, setErr)
      .addCase(deletePhotoAsync.pending, pending)
      .addCase(deletePhotoAsync.fulfilled, (state, action) => {
        state.status = "resolved"
        state.loading = false
        state.data = state.data.filter(item => item.id !== action.payload.id)
      })
      .addCase(deletePhotoAsync.rejected, setErr)
      .addCase(addPhotoAsync.pending, pending)
      .addCase(addPhotoAsync.fulfilled, (state, action) => {
        state.status = "resolved"
        state.loading = false
        state.data.push({
          createdAt: new Date().toString(),
          avatar: action.payload.avatar,
          name: action.payload.name,
          id: uuid()
        })
      })
      .addCase(addPhotoAsync.rejected, setErr)
      .addCase(editPhotoAsync.pending, pending)
      .addCase(editPhotoAsync.fulfilled, (state, action) => {
        state.status = "resolved"
        state.loading = false
        state.data = state.data.map(item => {
          if (item.id === action.payload.id) {
            console.log(action.payload);
            item.name = action.payload.name;
            item.avatar = action.payload.avatar
          }
          return item
        })
      })
      .addCase(editPhotoAsync.rejected, setErr)
  }
})

export const { } = mainSlice.actions
export default mainSlice.reducer






