import { createSlice, current } from "@reduxjs/toolkit";

// export const getNewsByKeyword = createAsyncThunk(
//   'memo/getNewsByKeyword',
//   async (keyword, { rejectWithValue }) => {
//     try {
//       const response = await useGetNewsByKeywordQuery(keyword);
//     } catch (err) {
//       console.log(rejectWithValue(err.response.data));
//     }
//     // return response.data;
//   }
// );

/**
 * mode: ['LIST': 메모 목록, 'WRITE': 메모 작성, 'SAVE': 메모 저장중, 'MODIFY': 메모 수정]
 */
const initialState = {
  mode: 'LIST',
  memoList: [],
  memoDetail: {},
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    write: (state, action) => {
      state.memoList.push(action.payload);
      localStorage.setItem('memoList', JSON.stringify(current(state.memoList)));
    },
    modify: (state, { payload: modifyMemo }) => {
      const memo = state.memoList.find(memo => memo.id === modifyMemo.id);
      memo.title = modifyMemo.title;
      memo.desc = modifyMemo.desc;
      localStorage.setItem('memoList', JSON.stringify(current(state.memoList)));
    },
    fixed: (state, { payload: id }) => {
      const memo = state.memoList.find(memo => memo.id === id);
      memo.fixed = !memo.fixed;
      localStorage.setItem('memoList', JSON.stringify(current(state.memoList)));
    },
    remove: (state, { payload: id }) => {
      const removeIdx = state.memoList.findIndex(memo => memo.id === id);
      state.memoList.splice(removeIdx, 1);
      localStorage.setItem('memoList', JSON.stringify(current(state.memoList)));
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    getMemo: (state, action) => {
      const response = localStorage.getItem('memoList');
      state.memoList = JSON.parse(response);
    },
    getMemoById: (state, { payload: id }) => {
      const response = localStorage.getItem('memoList');
      const memoList = JSON.parse(response);
      const memo = memoList.find(memo => memo.id === id)
      state.memoDetail = memo;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getNewsByKeyword.fulfilled, (state, action) => {
  //     console.log('reducer');
  //   })
  // },
});

export const { write, modify, fixed, remove, changeMode, getMemo, getMemoById } = memoSlice.actions;

export const selectAll = state => state.memo;
export const selectMode = state => state.memo.mode;
export const selectMemoCount = state => state.memo.memoList.length;
export const selectMemoList = state => state.memo.memoList;
export const selectMemoDetail = state => state.memo.memoDetail;

export default memoSlice.reducer;