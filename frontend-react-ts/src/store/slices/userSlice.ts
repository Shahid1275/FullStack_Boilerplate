import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { userService } from '@/services/userService'
import { User } from '@/types'
import { RootState } from '../store'

interface UserState {
  profile: User | null
  users: User[]
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  profile: null,
  users: [],
  isLoading: false,
  error: null,
}

// Async Thunks
export const fetchUserProfile = createAsyncThunk<User>(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getProfile()
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateUserProfile = createAsyncThunk<User, Partial<User>>(
  'user/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userService.updateProfile(userData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null
    },
    setUserProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearUserError, setUserProfile } = userSlice.actions

// Selectors
export const selectUserProfile = (state: RootState) => state.user.profile
export const selectUserLoading = (state: RootState) => state.user.isLoading
export const selectUserError = (state: RootState) => state.user.error

export default userSlice.reducer
