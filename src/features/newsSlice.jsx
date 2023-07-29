import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    news: [],
    loading:false,
}

export const getNews = createAsyncThunk(
  "getNews",
  
  async (thunkAPI,{rejectWithValue})=>{
    const API_KEY = "a938b445b5904c49a248d5866612277e"
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`

      try {
        const {data} = await axios(url)
        return data.articles
      } catch (error) {
        console.log(error)  
        return rejectWithValue("somethink went wrong")
      }
  }
)

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNews : (state) => {
        state.news = []
    }
  },

  extraReducers:(builder)=>{
    builder.addCase(getNews.pending,(state)=>{
      state.loading= true
    }).addCase(getNews.fulfilled, (state,action)=>{
      state.news = action.payload
      state.loading=false
    }).addCase(getNews.rejected, (state,action)=>{
      state.loading=false
      state.error = action.payload
    })
  }
});

export const {clearNews} = newsSlice.actions

export default newsSlice.reducer