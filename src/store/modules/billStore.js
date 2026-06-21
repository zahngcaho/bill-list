import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const billStore = createSlice({
  initialState: {
    bills: []
  },
  name: "billStore",
  reducers: {
    setBillList(state, action) {
      state.bills = action.payload
    }
  }
})

// async thunk
const getBillList = () => {
  return async (dispatch) => {
    axios.get("http://localhost:8888/ka").then(res => {
      dispatch(setBillList(res.data))
    })
  }
}

const { setBillList } = billStore.actions

export { setBillList, getBillList }

const reducer = billStore.reducer

export default reducer